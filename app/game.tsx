declare const YAHOO: any;

YAHOO.namespace('lacuna');

import React from 'react';
import ReactDOM from 'react-dom';

import GameWindow from 'app/components/menu/gameWindow';

import EmpireRPCStore from 'app/stores/rpc/empire';
import MenuStore from 'app/stores/menu';
import SessionStore from 'app/stores/session';
import TickerStore from 'app/stores/ticker';
import WindowsStore from 'app/stores/windows';

import constants from 'app/constants';
import server from 'app/server';
import resources from 'app/json/resources';

if (typeof YAHOO.lacuna.Game === 'undefined' || !YAHOO.lacuna.Game) {
  (function () {
    let Util = YAHOO.util;
    let Lang = YAHOO.lang;
    let Cookie = Util.Cookie;
    let Dom = Util.Dom;
    let Event = Util.Event;
    let Lacuna = YAHOO.lacuna;
    let Lib = Lacuna.Library;

    let Game = {
      Resources: resources,
      Services: {},
      Timeout: 60000,
      HourMS: 3600000, // (60min * 60sec * 1000ms),
      onTick: new Util.CustomEvent('onTick'),
      OverlayManager: new YAHOO.widget.OverlayManager(),
      domain: window.location.hostname || 'kenoantigen.com',
      _session: undefined,
      _hasRun: false,

      Start: function (query: any = {}) {
        let body = document.getElementById('body');
        if (!body) return;

        // Give the React stuff somewhere to go.
        let container = document.createElement('div');
        container.id = 'mainGameContainer';
        body.appendChild(container);

        ReactDOM.render(<GameWindow />, document.getElementById('mainGameContainer'));

        MenuStore.showLoader();

        Game.escListener = new Util.KeyListener(
          document,
          {
            keys: 27,
          },
          {
            fn: function () {
              Game.OverlayManager.hideAll();
              WindowsStore.onEscKey();
            },
            scope: Game.OverlayManager,
            correctScope: true,
          }
        );

        Game.Services = Game.InitServices(YAHOO.lacuna.SMD.Services);

        // The tooltips can often disappear because their parent elements are removed from the
        // DOM and then replaced later. For example, switching between tabs that each have
        // tooltips in them. Calling this every tick ensures that the tooltips are rebuilt if
        // they disappear.
        //
        // TODO fix this
        //
        // TickerActions.tickerTick.listen(function() {
        //     ReactTooltip.rebuild();
        // });

        let session = Game.GetSession();
        if (query.referral) {
          // if they came from somewhere else
          let now = new Date();
          Cookie.set('lacunaReferral', query.referral, {
            domain: Game.domain,
            expires: new Date(now.setFullYear(now.getFullYear() + 1)),
          });
        }
        if (query.reset_password) {
          Game.InitLogin();
          Game.LoginDialog.resetPassword(query.reset_password);
          return;
        }
        if (query.facebook_uid) {
          Game.InitLogin();
          Game.LoginDialog.initEmpireCreator();
          Game.EmpireCreator.facebookReturn(
            query.facebook_uid,
            query.facebook_token,
            query.facebook_name
          );
          return;
        } else if (query.session_id) {
          Game.SetSession(query.session_id);
          SessionStore.update(query.session_id);
        } else if (query.empire_id) {
          Game.InitLogin();
          Game.LoginDialog.initEmpireCreator();
          Game.SpeciesCreator.show(query.empire_id);
          return;
        } else if (!session) {
          Game.DoLogin();
          return;
        }

        SessionStore.update(session);

        server.call({
          module: 'empire',
          method: 'get_status',
          success: () => {
            Game.Run();
          },
          error: () => {
            Game.Reset();
            Game.DoLogin();
          },
        });
      },
      Failure: function (o: any, retry: any, fail: any) {
        // session expired
        if (o.error.code === 1006) {
          Game.Reset();
          Game.DoLogin(o.error);
        } else if (o.error.code === 1200) {
          // Game over
          window.alert(o.error.message);
          Game.Reset();
          window.location = o.error.data;
        } else if (o.error.code === 1016) {
          // Captcha
          window.alert('Captcha not implemeneted');
          // WindowActions.windowAdd(Captcha, 'captcha', {
          //     success: retry,
          // });
        } else if (o.error.code === -32603) {
          // Internal error
          Game.QuickDialog(
            {
              width: '500px',
              text: [
                '<p>An internal error has occurred.  Please report this on <a target="_blank" href="https://github.com/kantigen/ka-server/issues">the support forums</a>, and include the data below.</p>',
                '<textarea style="width: 100%; height: 300px;" id="internalErrorMessageText" readonly="readonly" onclick="this.select()"></textarea>',
              ].join(''),
              buttons: [
                {
                  text: 'Close',
                  handler: function () {
                    this.hide();
                  },
                },
              ],
            },
            function () {
              Dom.get('internalErrorMessageText').value = o.error.data;
            }
          );
        } else {
          fail();
        }
      },
      InitLogin: function () {
        if (!Lacuna.Game.LoginDialog) {
          console.log('Creating login dialog');
          Lacuna.Game.LoginDialog = new Lacuna.Login();
          Lacuna.Game.LoginDialog.subscribe('onLoginSuccessful', function (oArgs: any) {
            let result = oArgs.result;
            // remember session
            Game.SetSession(result.session_id);

            Game.RemoveCookie('locationId');
            Game.RemoveCookie('locationView');

            Lacuna.Game.Run();

            if (result.welcome_message_id) {
              Game.QuickDialog({
                width: '400px',
                text: [
                  'Welcome to the Lacuna Expanse.  It is recommended that you play through the in game tutorial to familiarize yourself with the game, and to get some free resources to build up your empire.',
                  '<p>If you choose to skip the tutorial now you may find it by clicking <img src=",Lib.AssetUrl,"ui/s/inbox.png" title="Inbox" style="width:19px;height:22px;vertical-align:middle;margin:-5px 0 -4px -2px" /> at the top of the interface and find the message with the subject `Welcome`.</p>',
                  '<p>Thanks for playing!</p>',
                ].join(''),
                buttons: [
                  {
                    text: 'View Tutorial',
                    handler: function () {
                      this.hide();
                      Lacuna.Messaging.showMessage(result.welcome_message_id);
                    },
                    isDefault: true,
                  },
                  {
                    text: 'Skip Tutorial',
                    handler: function () {
                      this.hide();
                    },
                  },
                ],
              });
            }
          });
        }
      },
      DoLogin: function (error?: any) {
        Dom.setStyle(
          document.body,
          'background',
          'url(' + Lib.AssetUrl + 'star_system/field.png) repeat scroll 0 0 black'
        );
        this.InitLogin();
        Lacuna.Game.LoginDialog.show(error);
        MenuStore.hideMenu();
        MenuStore.hideLoader();
      },
      Run: function () {
        // init event subscribtions if we need to
        Game.InitEvents();
        // enable esc handler
        Game.escListener.enable();

        document.title = 'KA - ' + EmpireRPCStore.name;

        SessionStore.update(Game.GetSession(''));
        MenuStore.showMenu();

        console.log('Starting the ticker');
        TickerStore.start();

        console.log('Firing up the planet view');
        MenuStore.changePlanet(EmpireRPCStore.home_planet_id);
      },
      InitEvents: function () {
        // make sure we only subscribe once
        if (!Lacuna.Game._hasRun) {
          Game._hasRun = true;

          Event.on(window, 'resize', function () {
            // taken from YUI Overlay
            if (YAHOO.env.ua.ie) {
              if (!window.resizeEnd) {
                window.resizeEnd = -1;
              }

              clearTimeout(window.resizeEnd);

              window.resizeEnd = setTimeout(function () {
                Lacuna.Game.Resize();
              }, 100);
            } else {
              Lacuna.Game.Resize();
            }
          });
        }
      },
      InitServices: function (smd) {
        let serviceOut = {};
        for (let sKey in smd) {
          if (smd.hasOwnProperty(sKey)) {
            let oSmd = smd[sKey];
            if (oSmd.services) {
              serviceOut[sKey] = new YAHOO.rpc.Service(
                oSmd,
                {
                  success: function () {
                    for (let methodName in this) {
                      if (this.hasOwnProperty(methodName) && Lang.isFunction(this[methodName])) {
                        let method = this[methodName];
                        this[methodName] = Game.WrappedService(method, sKey + '.' + methodName);
                      }
                    }
                  },
                },
                constants.RPC_BASE
              );
            } else {
              serviceOut[sKey] = Game.InitServices(oSmd);
            }
          }
        }
        return serviceOut;
      },
      WrappedService: function (method: Function, name: string) {
        let logNS = 'Game.RPC.' + name + '.failure';
        let func = function (params: any, origOpts: any) {
          let retry = function () {
            let opts = { retry: 0 };
            YAHOO.lang.augmentObject(opts, origOpts, true);
            opts.retry++;
            func(params, opts);
          };
          let opts = {
            failure: function (o) {
              let self = this;
              let failure = function (silent: boolean) {
                if (Lang.isFunction(origOpts.failure)) {
                  if (origOpts.failure.call(self, o)) {
                    return;
                  }
                }
                if (!silent) {
                  window.alert(o.error.message);
                }
              };
              YAHOO.log(o, 'error', logNS);
              MenuStore.hideLoader();
              Game.Failure(o, retry, failure);
            },
          };
          YAHOO.lang.augmentObject(opts, origOpts);
          if (!('timeout' in opts)) {
            opts.timeout = Game.Timeout;
          }
          method(params, opts);
        };
        return func;
      },
      QuickDialog: function (config: any, afterRender?: Function, afterHide?: Function) {
        let container = document.createElement('div');
        if (config.id) {
          container.id = config.id;
          delete config.id;
        }
        YAHOO.lang.augmentObject(config, {
          fixedcenter: true,
          visible: false,
          draggable: false,
          constraintoviewport: true,
          modal: true,
          close: false,
          zindex: 20000,
        });
        Dom.addClass(container, 'quick-dialog');
        document.body.insertBefore(container, document.body.firstChild);
        let dialog = new YAHOO.widget.SimpleDialog(container, config);
        dialog.renderEvent.subscribe(function () {
          if (afterRender) {
            afterRender.call(this);
          }
          this.show();
        });
        dialog.hideEvent.subscribe(function () {
          if (afterHide) {
            afterHide.call(this);
          }
          // let the current process complete before destroying
          setTimeout(function () {
            dialog.destroy();
          }, 1);
        });
        dialog.render();
        Game.OverlayManager.register(dialog);
      },

      GetSession: function (replace: string = '') {
        if (!this._session) {
          this._session = Game.GetCookie('session');
        }
        return this._session || replace;
      },
      SetSession: function (session: string) {
        if (session) {
          Game.SetCookie('session', session);
          Game._session = session;
        } else {
          Game.RemoveCookie('session');
          Game._session = undefined;
        }
      },
      GetSize: function () {
        let content = document.getElementById('content');
        let width = content.offsetWidth;
        let height = document.documentElement.clientHeight;

        return {
          w: width,
          h: height,
        };
      },
      Resize: function () {
        if (Lacuna.MapStar.IsVisible()) {
          Lacuna.MapStar.Resize();
        } else if (Lacuna.MapPlanet.IsVisible()) {
          Lacuna.MapPlanet.Resize();
        }
      },
      StarJump: function (star: any) {
        YAHOO.log(star, 'debug', 'StarJump');
        Game.OverlayManager.hideAll();
        MenuStore.showStarMap();
        // Lacuna.MapPlanet.MapVisible(false);
        // Lacuna.MapStar.MapVisible(true);
        Lacuna.MapStar.Jump(star.x * 1, star.y * 1);
      },
      GetBuildingDesc: function (url: string) {
        if (Game.Resources && Game.Resources.buildings) {
          let desc = Game.Resources.buildings[url];
          if (desc) {
            return [
              desc.description,
              ' <a href="',
              desc.wiki,
              '" target="_blank">More Information on Wiki</a>',
            ].join('');
          } else {
            return '';
          }
        }
      },
      GetShipDesc: function (type: string) {
        if (Game.Resources && Game.Resources.ships) {
          let desc = Game.Resources.ships[type];
          if (desc) {
            return [
              desc.description,
              ' <a href="',
              desc.wiki,
              '" target="_blank">More Information on Wiki</a>',
            ].join('');
          }
        }
      },
      GetContainerEffect: function (effect: any) {
        if (Game.GetCookieSettings('disableDialogAnim', '0') === '1') {
          return;
        } else {
          return (
            effect || {
              effect: YAHOO.widget.ContainerEffect.FADE,
              duration: 0.5,
            }
          );
        }
      },

      Reset: function () {
        // disable esc handler
        Game.escListener.disable();

        document.title = 'Kenó Antigen';
        Game.RemoveCookie('locationId');
        Game.RemoveCookie('locationView');

        Game.SetSession('');
        Lacuna.MapStar.Reset();
        Lacuna.MapPlanet.Reset();
        Lacuna.Notify.Hide();
        Lacuna.Notify.Destroy();
      },

      // Cookie helpers functions
      GetCookie: function (key: string, defaultValue?: any) {
        let chip = Cookie.getSub('lacuna', key);
        return chip || defaultValue;
      },
      SetCookie: function (key: string, value: any, expiresDate?: any) {
        let opts = {
          domain: Game.domain,
        };

        if (expiresDate) {
          opts.expires = expiresDate;
        }

        Cookie.setSub('lacuna', key, value, opts);
      },
      RemoveCookie: function (key: string) {
        Cookie.removeSub('lacuna', key, {
          domain: Game.domain,
        });
      },
      RemoveAllCookies: function () {
        Cookie.remove('lacuna', {
          domain: Game.domain,
        });
      },

      // using a more permanent cookie
      GetCookieSettings: function (key: string, defaultValue: any) {
        let chip = Cookie.getSub('lacunaSettings', key);
        return chip || defaultValue;
      },
      SetCookieSettings: function (key: string, value: any) {
        let now = new Date();
        let opts = {
          domain: Game.domain,
          expires: new Date(now.setFullYear(now.getFullYear() + 1)),
        };

        Cookie.setSub('lacunaSettings', key, value, opts);
      },
      RemoveCookieSettings: function (key: string) {
        Cookie.removeSub('lacunaSettings', key, {
          domain: Game.domain,
        });
      },

      onScroll: (function () {
        let pixelsPerLine = 10;
        let ua = navigator.userAgent;
        let safari5 = ua.match(/\bSafari\//) && ua.match(/\bVersion\/5/);
        let isEventSupported = (function () {
          interface tagnames {
            [index: string]: string;
          }
          let TAGNAMES: tagnames = {
            select: 'input',
            change: 'input',
            submit: 'form',
            reset: 'form',
            error: 'img',
            load: 'img',
            abort: 'img',
          };
          let cache = {};
          function isEventSupported(eventName: string) {
            let el = document.createElement(TAGNAMES[eventName] || 'div');
            eventName = 'on' + eventName;
            if (eventName in cache) {
              return cache[eventName];
            }
            let isSupported = eventName in el;
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              isSupported = typeof el[eventName] === 'function';
            }
            cache[eventName] = isSupported;
            el = null;
            return isSupported;
          }
          return isEventSupported;
        })();

        if (isEventSupported('mousewheel')) {
          return function (el: any, fn: any, obj: any, context: any) {
            Event.on(
              el,
              'mousewheel',
              function (e: any, o: any) {
                let xDelta = 'wheelDeltaX' in e ? e.wheelDeltaX : 0;
                let yDelta = 'wheelDeltaY' in e ? e.wheelDeltaY : e.wheelDelta;
                // chrome/safari 4 give pixels
                // safari 5 gives pixels * 120
                if (safari5) {
                  xDelta /= 120;
                  yDelta /= 120;
                }
                fn.call(this, e, xDelta, yDelta, o);
              },
              obj,
              context
            );
          };
        } else if (YAHOO.env.ua.gecko >= 1.9 && !ua.match(/\brv:1\.9\.0/)) {
          // not possible to feature detect this, have to just use the version number
          return function (el: any, fn: any, obj: any, context: any) {
            Event.on(
              el,
              'MozMousePixelScroll',
              function (e: any, o: any) {
                let xAxis = e.axis === e.HORIZONTAL_AXIS;
                let xDelta = xAxis ? -e.detail : 0;
                let yDelta = xAxis ? 0 : -e.detail;
                fn.call(this, e, xDelta, yDelta, o);
              },
              obj,
              context
            );
          };
        } else {
          return function (el: any, fn: any, obj: any, context: any) {
            Event.on(
              el,
              'DOMMouseScroll',
              function (e: any, o: any) {
                let xAxis = 'axis' in e && e.axis === e.HORIZONTAL_AXIS;
                // this event gets 'lines'
                let xDelta = xAxis ? -e.detail * pixelsPerLine : 0;
                let yDelta = xAxis ? 0 : -e.detail * pixelsPerLine;
                fn.call(this, e, xDelta, yDelta, o);
              },
              obj,
              context
            );
          };
        }
      })(),
    };

    YAHOO.lacuna.Game = Game;
  })();

  YAHOO.register('game', YAHOO.lacuna.Game, {
    version: '1',
    build: '0',
  });
}
