const InitCamOCX = function InitCamOCX() {

    var ret = CamSDKOCX.InitCameraLib();
    if (ret) {
        if (ret == 263) {
            console.log("ocx初始化成功，但是没有授权");
        }
        else {
            console.log("OCX初始化失败，错误号：" + ret);
            return;
        }
    } else {
        console.log('初始化没有任何返回');
    }
    //开启0号摄像头
    //StartVideo();
    // setTimeout("StartVideo()",200);
}

function StartVideo() {
    AddDevice();
    //打开列表所选摄像头
    ChangeDevice();
    AddAudioDev(AudioList);
}


const Capture = function () {
    console.log("点击了拍照!");

    let newFile = "c://a.jpg";

    var files = CamSDKOCX.CaptureImage(newFile);
    console.log('files:' + files);
    return newFile;
}

const CaptureShow = function () {
    console.log('aaaaaaaaa');
    var files = Capture();

    var strs = new Array(); //定义一数组
    console.log('xxxxxxxxxxxxxxxxxxxx');
    strs = files.split(";"); //字符分割
    console.log('yyyyyyyyyyyyyyy');
    var strShow = new Array();
    console.log('zzzzzzzzzzzzzzzzzzzzz');
    for (i = 0; i < strs.length; i++) {
        console.log('11111111111111111');
        var cropType = document.getElementById("autocrop").value;
        console.log('bbbbbbbbbbb');
        if (cropType == "2") {
            console.log('ccccccc');
            strShow = strs[i].split(".");
            CamSDKOCX.ShowImage(strShow[0] + "_" + i + "." + strShow[1]);
        } else {
            console.log('ddddddddddddddd');
            CamSDKOCX.ShowImage(strs[i]);
        }
    }
}

function showImageBase64(strBase64) {
    document.getElementById("imgPreview").src =
        "data:image/jpeg;base64," + strBase64;
}

function CaptureBase64(obj) {
    let CamSDKOCX = window.CamSDKOCX;
    var files = Capture();
    var strs = new Array(); //定义一数组
    strs = files.split(";"); //字符分割
    for (i = 0; i < strs.length; i++) {
        var strBase64 = CamSDKOCX.EncodeBase64(strs[i]);
        //alert(strBase64);
        //显示到窗口
        showImageBase64(strBase64);
    }
}

const UnInitCamOCX = function () {
    CamSDKOCX.UnInitCameraLib();
}

export {
    InitCamOCX,
    Capture,
    CaptureShow,
    UnInitCamOCX,
}