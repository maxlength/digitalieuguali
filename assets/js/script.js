// Animation scroll to

function doScrolling(id, duration) {
  var startingY = window.pageYOffset;
  var elementY =
    window.pageYOffset +
    document.getElementById(id).getBoundingClientRect().top;
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY;
  var diff = targetY - startingY;
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var start;

  if (!diff) return;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

// Contatore numero device

function animateValue(id, start, end, duration) {
  // assumes integer values for start and end

  var obj = document.getElementById(id);
  var range = end - start;
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50;
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range));

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer);

  // get current time and calculate desired end time
  var startTime = new Date().getTime();
  var endTime = startTime + duration;
  var timer;

  function run() {
    var now = new Date().getTime();
    var remaining = Math.max((endTime - now) / duration, 0);
    var value = Math.round(end - remaining * range);
    obj.innerHTML = value;
    if (value == end) {
      clearInterval(timer);
      obj.classList.add("glow");
      setTimeout(() => {
        obj.classList.remove("glow");
      }, 1000);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}

/*
  Recupero numero di device donati

  Come usare un google spreadsheet come json endpoint:
  https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/
*/

let linkToGoogleDocument =
  "https://spreadsheets.google.com/feeds/cells/1kis3LpXyEQkr2MprLVnzD3P_gL_pgsmAwxCw5e25hKc/1/public/full?alt=json";

fetch(linkToGoogleDocument)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    try {
      // Se la lettura del documento ha successo, letto l'informazione
      let devicesNumberAsString = data.feed.entry[0].content.$t;

      // Trasformo il dato da stringa a numero
      let devicesNumber = parseInt(devicesNumberAsString);

      // Faccio partire l'animazione del contatore
      animateValue("devices", 0, devicesNumber, 1000);
    } catch (e) {
      // altrimenti stampo l'errore
      console.log(e);
    }
  });

/*
  Scroll al box delle donazioni
*/

let donaOraLink = document.querySelector("[href='#donaBox']");

donaOraLink.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  /* DoScrolling function
     Parametri:
     - id dell'elemento verso cui scrollare
     - durata dell'animazione
  */
  doScrolling("donaBox", 1000);
});
