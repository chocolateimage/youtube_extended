var options = [
    {
        "id":"old_description",
        "type":"bool",
        "title":"Old description",
        "description":"Brings back the old description box.",
        "default":true
    },
    {
        "id":"new_channel_layout",
        "type":"bool",
        "title":"New channel layout",
        "description":"YouTube Extended has a custom channel layout.",
        "default":true
    },
    {
        "id":"other",
        "type":"bool",
        "title":"Other",
        "description":"Other stuff",
        "default":false
    },
    {
        "id":"download",
        "type":"bool",
        "title":"Download Video",
        "description":"Removes the YouTube Premium download button and adds a new download button",
        "default":true
    },
    {
        "id":"returncomments",
        "type":"bool",
        "title":"Return Comments",
        "description":"",
        "default":true
    }
];
function setvalue(key,value) {
    let dict = {};
    dict[key] = value;
    chrome.storage.sync.set(dict);
}
for (let option of options) {
    chrome.storage.sync.get(option.id,function(val_) {
        let val = val_[option.id];
        let id = option.id;
        if (val == null) {
            val = option["default"].toString();
            setvalue(id,option.default.toString());
        }
        
        let a = $("<div class='list-group-item d-flex justify-content-between'><div class='d-flex flex-column'><span class='option-title'></span><span class='text-secondary option-description'></span></div><div class='option-content'></div></div>");
        a.find(".option-title").text(option["title"]);
        a.find(".option-description").text(option["description"]);
        let b = null;
        let typ = option["type"];
        if (typ == "bool") {
            b = $(`<div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch"></div>`);
            if (val == 'true') {
                b.find("input").attr("checked",true);
            }
            b.find("input").change(function() {
                setvalue(id,b.find("input").is(":checked").toString());
            });
        }


        if (b != null) {
            a.find(".option-content").append(b);
        }
        a.appendTo("#list");
    });
}