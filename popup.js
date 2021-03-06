// console.log("Ok");

function sendEv(ev)
{
    browser.runtime.sendMessage(ev.target.id);
}

document.getElementById('start').addEventListener("click", sendEv);
document.getElementById('stop').addEventListener("click", sendEv);
document.getElementById('reset').addEventListener("click", sendEv);
document.getElementById('summary').addEventListener("click", sendEv);
document.getElementById('export').addEventListener("click", sendEv);

