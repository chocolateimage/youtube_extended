
/* MAIN CODE */
jQuery = {}
jQuery.ajax = function(url,options) {
    fetch(url,{
        method: options.type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': options.contentType
        },
        body:options.data
    }).then(res => res.json()).then(res => options.success(res));
};

$ = jQuery
//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request["load"] == true) {
        chrome.storage.sync.get(null, function(items) {
            sendResponse(JSON.stringify(items));
        });
    }
    if (request["sendjson"] != null) {
        let sj = request["sendjson"];
        $.ajax("http://playlook.de:8312" + sj["url"], {
            data : JSON.stringify(sj["json"]),
            contentType : 'application/json',
            type : 'POST',
            success: function(data) {/*sendResponse(JSON.stringify(data));*/},
        });
    }
});
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == "script") {
        port.onMessage.addListener(function(msg) {
            fetch(msg["url"]).then(res => res.text()).then(res => port.postMessage(res));
        });
    }
    if (port.name == "load") {
        chrome.storage.sync.get(null, function(items) {
            port.postMessage(JSON.stringify(items));
        });
    }
    if (port.name == "cookies") {
        chrome.cookies.getAll({"domain":".youtube.com"},function(cks) {
            let a = {}
            for (let i of cks) {
                a[i.name] = i.value
            }
            port.postMessage(a);
        });
    }
    if (port.name == "sendjson") {
        port.onMessage.addListener(function(msg) {
            let sj = msg["sendjson"];
            $.ajax("http://playlook.de:8312" + sj["url"], {
                data : sj["json"],
                contentType : 'application/json',
                type : 'POST',
                success: function(data) {port.postMessage(data);},
            });
        });
    }
});