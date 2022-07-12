var jquerywait = setInterval(function() {
    if (jQuery != null) {
        clearInterval(jquerywait);
        jQuery.fn.insertAt = function(index, element) {
            var lastIndex = this.children().length;
            if (index < 0) {
              index = Math.max(0, lastIndex + 1 + index);
            }
            this.append(element);
            if (index < lastIndex) {
              this.children().eq(index).before(this.children().last());
            }
            return this;
          }
    }
},10);

var dialogStack = [];
function centerDiv(div) {
    div.style.top = (((window.innerHeight - div.offsetHeight) / 2) + document.scrollingElement.scrollTop) + 'px';
    div.style.left = (((window.innerWidth - div.offsetWidth) / 2) + document.scrollingElement.scrollLeft) + 'px';
}
function hasMuiRipple(ele) {
    
    return ele.attr("hasripple") != undefined;
}
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top
  };
}
function createRipple(event,button) {
    if (event.changedTouches != null) event = event.changedTouches[0];
    if ($(button).hasClass("mui-disabled")) return;
    if ($(button).attr("disabled")) return;
  let circle = document.createElement("span");
  circle.className = "mui-ripple";
  let circle2 = document.createElement("span");
  circle2.className = "mui-ripple-child"
  circle.appendChild(circle2);
  let off = getOffset(button);
  
  let yOff = event.clientY - off.top;
  let middley = button.clientHeight / 2;
  let addOffset2 = Math.abs(yOff - middley) * 2;
  
  let xOff = event.clientX - off.left;
  let middleX = button.clientWidth / 2;
  let addOffset = Math.abs(xOff - middleX) * 2;
  let diameter = Math.max(button.clientWidth + addOffset, button.clientHeight + addOffset2) * 1.5;
  let radius = diameter / 2;
  
  circle.style.width = circle.style.height = `${diameter}px`;
  
  circle.style.left = `${event.clientX - off.left - radius}px`;
  circle.style.top = `${event.clientY - off.top - radius}px`;
  /*let ripple = button.getElementsByClassName("mui-ripple")[0];
  if (ripple) {
    ripple.remove();
  }*/
  button.appendChild(circle);
}
function deleteRipple(button) {
    let ripple_list = button.getElementsByClassName("mui-ripple");
    for (let i = 0; i < ripple_list.length; i++) {
        let rippleJquery = $(ripple_list[i]);
        rippleJquery.fadeOut(600);
        setTimeout(function() {
            rippleJquery.remove();
        },610);
    }
    
}
function makeObjectFocusable(ele,eleFocus) {
    /*setInterval(function() {
        if (eleFocus.is(":focus-visible")) {
            
        }
    },10);*/
    eleFocus.addClass("mui-focusable");
    return;
    eleFocus.on("focus",function(eve) {
        ele.addClass("mui-button-focus");
    });
    $(document.body).on("mousedown",function(eve) {
        setTimeout(function() {
            ele.removeClass("mui-button-focus");
        });
    });
    eleFocus.on("blur",function(eve) {
        ele.removeClass("mui-button-focus");
    });
    $(document.body).on("mouseup",function(eve) {
        setTimeout(function() {
            ele.removeClass("mui-button-focus");
        });
    });
}
function addMuiRipple(ele) {
    if (hasMuiRipple(ele)) return;
    ele.attr("hasripple","true");
    ele.addClass("ripple-event-created");
    ele.css("overflow","hidden");
    let isTouch = false;
    ele.on("mousedown",function(eve) {
        if (isTouch) return;
        createRipple(eve,ele[0]);
    });
    $("body").on("mouseup",function(eve) {
        if (isTouch) return;
        deleteRipple(ele[0]);
    });
    ele.on("touchstart",function(eve) {
        isTouch = true;
        createRipple(eve,ele[0]);
    });
    $("body").on("touchend",function(eve) {
        deleteRipple(ele[0]);
    });
    makeObjectFocusable(ele,ele);
    //let rippleElement = $("<span class=\"mui-ripple\"></span>")
    //ele.append(rippleElement);
}

