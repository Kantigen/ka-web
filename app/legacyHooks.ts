declare const YAHOO: any;

//
// Instead of blindly calling methods in the YUI code, use this hooks instead.
//
class LegacyHooks {
  static refreshPlanet(): void {
    YAHOO.lacuna.MapPlanet.Refresh();
  }

  static resetGame(): void {
    YAHOO.lacuna.Game.Reset();
    YAHOO.lacuna.MapPlanet.Reset();
    YAHOO.lacuna.Game.DoLogin();
  }

  static tick(): void {
    YAHOO.lacuna.Game.onTick.fire();
  }
}

export default LegacyHooks;
