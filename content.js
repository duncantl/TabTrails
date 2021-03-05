// var trail = []

function notifyExtension(e) {

    var target = e.target;
    while ((target.tagName != "A" || !target.href) && target.parentNode) {
	target = target.parentNode;
    }
    if (target.tagName != "A")
	return;

    var f = webNavigation.getFrame();
    
    console.log("going to " + target.href + " in " + f);
//    browser.tabs.
    // trail.push(target.href);
}

window.addEventListener("click", notifyExtension);

console.log("registered");