function checkInputOutlined(ele) {
    let isUnfolded = false;
    let isSelected = false;
   let suffix = ele.attr("suffix");
   let prefix = ele.attr("prefix");
    if (prefix != null || suffix != null) {
        isUnfolded = true;
    }
    if (ele.val().length > 0) {
        isUnfolded = true;
    }
    if (document.activeElement == ele[0]) {
        isUnfolded = true;
        isSelected = true;
    }
    let outlinedRoot = ele.parent();
    let inputRoot = outlinedRoot.parent();
    let fieldSetLegend = outlinedRoot.find(".mui-input-outlined-fieldset-legend");
    let inputLabel = inputRoot.find(".mui-input-label");
    let fieldSet = outlinedRoot.find(".mui-input-outlined-fieldset");
    if (isUnfolded) {
        fieldSetLegend.addClass("mui-input-outlined-fieldset-legend-selected");
        outlinedRoot.addClass("mui-input-outlined-root-selected");
        inputRoot.addClass("mui-input-root-selected");
        inputLabel.addClass("mui-input-label-selected");
    } else {
        fieldSetLegend.removeClass("mui-input-outlined-fieldset-legend-selected");
        outlinedRoot.removeClass("mui-input-outlined-root-selected");
        inputRoot.removeClass("mui-input-root-selected");
        inputLabel.removeClass("mui-input-label-selected");
    }
    if (isSelected) {
        fieldSet.addClass("mui-input-outlined-fieldset-selected");
        inputLabel.addClass("mui-input-label-selected-active");
    } else {
        fieldSet.removeClass("mui-input-outlined-fieldset-selected");
        inputLabel.removeClass("mui-input-label-selected-active");
    }
}


function checkInputFilled(ele) {
    let isUnfolded = false;
    let isSelected = false;
   let suffix = ele.attr("suffix");
   let prefix = ele.attr("prefix");
    if (ele.val().length > 0) {
        isUnfolded = true;
    }
    if (prefix != null || suffix != null) {
        isUnfolded = true;
    }
    if (document.activeElement == ele[0]) {
        isUnfolded = true;
        isSelected = true;
    }
    let filledRoot = ele.parent();
    let inputRoot = filledRoot.parent();
    let inputLabel = inputRoot.find(".mui-input-label");
    if (isUnfolded) {
        inputLabel.addClass("mui-input-filled-label-expanded");
    } else {
        inputLabel.removeClass("mui-input-filled-label-expanded");
    }
    if (isSelected) {
        inputLabel.addClass("MuiFocused");
        filledRoot.addClass("MuiFocused");
    } else {
        inputLabel.removeClass("MuiFocused");
        filledRoot.removeClass("MuiFocused");
    }
}

