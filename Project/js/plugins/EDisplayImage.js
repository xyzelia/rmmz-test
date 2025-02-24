

//=============================================================================
// EDisplayImage.js
//=============================================================================
/*:
* @target MZ
* @plugindesc v0.0.1 连续显示图片插件
* @author Elia
* @help EDisplayImage.js
* 连续显示图片
*
* @command runMe
* @desc this is the command you can call in the Plugin Manager
*
* @command setPictureParameters
* @desc Sets the parameters for a picture.
*
* @param pictureId
* @type number
* @default 1
* @min 0
* @desc The ID of the picture.
*
* @param AnchorType
* @type select
* @option Top-Left
* @value 0
* @option Center
* @value 1
* @default 0
* @desc The anchor type for the picture (0 = top-left, 1 = center).
*
* @param x
* @type number
* @default 0
* @desc The x-coordinate position of the picture.
*
* @param y
* @type number
* @default 0
* @desc The y-coordinate position of the picture.
*
* @param scaleX
* @type number
* @default 100
* @desc The horizontal scale percentage of the picture.
*
* @param scaleY
* @type number
* @default 100
* @desc The vertical scale percentage of the picture.
*
* @param opacity
* @type number
* @default 255
* @min 0
* @max 255
* @desc The opacity of the picture (0 = transparent, 255 = opaque).
*
* @param blendMode
* @type select
* @option Normal
* @value 0
* @option Additive
* @value 1
* @option Multiply
* @value 2
* @option Screen
* @value 3
* @default 0
* @desc The blend mode for the picture (0 (Normal), 1 (Additive), 2 (Multiply), or 3 (Screen).).
*

================================================================================================================
 * @command setDefaultConfig
 * @desc Sets the parameters for a picture.
 *
 * @arg pictureId
 * @type number
 * @default 1
 * @min 1
 * @desc The ID of the picture you want to modify.
 *
 * @arg AnchorType
 * @type select
 * @option Top-Left
 * @value 0
 * @option Center
 * @value 1
 * @default 0
 * @desc The anchor type for the picture (0 = top-left, 1 = center).
 *
 * @arg x
 * @type number
 * @default 0
 * @min -9999
 * @desc The x-coordinate position of the picture.
 *
 * @arg y
 * @type number
 * @default 0
 * @min -9999
 * @desc The y-coordinate position of the picture.
 *
 * @arg scaleX
 * @type number
 * @default 100
 * @min 1
 * @max 500
 * @desc The horizontal scale percentage of the picture.
 *
 * @arg scaleY
 * @type number
 * @default 100
 * @min 1
 * @max 500
 * @desc The vertical scale percentage of the picture.
 *
 * @arg opacity
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * @desc The opacity of the picture (0 = transparent, 255 = opaque).
 *
 * @arg blendMode
* @type select
* @option Normal
* @value 0
* @option Additive
* @value 1
* @option Multiply
* @value 2
* @option Screen
* @value 3
* @default 0
* @desc The blend mode for the picture (0 (Normal), 1 (Additive), 2 (Multiply), or 3 (Screen).).
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

function setDefaultConfig(PARAMETERS) {
  return {
    pictureId: parseInt(PARAMETERS["pictureId"]),
    AnchorType: parseInt(PARAMETERS["AnchorType"]),
    x: parseInt(PARAMETERS["x"]),
    y: parseInt(PARAMETERS["y"]),
    scaleX: parseInt(PARAMETERS["scaleX"]),
    scaleY: parseInt(PARAMETERS["scaleY"]),
    opacity: parseInt(PARAMETERS["opacity"]),
    blendMode: parseInt(PARAMETERS["blendMode"])
  }
}

(() => {

  //
  const pluginName = "EDisplayImage";
  const PARAMETERS = PluginManager.parameters(pluginName);
  this.spriteArray = [];
  /**
   * 
   * https://docs.google.com/spreadsheets/d/1-Oa0cRGpjC8L5JO8vdMwOaYMKO75dtfKDOetnvh7OHs/edit?gid=1186334695#gid=1186334695
  "Number pictureId
  • ID of the picture 1~100.
  Game_Picture picture
  • Picture object to change.
  String name
  • Filename, without extension.
  Number origin
  • Anchor type: 0 (Upper Left) or 1 (Center).
  Number x, y
  • Anchor screen coordinates (px).
  Number scaleX, scaleY
  • Scale multipliers: use 100 for 100% (original size).
  Number opacity
  • 0 to 255, where 0 is 100% transparent.
  Number blendMode
  • 0 (Normal), 1 (Additive), 2 (Multiply), or 3 (Screen)."
   */
  this.defaultConfig = setDefaultConfig({
    pictureId: PARAMETERS["pictureId"],
    AnchorType: PARAMETERS["AnchorType"],
    x: PARAMETERS["x"],
    y: PARAMETERS["y"],
    scaleX: PARAMETERS["scaleX"],
    scaleY: PARAMETERS["scaleY"],
    opacity: PARAMETERS["opacity"],
    blendMode: PARAMETERS["blendMode"]
  })

  PluginManager.registerCommand(pluginName, "runMe", args => {
    // this stuff will happen when you call the plugin command runMe    
    console.log('You called the plugin command runMe!', args)
  });

  PluginManager.registerCommand(pluginName, "showPicturesBySprite", async args => {
    // 依次显示图片，使用sprite版本
    this.spriteArray = loadToSpriteToArr(args);
    await displayOneByOne(this.spriteArray);
    console.log(this.spriteArray)
    console.log('You called the plugin command showPicturesBySprite!', args)
  });

  PluginManager.registerCommand(pluginName, "setDefaultConfig", async args => {
    console.log('You called the plugin command setDefaultConfig!', args)
    // 设置默认参数
    this.defaultConfig = setDefaultConfig(args)
    console.log('You called the plugin command setDefaultConfig!', args)
  });

  // args 数组中， 字符串代表路径，数字代表等待的时间
  PluginManager.registerCommand(pluginName, "showPictures", async args => {
    // 依次显示图片，使用showPicture版本
    console.log(this.defaultConfig)
    console.log(args)
    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] === 'string') {
        const imgPath = args[i];
        console.log("imgPath:", imgPath)
        // (1, 'pic', 1, 50, 50, 100, 100, 255, 0)
        console.log("$gameScreen.showPicture params:", [this.defaultConfig.pictureId, imgPath,
        this.defaultConfig.AnchorType,
        this.defaultConfig.x, this.defaultConfig.y,
        this.defaultConfig.scaleX, this.defaultConfig.scaleY, this.defaultConfig.opacity, this.defaultConfig.blendMode])
        $gameScreen.showPicture(this.defaultConfig.pictureId, imgPath,
          this.defaultConfig.AnchorType,
          this.defaultConfig.x, this.defaultConfig.y,
          this.defaultConfig.scaleX, this.defaultConfig.scaleY, this.defaultConfig.opacity, this.defaultConfig.blendMode)
      }
      else if (typeof args[i] === 'number') {
        // 等待 args[i] 毫秒
        await sleep(args[i])
        // 需要在游戏地图中设置等待时间(Timing->Wait... frame=1/60sec)与插件中的等待的时间总和一致
      }
    }
    // $gameScreen.clearPictures();
    console.log('You called the plugin command showPictures!', args)
  });
  //this stuff will happen no matter what
  console.log('Your plugin EDisplayImage is working.')

})();


// end of file

