

//=============================================================================
// EDevTool.js
//=============================================================================
/*:
* @target MZ
* @plugindesc v0.0.1 Bare Bones Plugin Template
* @author Starbird
* @help EDevTool.js
*
* This is a basic template for a plugin.
*
* @command runMe
* @desc this is the command you can call in the Plugin Manager
*
*
*/


// 显示devtool
function getWindow() {
  return nw.Window.get();
}
function showDevTools() {
  getWindow().showDevTools();
  setTimeout(() => {
    getWindow().focus();
  }, 1000);
}


// 加速

const _SceneManager_determineRepeatNumber = SceneManager.determineRepeatNumber;
SceneManager.determineRepeatNumber = function (deltaTime) {
  const result = _SceneManager_determineRepeatNumber.apply(this, arguments);
  return result * 2
  // if (this._scene && this._scene.isAnyWindowActive()) {
  //   return result;
  // }
  // if (this.isSlow() && result >= 1 && this._slowCounter < 1.0) {
  //   this._slowCounter += (1 / param.SlowSpeed);
  //   return 0;
  // } else {
  //   this._slowCounter = 0.0;
  //   // if (this.isRapid()) {
  //   //     return result * param.RapidSpeed;
  //   // } else {
  //   //     return result;
  //   // }
  //   return result * 3
  // }
};



(() => {
  //
  const pluginName = "EDevTool";

  //this stuff will happen no matter what
  console.log('Your plugin' + pluginName + ' is working.')
  showDevTools()
  param_RapidStart = true;
  param_CutTitle = 1
  // 跳过开始菜单，直接开始新游戏
  const _Scene_Boot_start = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function () {
    _Scene_Boot_start.apply(this, arguments);
    if (param_RapidStart) {
      // SceneManager.setInitRapid();
    }
    this.cutSceneTitle();
  };
  Scene_Boot.prototype.cutSceneTitle = function () {
    if (DataManager.isBattleTest() || DataManager.isEventTest()) {
      return;
    }
    switch (param_CutTitle) {
      case 1:
        this.goToNewGame();
        break;
      case 2:
        const result = this.goToLatestContinue();
        if (!result) {
          this.goToNewGame();
        }
        break;
    }
  };
  Scene_Boot.prototype.goToNewGame = function () {
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  };
})();

// end of file