function addMuiInputOutlined(ele) {
   let placeholder = ele.attr("placeholder");
   let elementParent = ele.parent();
   let elementIndex = ele.index();
   let suffix = ele.attr("suffix");
   let prefix = ele.attr("prefix");
   let oldcss = ele.attr("style");
   let oldcss2 = ele.attr("class2");
   ele.attr("placeholder","");
   ele.addClass("muiinputcomplete");
   ele.addClass("mui-input-outlined-input");
   ele.attr("style","");
   ele.attr("class2","");
   let structure = $("<div class='mui-input-root MuiInputRootOutlined'><label class='mui-input-label'></label><div class='mui-input-outlined-root'><fieldset class='mui-input-outlined-fieldset'><legend class='mui-input-outlined-fieldset-legend'><span></span></legend></fieldset></div></div>");
   
   ele.detach();
   /*structure.find(".mui-input-outlined-root").prepend(ele);*/
   let outlinedRoot = structure.find(".mui-input-outlined-root");
   let fieldset = structure.find(".mui-input-outlined-fieldset");;
   let label = structure.find(".mui-input-label");
   if (prefix != null) {
       createMuiInputAdornment(prefix,false).appendTo(outlinedRoot);
   }
   ele.appendTo(outlinedRoot);
   if (suffix != null) {
       createMuiInputAdornment(suffix,false).appendTo(outlinedRoot);
   }
   label.text(placeholder);
   structure.find(".mui-input-outlined-fieldset-legend").find("span").text(placeholder);
   elementParent.insertAt(elementIndex,structure);
        checkInputOutlined(ele);
    document.addEventListener('focus', function() {
        checkInputOutlined(ele);
    }, true);
    document.addEventListener("mouseup",function() {
        checkInputOutlined(ele);
    },true);
    structure.attr("style",oldcss);
    structure.addClass(oldcss2);
    let errorP = $("<p class='mui-helper-text mui-error'></p>");
    setInterval(function() {
        let errorText = ele.attr("error");
        if (errorText == "") errorText = null;
        if (errorText != null) {
            if (!fieldset.hasClass("mui-error")) {fieldset.addClass("mui-error");}
            if (!label.hasClass("mui-error")) {label.addClass("mui-error");}
            if (errorP.text() != errorText) errorP.text(errorText);
            if (errorP.parent().length == 0) {
                errorP.appendTo(structure);
            }
        } else {
            if (fieldset.hasClass("mui-error")) {fieldset.removeClass("mui-error");}
            if (label.hasClass("mui-error")) {label.removeClass("mui-error");}
            if (errorP.parent().length == 1) {
                errorP.remove();
            }
        }
    },100);
}
function createMuiInputAdornment(text,filled) {
   let adornment = $("<div class='mui-input-adornment'><p></p></div>");
   adornment.find("p").text(text);
   if (filled) {
       adornment.addClass("mui-input-adornment-filled");
   }
   return adornment;
}
function addMuiInputFilled(ele) {
    let placeholder = ele.attr("placeholder");
    let elementParent = ele.parent();
    console.log(elementParent);
    let elementIndex = ele.index();
    let suffix = ele.attr("suffix");
    let prefix = ele.attr("prefix");
    let oldcss = ele.attr("style");
    let oldcss2 = ele.attr("class2");
    ele.attr("style","");
    ele.attr("class2","");
    ele.attr("placeholder","");
    ele.addClass("muiinputcomplete");
    ele.addClass("mui-input-filled-input");
    let structure = $("<div class='mui-input-root MuiInputRootFilled'><label class='mui-input-label'></label><div class='mui-input-filled-root'></div></div>");
    let filledRoot = structure.find(".mui-input-filled-root");
    let label = structure.find(".mui-input-label");
    ele.detach();
    if (prefix != null) {
        createMuiInputAdornment(prefix,true).appendTo(filledRoot);
    }
    ele.appendTo(filledRoot);
    if (suffix != null) {
        createMuiInputAdornment(suffix,true).appendTo(filledRoot);
    }
    label.text(placeholder);
    elementParent.insertAt(elementIndex,structure);
    checkInputFilled(ele);
    document.addEventListener('focus', function() {
        checkInputFilled(ele);
    }, true);
    document.addEventListener("mouseup",function() {
        checkInputFilled(ele);
    },true);
    structure.attr("style",oldcss);
    structure.addClass(oldcss2);
    let errorP = $("<p class='mui-helper-text mui-error'></p>");
    setInterval(function() {
        let errorText = ele.attr("error");
        if (errorText == "") errorText = null;
        if (errorText != null) {
            if (!filledRoot.hasClass("mui-error")) {filledRoot.addClass("mui-error");}
            if (!label.hasClass("mui-error")) {label.addClass("mui-error");}
            if (errorP.text() != errorText) errorP.text(errorText);
            if (errorP.parent().length == 0) {
                errorP.appendTo(structure);
            }
        } else {
            if (filledRoot.hasClass("mui-error")) {filledRoot.removeClass("mui-error");}
            if (label.hasClass("mui-error")) {label.removeClass("mui-error");}
            if (errorP.parent().length == 1) {
                errorP.remove();
            }
        }
    },100);
}
function doCheckbox(structure) {
    let ele = structure.find(".mui-checkbox-input");
    structure.find(".mui-checkbox-svg").remove();
    let svgStructure = null;
    if (ele.is(":checked")) {
        structure.addClass("mui-checkbox-root-selected");
        svgStructure = $('<svg class="mui-checkbox-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxIcon"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>');
    } else {
        if (ele.prop("indeterminate")) {
            structure.addClass("mui-checkbox-root-selected");
            svgStructure = $('<svg class="mui-checkbox-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="IndeterminateCheckBoxIcon"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></svg>');
        } else {
            structure.removeClass("mui-checkbox-root-selected");
            svgStructure = $('<svg class="mui-checkbox-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckBoxOutlineBlankIcon"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>');
        }
    }
     svgStructure.appendTo(structure);   
}
function addMuiCheckbox(ele) {
    let label = ele.attr("label");
    let elementParent = ele.parent();
    let elementIndex = ele.index();
    ele.attr("label","");
    ele.addClass("muicheckboxcomplete");
    ele.addClass("mui-checkbox-input");
    let structure = $("<div class='mui-checkbox-root'></div>");
    ele.detach();
    ele.appendTo(structure);
    let newRoot = structure;
    if (label != null) {
        if (label.length > 0) {
            let upperStructure = $("<label class='mui-checkbox-upper-root'></label>");
            let labelText = $("<span class='mui-checkbox-label'></span>");
            labelText.text(label);
            structure.appendTo(upperStructure);
            labelText.appendTo(upperStructure);
            newRoot = upperStructure;
        }
    }
    elementParent.insertAt(elementIndex,newRoot);
    addMuiRipple(structure);
    doCheckbox(structure);
    ele.change(function() {
       doCheckbox(structure); 
    });
    makeObjectFocusable(structure,ele);
}
function doSwitch(structure) {
    let ele = structure.find(".mui-switch-input");
    let track = structure.find(".mui-switch-track");
    let base = structure.find(".mui-switch-base");
    let thumb = structure.find(".mui-switch-thumb");
    if (ele.is(":checked")) {
        structure.addClass("mui-switch-checked");
        track.addClass("mui-switch-track-checked");
        base.addClass("mui-switch-base-checked");
        thumb.addClass("mui-switch-thumb-checked");
    } else {
        structure.removeClass("mui-switch-checked");
        track.removeClass("mui-switch-track-checked");
        base.removeClass("mui-switch-base-checked");
        thumb.removeClass("mui-switch-thumb-checked");
    }
        
}
function addMuiSwitch(ele) {
    let label = ele.attr("label");
    let elementParent = ele.parent();
    let elementIndex = ele.index();
    ele.attr("label","");
    ele.addClass("muiswitchcomplete");
    ele.addClass("mui-switch-input");
    let structure = $("<span class='mui-switch-root'><span class='mui-switch-base'><span class='mui-switch-thumb'></span></span><span class='mui-switch-track'></span></span>");
    let switchbase = structure.find(".mui-switch-base");
    ele.detach();
    ele.appendTo(switchbase);
    let newRoot = structure;
    if (label != null) {
        if (label.length > 0) {
            let upperStructure = $("<label class='mui-checkbox-upper-root'></label>");
            let labelText = $("<span class='mui-checkbox-label'></span>");
            labelText.text(label);
            structure.appendTo(upperStructure);
            labelText.appendTo(upperStructure);
            newRoot = upperStructure;
        }
    }
    elementParent.insertAt(elementIndex,newRoot);
    doSwitch(structure);
    ele.change(function() {
       doSwitch(structure); 
    });
    /*makeObjectFocusable(structure,ele);*/
}
function checkMuiRipple() {
    // Menu item ripple
    $(".mui-menu-item").each(function(ind) {
       addMuiRipple($(this));
    });
    // Button ripple
    $(".mui-button").each(function(ind) {
        if (!$(this).hasClass("mui-button-outlined") && !$(this).hasClass("mui-button-contained")) {
            if (!$(this).hasClass("muibtntext")) $(this).addClass("muibtntext");
        } else {
            if ($(this).hasClass("muibtntext")) $(this).removeClass("muibtntext");
        }
       addMuiRipple($(this));
    });
    // Icon Button ripple
    $(".mui-iconbutton").each(function(ind) {
        if (!$(this).hasClass("ripple-event-created")) {
            let icon = $(this).attr("icon");
            let size = $(this).attr("size");
            if (icon != null) {
                let struc = $("<span class='material-icons'></span>");
                struc.text(icon);
                struc.appendTo($(this));
                if (size != null) {
                    struc.css("font-size",size.toString() + "px");
                }
            }
        }
       addMuiRipple($(this));
    });
    // Tab Icon Button ripple
    $(".mui-tabicon").each(function(ind) {
        if (!$(this).hasClass("ripple-event-created")) {
            let icon = $(this).attr("icon");
            let size = $(this).attr("size");
            if (icon != null) {
                let struc = $("<span class='material-icons'></span>");
                struc.text(icon);
                if ($(this).text().length > 0) {
                    struc.css("margin-bottom","6px");
                }
                struc.prependTo($(this));
                if (size != null) {
                    struc.css("font-size",size.toString() + "px");
                }
            }
        }
       addMuiRipple($(this));
    });
    // Button ripple 2
    $(".mui-button-outlined, .mui-button-contained").each(function(ind) {
        if (!$(this).hasClass("mui-button")) {
            console.warn(".mui-button-outlined or .mui-button-contained found without .mui-button");
            $(this).addClass("mui-button");
        }
    });
    // Input
    $(".mui-input").each(function(ind) {
        if (!$(this).hasClass("muiinputcomplete")) {
            if ($(this).hasClass("mui-input-outlined")) {
                addMuiInputOutlined($(this));
            }
            if ($(this).hasClass("mui-input-filled")) {
                addMuiInputFilled($(this));
            }
        }
    });
    
    // Checkbox
    $(".mui-checkbox").each(function(ind) {
        if (!$(this).hasClass("muicheckboxcomplete")) {
            addMuiCheckbox($(this));
        }
    });
    
    // List button
    $(".mui-list-item-button").each(function(ind) {
       addMuiRipple($(this));
    });
    
    // Card action
    $(".mui-card-action").each(function(ind) {
       addMuiRipple($(this));
    });
    
    // switch
    $(".mui-switch").each(function(ind) {
        if (!$(this).hasClass("muiswitchcomplete")) {
            addMuiSwitch($(this));
        }
    });
    
    // bottom navigation action
    $(".mui-bottomnavigation-action").each(function(ind) {
        if (!$(this).hasClass("mui-bottomnavigation-action-finished")) {
            addBottomNavigationAction($(this));
        }
    });
    
    // tabs
    $(".mui-tabs").each(function(ind) {
        if (!$(this).hasClass("mui-tabs-complete")) {
            addMuiTab($(this));
        }
    });
    
    // tabs scrollbutton
    $(".mui-tabs-scrollbutton").each(function(ind) {
        if (!$(this).hasClass("ripple-event-created")) {
            let icon = $(this).attr("icon");
            let size = $(this).attr("size");
            if (icon != null) {
                let struc = $("<span class='material-icons'></span>");
                struc.text(icon);
                struc.appendTo($(this));
                if (size != null) {
                    struc.css("font-size",size.toString() + "px");
                }
            }
        }
       addMuiRipple($(this));
    });
    
    // Circular Progress
    
    $(".mui-circularprogress").each(function(ind) {
        if (!$(this).hasClass("progress-created")) {
            $(this).addClass("progress-created");
            $(this).append('<svg style="display:block;" viewBox="22 22 44 44"><circle class="mui-circularprogress-circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle></svg>');
        }
    });
    
    // Menu
    
    $(".mui-menu").each(function(ind) {
        if (!$(this).hasClass("menu-created")) {
            createMuiMenu($(this));
        }
    });
    
    // Drawer
    
    $(".mui-drawer").each(function(ind) {
        if (!$(this).hasClass("drawer-created")) {
            createMuiDrawer($(this));
        }
    });
    
    // Alert icon
    
    $(".mui-alert").each(function(ind) {
        if (!$(this).hasClass("alert-created")) {
            $(this).addClass("alert-created");
            let j = $(this);
            let icon = null;
            if (j.hasClass("mui-alert-error")) icon = "error_outline";
            if (j.hasClass("mui-alert-warning")) icon = "warning_amber";
            if (j.hasClass("mui-alert-info")) icon = "info_outline";
            if (j.hasClass("mui-alert-success")) icon = "task_alt";
            if (icon != null) {
                let icon2 = $("<div class='mui-alert-icon'><span class='material-icons'>"+icon+"</span></div>");
                icon2.prependTo(j);
            }
        }
    });
    
    
}


