function startIt() {
    browser.webNavigation.onCommitted.addListener( committed );    
//    browser.webNavigation.onCompleted.addListener( completed );
    browser.webNavigation.onCreatedNavigationTarget.addListener( createdNavigationTarget );
    browser.webNavigation.onTabReplaced.addListener( tabReplaced );
    browser.webNavigation.onErrorOccurred.addListener( errorOccurred);    
}

// needs to be in popup.js but needs to see committ
function stopIt()
{
    browser.webNavigation.onCommitted.removeListener( committed );    
//    browser.webNavigation.onCompleted.removeListener( completed );
    browser.webNavigation.onCreatedNavigationTarget.removeListener( createdNavigationTarget );
    browser.webNavigation.onTabReplaced.removeListener( tabReplaced );
    browser.webNavigation.onErrorOccurred.removeListener( errorOccurred);        
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
    console.log(type + " " + transitionType);

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

