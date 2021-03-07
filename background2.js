var results = browser.storage.local.get();

results.then ( (obj) => {

    if(!obj) 
	reset(); // obj = [];

    
    tabTrails = obj;

    startIt();

});


// Handle messages from the popup to control the operations this background entity is doing
function popupEvent(id)
{
    switch(id) {
	  case "reset":
	   reset()
	   break;
	  case "stop":
	   stopIt();
	   break;
	  case "start":
	   startIt();
	   break;	   
          case "export":
	   exportTrails();
	   break;
	  case "summary":
	   break;	   
    }
}

browser.runtime.onMessage.addListener(popupEvent);




