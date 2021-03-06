var results = browser.storage.local.get();

results.then ( (obj) => {

    if(!obj) 
	obj = [];

    
    tabTrails = obj;

    startIt();

});


function popupEvent(id)
{
//    console.log("popupEvent " + id);
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




