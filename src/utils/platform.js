var userAgent = navigator.userAgent;
var isIos13Ipad = /Mac OS/ig.test(userAgent) && !!window.DeviceMotionEvent && !!window.DeviceOrientationEvent ;
var _getVersion = (function(){
    var i = /.+(?!iphone|ipad|ipod) .+ os ([\d_\.]+).+/gi.exec(userAgent);
    i = i && i[1] ? i[1].replace(/_/g, ".") : 0
    if ( !i && isIos13Ipad ) {  // ios13  兼容 ipad  特殊逻辑
        i = "13.0"
    }
    return i
})()
module.exports = {
    isWeiXin : /MicroMessenger/i.test(userAgent),
    isMobile : /iphone|ipod|ipad|ipad|Android|nokia|blackberry|webos|webos|webmate|bada|lg|ucweb/i.test(userAgent)|| isIos13Ipad,
    isIos : /iPhone|iPad|iPod|iOS/i.test(userAgent)|| isIos13Ipad,
    isAndroid : /Android/i.test(userAgent),
    isIphone : /iPhone/i.test(userAgent),
    isSafari : /safari/ig.test(userAgent) && !/(crios|chrome|fxios|qqbrowser|sogou|baidu|ucbrowser|qhbrowser|opera|micromessenger|weibo)/ig.test(userAgent),
	deviceType: /iphone/gi.test(userAgent) ? 1 : /ipad/gi.test(userAgent) ? 2 : /ipod/gi.test(userAgent) ? 3 : (isIos13Ipad ? 2:0) ,
	iosVersion : _getVersion ,
    shortIosVersion : userAgent.match(/os\s+(\d+)/i) ? userAgent.match(/os\s+(\d+)/i)[1]-0 : 0,
	// ios 端  谷歌  火狐
    isChrome : /safari/ig.test(userAgent) && /crios/ig.test(userAgent),
    isFirefox : /safari/ig.test(userAgent) && /fxios/ig.test(userAgent),
    is360 : /QihooBrowser/ig.test(userAgent),
    isBaidu : /baidubrowser/ig.test(userAgent),

    isiPad : /iPad/ig.test(userAgent),
    isUC : /UCBrowser/ig.test(userAgent),
    isSougou : /SogouMSE|SogouMobileBrowser/ig.test(userAgent),
     // 判断QQ浏览器
    isQQ : /TencentTraveler|QQBrowser/ig.test(userAgent),
    // 判断QQ内置浏览器
    isIosQQ : / QQ/i.test(userAgent),
    isAndroidQQ : /MQQBrowser/i.test(userAgent) && /QQ/i.test((userAgent).split('MQQBrowser'))
};
