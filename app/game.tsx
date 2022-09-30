import React from 'react';
import { createRoot } from 'react-dom/client';

import GameWindow from 'app/components/menu/gameWindow';

import EmpireRPCStore from 'app/stores/rpc/empire';
import MenuStore from 'app/stores/menu';
import SessionStore from 'app/stores/session';
import TickerStore from 'app/stores/ticker';
import WindowsStore from 'app/stores/windows';

import environment from 'app/environment';
//@ts-expect-error
import resources from 'app/json/resources';
import EmpireService from 'app/services/empire';

import * as vex from 'app/vex';

import YAHOO from 'app/shims/yahoo';

YAHOO.namespace('lacuna');

if (typeof YAHOO.lacuna.Game === 'undefined' || !YAHOO.lacuna.Game) {
  (function () {
    const Util = YAHOO.util;
    const Lang = YAHOO.lang;
    const { Cookie } = Util;
    const { Dom } = Util;
    const { Event } = Util;
    const Lacuna = YAHOO.lacuna;
    const Lib = Lacuna.Library;

    const Game = {
      Resources: resources,
      Services: {},
      Timeout: 60000,
      HourMS: 3600000, // (60min * 60sec * 1000ms),
      onTick: new Util.CustomEvent('onTick'),
      OverlayManager: new YAHOO.widget.OverlayManager(),
      domain: window.location.hostname || 'kenoantigen.com',
      _session: undefined,
      _hasRun: false,

      Start(query: any = {}) {
        const body = document.getElementById('body');
        if (!body) return;

        // Give the React stuff somewhere to go.
        const container = document.createElement('div');
        container.id = 'mainGameContainer';
        body.appendChild(container);
        const root = createRoot(container);
        root.render(<GameWindow />);

        MenuStore.showLoader();

        //@ts-expect-error
        Game.escListener = new Util.KeyListener(
          document,
          {
            keys: 27,
          },
          {
            fn() {
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

        const session = Game.GetSession();
        if (query.referral) {
          // if they came from somewhere else
          const now = new Date();
          Cookie.set('lacunaReferral', query.referral, {
            domain: Game.domain,
            expires: new Date(now.setFullYear(now.getFullYear() + 1)),
          });
        }
        if (query.reset_password) {
          Game.InitLogin();
          //@ts-expect-error
          Game.LoginDialog.resetPassword(query.reset_password);
          return;
        }
        if (query.facebook_uid) {
          Game.InitLogin();
          //@ts-expect-error
          Game.LoginDialog.initEmpireCreator();
          //@ts-expect-error
          Game.EmpireCreator.facebookReturn(
            query.facebook_uid,
            query.facebook_token,
            query.facebook_name
          );
          return;
        }
        if (query.session_id) {
          Game.SetSession(query.session_id);
          SessionStore.update(query.session_id);
        } else if (query.empire_id) {
          Game.InitLogin();
          //@ts-expect-error
          Game.LoginDialog.initEmpireCreator();
          //@ts-expect-error
          Game.SpeciesCreator.show(query.empire_id);
          return;
        } else if (!session) {
          Game.DoLogin();
          return;
        }

        SessionStore.update(session);

        EmpireService.getStatus()
          .then(() => {
            Game.Run();
          })
          .catch(() => {
            Game.Reset();
            Game.DoLogin();
          });
      },
      Failure(o: any, retry: any, fail: any) {
        // session expired
        if (o.error.code === 1006) {
          Game.Reset();
          Game.DoLogin(o.error);
        } else if (o.error.code === 1200) {
          // Game over
          vex.alert(o.error.message);
          Game.Reset();
          window.location = o.error.data;
        } else if (o.error.code === 1016) {
          // Captcha
          WindowsStore.add('captcha', {
            onCaptchaComplete: retry,
          });
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
                  handler() {
                    //@ts-expect-error
                    this.hide();
                  },
                },
              ],
            },
            () => {
              Dom.get('internalErrorMessageText').value = o.error.data;
            }
          );
        } else {
          fail();
        }
      },
      InitLogin() {
        if (!Lacuna.Game.LoginDialog) {
          console.log('Creating login dialog');
          Lacuna.Game.LoginDialog = new Lacuna.Login();
          Lacuna.Game.LoginDialog.subscribe('onLoginSuccessful', (oArgs: any) => {
            const { result } = oArgs;
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
                  '<p>If you choose to skip the tutorial now you may find it by clicking <i class="mail icon"></i> at the top of the interface and find the message with the subject `Welcome`.</p>',
                  '<p>Thanks for playing!</p>',
                ].join(''),
                buttons: [
                  {
                    text: 'View Tutorial',
                    handler() {
                      //@ts-expect-error
                      this.hide();
                      Lacuna.Messaging.showMessage(result.welcome_message_id);
                    },
                    isDefault: true,
                  },
                  {
                    text: 'Skip Tutorial',
                    handler() {
                      //@ts-expect-error
                      this.hide();
                    },
                  },
                ],
              });
            }
          });
        }
      },
      DoLogin(error?: any) {
        Dom.setStyle(
          document.body,
          'background',
          `url(${Lib.AssetUrl}star_system/field.png) repeat scroll 0 0 black`
        );
        this.InitLogin();
        WindowsStore.closeAll();
        WindowsStore.add('login');
        MenuStore.hideMenu();
        MenuStore.hideLoader();
      },
      Run() {
        // init event subscribtions if we need to
        Game.InitEvents();
        // enable esc handler
        //@ts-expect-error
        Game.escListener.enable();

        document.title = `KA - ${EmpireRPCStore.name}`;

        SessionStore.update(Game.GetSession(''));
        MenuStore.showMenu();

        console.log('Starting the ticker');
        TickerStore.start();

        console.log('Firing up the planet view');
        MenuStore.changePlanet(EmpireRPCStore.home_planet_id);
      },
      InitEvents() {
        // make sure we only subscribe once
        if (!Lacuna.Game._hasRun) {
          Game._hasRun = true;

          Event.on(window, 'resize', () => {
            // taken from YUI Overlay
            if (YAHOO.env.ua.ie) {
              //@ts-expect-error
              if (!window.resizeEnd) {
                //@ts-expect-error
                window.resizeEnd = -1;
              }

              //@ts-expect-error
              clearTimeout(window.resizeEnd);

              //@ts-expect-error
              window.resizeEnd = setTimeout(() => {
                Lacuna.Game.Resize();
              }, 100);
            } else {
              Lacuna.Game.Resize();
            }
          });
        }
      },
      InitServices(smd: any) {
        const serviceOut = {};
        for (const sKey in smd) {
          if (smd.hasOwnProperty(sKey)) {
            const oSmd = smd[sKey];
            if (oSmd.services) {
              //@ts-expect-error
              serviceOut[sKey] = new YAHOO.rpc.Service(
                oSmd,
                {
                  success() {
                    for (const methodName in this) {
                      if (this.hasOwnProperty(methodName) && Lang.isFunction(this[methodName])) {
                        const method = this[methodName];
                        this[methodName] = Game.WrappedService(method, `${sKey}.${methodName}`);
                      }
                    }
                  },
                },
                environment.getServerUrl()
              );
            } else {
              //@ts-expect-error
              serviceOut[sKey] = Game.InitServices(oSmd);
            }
          }
        }
        return serviceOut;
      },
      WrappedService(method: Function, name: string) {
        const logNS = `Game.RPC.${name}.failure`;
        const func = function (params: any, origOpts: any) {
          const retry = function () {
            const opts = { retry: 0 };
            YAHOO.lang.augmentObject(opts, origOpts, true);
            opts.retry++;
            func(params, opts);
          };
          const opts = {
            failure(o: any) {
              const self = this;
              const failure = function (silent: boolean) {
                if (Lang.isFunction(origOpts.failure)) {
                  if (origOpts.failure.call(self, o)) {
                    return;
                  }
                }
                if (!silent) {
                  vex.alert(o.error.message);
                }
              };
              YAHOO.log(o, 'error', logNS);
              MenuStore.hideLoader();
              Game.Failure(o, retry, failure);
            },
          };
          YAHOO.lang.augmentObject(opts, origOpts);
          if (!('timeout' in opts)) {
            //@ts-expect-error
            opts.timeout = Game.Timeout;
          }
          method(params, opts);
        };
        return func;
      },
      QuickDialog(config: any, afterRender?: Function, afterHide?: Function) {
        const container = document.createElement('div');
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
        const dialog = new YAHOO.widget.SimpleDialog(container, config);
        dialog.renderEvent.subscribe(function () {
          if (afterRender) {
            //@ts-expect-error
            afterRender.call(this);
          }
          //@ts-expect-error
          this.show();
        });
        dialog.hideEvent.subscribe(function () {
          if (afterHide) {
            //@ts-expect-error
            afterHide.call(this);
          }
          // let the current process complete before destroying
          setTimeout(() => {
            dialog.destroy();
          }, 1);
        });
        dialog.render();
        Game.OverlayManager.register(dialog);
      },

      GetSession(replace = '') {
        if (!this._session) {
          this._session = Game.GetCookie('session');
        }
        return this._session || replace;
      },
      SetSession(session: string) {
        if (session) {
          Game.SetCookie('session', session);
          //@ts-expect-error
          Game._session = session;
        } else {
          Game.RemoveCookie('session');
          Game._session = undefined;
        }
      },
      GetSize() {
        const content = document.getElementById('content');
        //@ts-expect-error
        const width = content.offsetWidth;
        const height = document.documentElement.clientHeight;

        return {
          w: width,
          h: height,
        };
      },
      Resize() {
        if (Lacuna.MapStar.IsVisible()) {
          Lacuna.MapStar.Resize();
        } else if (Lacuna.MapPlanet.IsVisible()) {
          Lacuna.MapPlanet.Resize();
        }
      },
      StarJump(star: any) {
        YAHOO.log(star, 'debug', 'StarJump');
        Game.OverlayManager.hideAll();
        MenuStore.showStarMap();
        // Lacuna.MapPlanet.MapVisible(false);
        // Lacuna.MapStar.MapVisible(true);
        Lacuna.MapStar.Jump(star.x * 1, star.y * 1);
      },
      GetBuildingDesc(url: string) {
        if (Game.Resources && Game.Resources.buildings) {
          const desc = Game.Resources.buildings[url];
          if (desc) {
            return [
              desc.description,
              ' <a href="',
              desc.wiki,
              '" target="_blank">More Information on Wiki</a>',
            ].join('');
          }
          return '';
        }
      },
      GetShipDesc(type: string) {
        if (Game.Resources && Game.Resources.ships) {
          const desc = Game.Resources.ships[type];
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
      GetContainerEffect(effect: any) {
        if (Game.GetCookieSettings('disableDialogAnim', '0') === '1') {
        } else {
          return (
            effect || {
              effect: YAHOO.widget.ContainerEffect.FADE,
              duration: 0.5,
            }
          );
        }
      },

      Reset() {
        // disable esc handler
        //@ts-expect-error
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
      GetCookie(key: string, defaultValue?: any) {
        const chip = Cookie.getSub('lacuna', key);
        return chip || defaultValue;
      },
      SetCookie(key: string, value: any, expiresDate?: any) {
        const opts = {
          domain: Game.domain,
        };

        if (expiresDate) {
          //@ts-expect-error
          opts.expires = expiresDate;
        }

        Cookie.setSub('lacuna', key, value, opts);
      },
      RemoveCookie(key: string) {
        Cookie.removeSub('lacuna', key, {
          domain: Game.domain,
        });
      },
      RemoveAllCookies() {
        Cookie.remove('lacuna', {
          domain: Game.domain,
        });
      },

      // using a more permanent cookie
      GetCookieSettings(key: string, defaultValue: any) {
        const chip = Cookie.getSub('lacunaSettings', key);
        return chip || defaultValue;
      },
      SetCookieSettings(key: string, value: any) {
        const now = new Date();
        const opts = {
          domain: Game.domain,
          expires: new Date(now.setFullYear(now.getFullYear() + 1)),
        };

        Cookie.setSub('lacunaSettings', key, value, opts);
      },
      RemoveCookieSettings(key: string) {
        Cookie.removeSub('lacunaSettings', key, {
          domain: Game.domain,
        });
      },

      onScroll: (function () {
        const pixelsPerLine = 10;
        const ua = navigator.userAgent;
        const safari5 = ua.match(/\bSafari\//) && ua.match(/\bVersion\/5/);
        const isEventSupported = (function () {
          interface tagnames {
            [index: string]: string;
          }
          const TAGNAMES: tagnames = {
            select: 'input',
            change: 'input',
            submit: 'form',
            reset: 'form',
            error: 'img',
            load: 'img',
            abort: 'img',
          };
          const cache = {};
          function isEventSupported(eventName: string) {
            let el = document.createElement(TAGNAMES[eventName] || 'div');
            eventName = `on${eventName}`;
            if (eventName in cache) {
              //@ts-expect-error
              return cache[eventName];
            }
            let isSupported = eventName in el;
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              //@ts-expect-error
              isSupported = typeof el[eventName] === 'function';
            }
            //@ts-expect-error
            cache[eventName] = isSupported;
            //@ts-expect-error
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
                //@ts-expect-error
                fn.call(this, e, xDelta, yDelta, o);
              },
              obj,
              context
            );
          };
        }
        if (YAHOO.env.ua.gecko >= 1.9 && !ua.match(/\brv:1\.9\.0/)) {
          // not possible to feature detect this, have to just use the version number
          return function (el: any, fn: any, obj: any, context: any) {
            Event.on(
              el,
              'MozMousePixelScroll',
              function (e: any, o: any) {
                const xAxis = e.axis === e.HORIZONTAL_AXIS;
                const xDelta = xAxis ? -e.detail : 0;
                const yDelta = xAxis ? 0 : -e.detail;
                //@ts-expect-error
                fn.call(this, e, xDelta, yDelta, o);
              },
              obj,
              context
            );
          };
        }
        return function (el: any, fn: any, obj: any, context: any) {
          Event.on(
            el,
            'DOMMouseScroll',
            function (e: any, o: any) {
              const xAxis = 'axis' in e && e.axis === e.HORIZONTAL_AXIS;
              // this event gets 'lines'
              const xDelta = xAxis ? -e.detail * pixelsPerLine : 0;
              const yDelta = xAxis ? 0 : -e.detail * pixelsPerLine;
              //@ts-expect-error
              fn.call(this, e, xDelta, yDelta, o);
            },
            obj,
            context
          );
        };
      })(),
    };

    YAHOO.lacuna.Game = Game;
  })();

  YAHOO.register('game', YAHOO.lacuna.Game, {
    version: '1',
    build: '0',
  });
}
