var xtrail = [];

function logURL(requestDetails) {
    console.log("Loading: " + requestDetails.url);
    trail.push(requestDetails.url);
}

/*
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);
*/


/*
window.addEventListener("click", function(event) {
    console.log("loading " + event.target);
    trail.push(event.target);
}, false);
*/			