function openMuiMenu(menuid,anchorele,placement="top") {
    let ele = $("#" + menuid);
    ele.parent().show();
    ele.show();
    if (anchorele != null) {
        let anchorelement = anchorele;
        if (anchorelement instanceof jQuery) {
            anchorelement = anchorelement[0];
        }
        var popper = Popper.createPopper(anchorelement, ele[0], {
            placement: placement,
            modifiers: [
                {
                  name: 'computeStyles',
                  options: {
                    gpuAcceleration: false, 
                  },
                },
            ],
        });
        
    }
    setTimeout(function() {
        ele.css("transform","scale(1)");
        ele.css("opacity","1");
    });
}
function closeMuiMenu(menuid) {
    let ele = $("#" + menuid);
    ele.css("opacity","0");
    ele.css("transform","scale(0.9)");
    setTimeout(function() {
        ele.parent().hide();
    },300);
}
function openMuiDrawer(menuid) {
    let ele = $("#" + menuid);
    let backdrop = ele.parent().find(".backdrop");
    backdrop.css("opacity","0");
    ele.parent().show();
    backdrop.animate({opacity:1},225);
    ele.css("transform","translate(0px,0px)");
    
}
function closeMuiDrawer(menuid) {
    let ele = $("#" + menuid);
    let backdrop = ele.parent().find(".backdrop");
    backdrop.animate({opacity:0},225);
    ele.css("transform","translate(-"+ele[0].clientWidth.toString()+"px,0px)");
    setTimeout(function() {
        ele.parent().hide();
    },300);
}
function createMuiDrawer(ele) {
    ele.css("transform","translate(-"+ele[0].clientWidth.toString()+"px,0px)");
    ele.css("opacity","1");
    ele.addClass("drawer-created");
    let struc = $("<div class='mui-modal'></div>");
    let backdrop = $("<div class='backdrop'></div>");
    backdrop.appendTo(struc);
    ele.appendTo(struc);
    backdrop.click(function() {
        closeMuiDrawer(ele.attr("id"));
    });
    struc.appendTo("body");
    struc.hide();
    
}
function createMuiMenu(ele) {
    ele.addClass("menu-created");
    let struc = $("<div class='mui-modal'></div>");
    let backdrop = $("<div class='backdrop backdrop-invisible'></div>");
    backdrop.appendTo(struc);
    ele.appendTo(struc);
        
    backdrop.click(function() {
        closeMuiMenu(ele.attr("id"));
    });
    ele.css("opacity","0");
    ele.css("transform","scale(0.9)");
    ele.css("transform-origin","0px 0px");
    ele.css("transition","opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms");
    struc.appendTo("body");
    struc.hide();
}

