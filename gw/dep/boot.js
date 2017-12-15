/**
 * @file
 * @auth jinguangguo
 * @date 2017/1/16
 */

(function () {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");
    if (browser == "Microsoft Internet Explorer" && (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0"
            || trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0")) {
        window.location.href = './ie.html';
    }
})();