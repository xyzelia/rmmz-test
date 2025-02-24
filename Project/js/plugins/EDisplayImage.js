

//=============================================================================
// EDisplayImage.js
//=============================================================================
/*:
* @target MZ
* @plugindesc v0.0.1 Bare Bones Plugin Template
* @author Starbird
* @help EDisplayImage.js
*
* This is a basic template for a plugin.
*
* @command runMe
* @desc this is the command you can call in the Plugin Manager
*
*
*/




function loadToSpriteToArr(imgPathArr) {
  let sprArr = [];
  for (let i = 0; i < imgPathArr.length; i++) {
    const imgPath = imgPathArr[i];
    sprArr.push(new Sprite(ImageManager.loadPicture(imgPath, 0)))
  }
  return sprArr;
}
const sleep = ms => new Promise(res => setTimeout(res, ms))
async function displayOneByOne(sprArr) {
  console.log("display:", sprArr)
  let lastSpr = null;
  for (let i = 0; i < sprArr.length; i++) {
    const spr = sprArr[i];
    await sleep(1000);
    if (lastSpr) {
      SceneManager._scene.removeChild(lastSpr);
    }
    SceneManager._scene.addChildAt(spr, 2);
    lastSpr = spr;
  }
}

function removeSprArr(sprArr) {
  for (let i = 0; i < sprArr.length; i++) {
    const spr = sprArr[i];
    SceneManager._scene.removeChild(spr)
  }
}

(() => {

  //
  const pluginName = "EDisplayImage";

  this.spriteArray = [];

  PluginManager.registerCommand(pluginName, "runMe", args => {
    // this stuff will happen when you call the plugin command runMe    
    console.log('You called the plugin command runMe!', args)
  });

  PluginManager.registerCommand(pluginName, "showPicturesBySprite", async args => {
    // 依次显示图片，使用sprite版本
    this.spriteArray = loadToSpriteToArr(args);
    await displayOneByOne(this.spriteArray);
    // Input.isPressed('ok')
    console.log(this.spriteArray)
    console.log('You called the plugin command showPicturesBySprite!', args)
  });

  PluginManager.registerCommand(pluginName, "showPictures", async args => {
    // 依次显示图片，使用showPicture版本
    const desiredSleepTime = 400;
    console.log(args)
    for (let i = 0; i < args.length; i++) {
      const imgPath = args[i];
      $gameScreen.showPicture(1, imgPath, 0, 200, 200, 100, 100, 255, 0)
      console.log("show:",imgPath,"this._eventId:",this._eventId,$gameMap._interpreter._eventId)
      // 如何wait？用户点击确认可以继续对话
      await sleep(desiredSleepTime)
    }
    // $gameScreen.clearPictures();
    console.log('You called the plugin command showPictures!', args)
  });



  //this stuff will happen no matter what
  console.log('Your plugin EDisplayImage is working.')
  showDevTools()
})();


// end of file

