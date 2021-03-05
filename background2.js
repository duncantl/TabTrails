var results = browser.storage.local.get();

var tabTrails = {};

results.then ( (obj) => {

    if(!obj) {
	obj = [];
    }
    
    tabTrails = obj;

    startIt();

});




