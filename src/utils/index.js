const InitCamOCX = function() {

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
    StartVideo();
    setTimeout("StartVideo()", 200);
}

function StartVideo() {
    AddDevice();
    //打开列表所选摄像头
    ChangeDevice();
    AddAudioDev(AudioList);
}

// <!--清空列表-->
function clean(list)
{
　　while (list.options.length>0)
　　{
　　 list.options.remove(0);
　　}
}

function AddDevice() {
    clean(DeviceList);
    var mainDevCount = 0;
    var total = CamSDKOCX.GetDevCount();
    for (var i = 0; i < total; i++) {
        var devtype = CamSDKOCX.GetDevType(i);
        //if (devtype == 0) {//0 主头
        var DevEle = CamSDKOCX.GetDevName(i);
        DeviceList.options.add(new Option(DevEle, i));
        //DeviceList.options[mainDevCount].text = DevEle;
        mainDevCount++;
        //}	
    }
    if (mainDevCount > 0) {
        mainIndex = 0;
        DeviceList.options[0].selected = true;
    }
}

// <!--麦克风-->
function AddAudioDev(obj) {
    var nCount = CamSDKOCX.GetAudioDevCount();
    for (var i = 0; i < nCount; i++) {
        var DevEle = CamSDKOCX.GetAudioDevName(i);
        obj.options.add(new Option(DevEle));
    }
    if (nCount > 0) {
        obj.options[0].selected = true;
    }
}

const ChangeDevice= function() {
    CamSDKOCX.CloseDev();
    var obj = document.getElementById("DeviceList");
    var index = obj.selectedIndex;
    if (index >= 0) {
        CamSDKOCX.openDev(index, 0, 0, 0);
        AddMediaType(MediaType);
        AddResolution2Comb(Resolution);
    }
}


const Capture = function () {
    console.log("点击了拍照!");

    let newFile = "c://a.jpg";

    var files = CamSDKOCX.CaptureImage(newFile);
    console.log('files:' + files);
    return newFile;
}

const CaptureShow = function () {
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
    ChangeDevice
}