function addMuiTab(ele) {
    let indicator = $("<span class='mui-tabs-indicator'></span>");
    let tabcontainer = $("<div class='mui-tabs-container'></div>");
    let tabscroller = $("<div class='mui-tabs-scroller'></div>");
    let scrollleft = $("<div class='mui-tabs-scrollbutton' icon='chevron_left'></div>");
    let scrollright = $("<div class='mui-tabs-scrollbutton' icon='chevron_right'></div>");
    function capScroll(val) {
        if (val < 0) return 0;
        let width1 = tabscroller[0].scrollWidth - tabscroller[0].clientWidth;
        if (val > width1) return width1;
        return val;
    }
    scrollleft.click(function() {
        tabscroller.stop().animate({scrollLeft:capScroll(tabscroller[0].scrollLeft - tabscroller[0].clientWidth)},500);
    });
    scrollright.click(function() {
        tabscroller.stop().animate({scrollLeft:capScroll(tabscroller[0].scrollLeft + tabscroller[0].clientWidth)},500); 
    });
    ele.children().each(function(ind) {
        $(this).appendTo(tabcontainer);
        addMuiRipple($(this));
        $(this).click(function() {
           tabcontainer.children().each(function(ind2) {$(this).removeClass("mui-selected");});
           $(this).addClass("mui-selected");
           reIndicate(); 
        });
        if (ele.attr("fullwidth") != null) {
            $(this).addClass("mui-tab-fullwidth")
        }
    });
    tabcontainer.appendTo(tabscroller);
    indicator.appendTo(tabscroller);
    scrollleft.appendTo(ele);
    tabscroller.appendTo(ele);
    scrollright.appendTo(ele);
    ele.addClass("mui-tabs-complete");
    function reIndicate() {
        let activetab = tabcontainer.find(".mui-selected");
        if (activetab.length > 1) {
            for (let i = 1; i < activetab.length; i++) {
                activetab[i].classList.remove("mui-selected");
            }
        }
        if (activetab.length > 0) {
            indicator.css("left",activetab[0].offsetLeft + "px");
            indicator.css("width",activetab[0].offsetWidth + "px");
        }
        let hasScroll = tabscroller[0].scrollWidth > tabscroller[0].clientWidth;
        if (hasScroll) {
            scrollleft.show();
            scrollright.show();
            if (tabscroller[0].scrollLeft == 0) {
                if (!scrollleft.hasClass("mui-tabs-scrollbutton-disabled")) {
                    scrollleft.addClass("mui-tabs-scrollbutton-disabled");
                }
            } else {
                if (scrollleft.hasClass("mui-tabs-scrollbutton-disabled")) {
                    scrollleft.removeClass("mui-tabs-scrollbutton-disabled");
                }
            }
            if (tabscroller[0].scrollLeft >= tabscroller[0].scrollWidth - tabscroller[0].clientWidth - 4) {
                if (!scrollright.hasClass("mui-tabs-scrollbutton-disabled")) {
                    scrollright.addClass("mui-tabs-scrollbutton-disabled");
                }
            } else {
                if (scrollright.hasClass("mui-tabs-scrollbutton-disabled")) {
                    scrollright.removeClass("mui-tabs-scrollbutton-disabled");
                }
            }
        } else {
            scrollleft.hide();
            scrollright.hide();
        }
    }
    reIndicate();
    setInterval(function() {
        reIndicate();
    },100);
}
function addBottomNavigationAction(ele) {
    let bottomnav = ele.parent();
    let label = ele.text();
    let icon = ele.attr("icon");
    ele.attr("icon");
    ele.html("");
    ele.addClass("mui-bottomnavigation-action-finished");
    
    
    let iconstruc = $("<span class='material-icons'></span>");
    iconstruc.text(icon);
    iconstruc.appendTo(ele);
    
    let labelstruc = $("<span class='mui-bottomnavigation-action-label'></span>");
    labelstruc.text(label);
    labelstruc.appendTo(ele);
    
    ele.click(function() {
       bottomnav.children().each(function(ind) {
        $(this).removeClass("mui-selected");
       });
       ele.addClass("mui-selected");
    });
    addMuiRipple(ele);
}
function openMuiDialog(dialogid) {
    dialogStack.push(dialogid);
    let dialog = $(document.getElementById(dialogid));
    dialog.css("display","");
    dialog.removeClass("dialog-hide");
    let newBackdrop = $("<div class=\"backdrop\"></div>");
    newBackdrop.hide();
    newBackdrop.fadeIn(225);
    newBackdrop.on("click",function(){hideCurrentMuiDialog();});
    $("body").append(newBackdrop);
    dialog.css('z-index', 9998 + dialogStack.length);
    if (!dialog.hasClass("dialog-fullscreen")) {
        centerDiv(dialog[0]);
        setInterval(function() {
           centerDiv(dialog[0]); 
        },100);
    }
    dialog.hide();
    dialog.fadeIn(225);
    setTimeout(function() {
        dialog.css("display","flex");
    },230);
    /*dialog.css("opacity",0);
    setTimeout(function(){dialog.css("opacity",1);},50);*/
    
    
    $("body").css("overflow","hidden");
}
function hideMuiDialog(dialogid) {
    dialogStack.splice(dialogStack.indexOf(dialogid),1);
    let dialog = $(document.getElementById(dialogid));
    let backdrop = $(".backdrop").first();
    dialog.fadeOut(225);
    
    setTimeout(function(){dialog.hide();dialog.addClass("dialog-hide");},225);
    backdrop.fadeOut(225);
    setTimeout(function() {
        backdrop.remove();
    },235);
    if (dialogStack.length == 0) {
        $("body").css("overflow","");
    }
}
function hideCurrentMuiDialog() {
    hideMuiDialog(getOpenMuiDialog());
}
function getOpenMuiDialog() {
    /*let openMuiDialogs = $(".dialog").not(".dialog-hide");
    if (openMuiDialogs.length == 0) return null;
    return openMuiDialogs[0].id;*/
    if (dialogStack.length == 0) return null;
    return dialogStack[dialogStack.length - 1];
}

jQuery.fn.extend({
  template: function(targetElement) {
    let tempList = [];
    this.each(function() {
        let temp = this;
        targetElement.each(function() {
            let clon = temp.content.children[0].cloneNode(true);
            tempList.push(clon);
            this.appendChild(clon);
        });
    });
    return $().add(tempList);
  }
});
$(function() {
    checkMuiRipple();
    
    setInterval(function() {
        checkMuiRipple();
    },100);
    
});