document.addEventListener("DOMContentLoaded", loadApp);

function loadApp() {
  // wait 2 seconds, then fade out text
  setTimeout(() => {
    fadeout();
  }, 2000);

  // wait 4 seconds, then switch to fridge tab
  setTimeout(() => {
    window.location.href = "fridge.html";
  }, 4000);
}

// fade text out, opacity 1 -> 0 will take 2s
function fadeout() {
  document.getElementById("fadeout").style.opacity = "0";
}
