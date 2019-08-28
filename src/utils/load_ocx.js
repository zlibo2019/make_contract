
const setAttr = function (attr, val) {
    let obj = document.createAttribute(attr);
    obj.value = val;
    return obj;
};

// class FmlCom {
// 实现jquery里的append方法
const domAppend = function (body, id) {
    let obj = document.createElement("OBJECT");
    let objId = ''
    objId = setAttr("id", id);
    obj.setAttributeNode(objId);
    let objClassid = setAttr(
        "classid",
        "clsid:556DBC8A-FE4A-4DA7-A82E-3926C8D4AC41"    //你电脑安装的ocx控件的ID //DE96678E-5929-4FC1-9640-D7FB380E4F93
    );

    obj.setAttributeNode(objClassid);

    let codebase = setAttr("codebase", "/CamSDKOCX.ocx") //如果电脑中没有ocx此属性会在IE浏览器下自动提示下载
    obj.setAttributeNode(codebase);

    let objWidth = setAttr("width", 580);
    obj.setAttributeNode(objWidth);
    let objHeight = setAttr("height", 580);
    obj.setAttributeNode(objHeight);
    let objhspace = setAttr("hspace", 100);
    obj.setAttributeNode(objhspace);
    let objvspace = setAttr("vspace", 100);
    obj.setAttributeNode(objvspace);
    body.appendChild(obj);
}
// }

// const FmlCommon = new FmlCom();
export {
    domAppend
}