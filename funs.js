var tabTrails = {};

function reset()
{
    tabTrails = { "events": [] };
    console.log("reset");
}

function exportTrails()
{
    let res = JSON.stringify(tabTrails);
    //  https://stackoverflow.com/questions/61170510/firefox-extension-open-window-and-write-dynamic-content
    let url = URL.createObjectURL(new Blob([res], {type: 'application/json;charset=UTF-8', fileName: "TabTrails.json", dowload: "MyFile.json", upload: "Upload"}));
    url.pathname = "bob.json";
    let w = browser.windows.create({url: url}); // window.open("", "_blank");
/*    
    if(w) {
        w.then((win) => {
	    console.log(Object.keys(win.tabs[0]));
	    // win.tabs[0].document.body.innerHTML = res;
	} ,
	       (err) => { console.log(err) } );
    }
*/
    // console.log("JSON: " + res);
}

function startIt() {
//    browser.webNavigation.onCompleted.addListener( completed );
    browser.webNavigation.onCommitted.addListener( committed );    
    browser.webNavigation.onCreatedNavigationTarget.addListener( createdNavigationTarget );
    browser.webNavigation.onTabReplaced.addListener( tabReplaced );
    browser.webNavigation.onErrorOccurred.addListener( errorOccurred);

    // Not in Firefox   browser.tabs.onActiveChanged.addListener(tabChange);
    browser.tabs.onActivated.addListener(tabChange);
    browser.windows.onCreated.addListener(newWindow);
    browser.windows.onRemoved.addListener(closedWindow);        
    console.log("added the webNavigation listeners");    
}


function stopIt()
{
    browser.webNavigation.onCommitted.removeListener( committed );    
    browser.webNavigation.onCreatedNavigationTarget.removeListener( createdNavigationTarget );
    browser.webNavigation.onTabReplaced.removeListener( tabReplaced );
    browser.webNavigation.onErrorOccurred.removeListener( errorOccurred);

    browser.tabs.onActivated.removeListener(tabChange);
    browser.windows.onCreated.removeListener(newWindow);
    browser.windows.onRemoved.removeListener(closedWindow);        
    
    console.log("removed the webNavigation listeners");
}



function addEvent(ev, type)
{
    ev.eventType = type;
    if(!tabTrails["events"])
	tabTrails["events"] = [];

    ev.timeStamp = Date.now();
    
    tabTrails["events"].push(ev)
}

function newWindow(ev)
{
    console.log("new window: " + Object.keys(ev));

    addEvent(ev, "newWindow");
}

function closedWindow(ev)
{
    console.log("close window: "  + Object.keys(ev));
    addEvent({windowId: ev}, "closeWindow");
}


function tabChange(t, info)
{
    console.log("Switched tab " + t.tabId + " " + Object.keys(t)); // + " " + Object.keys(info)); 
    addEvent(t, "switchedTab");
}




function completed(ev)
{
    committ(ev, "completed")
}

function committed(ev)
{
    committ(ev, "committed")
}

function createdNavigationTarget(ev)
{
    committ(ev, "createdNavigationTaret")
}

function tabReplaced(ev)
{
    committ(ev, "tabReplaced")
}

function errorOccurred(ev)
{
    committ(ev, "errorOccurred")
}

function committ(ev, type)
{
    if(ev.frameId !== 0)
	return;

    let transitionType = ev.transitionType;
    console.log(type + " " + transitionType + " in " + ev.tabId + " " + ev.url);

/*    
    var el = {type: ev.transitionType,
	      tab: ev.tabId,
	      url: ev.url,
	      time: ev.timeStamp
	     };
*/

    ev.type = type;
    
    var id = "t" + ev.tabId;
    var tmp = tabTrails[id];
    if(!tmp)
	tabTrails[id] = [];

    tabTrails[id].push(ev);
    browser.storage.local.set(tabTrails);
}

