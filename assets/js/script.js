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

// Come usare un google spreadsheet come json endpoint:
// https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/
fetch(
  "https://spreadsheets.google.com/feeds/cells/1kis3LpXyEQkr2MprLVnzD3P_gL_pgsmAwxCw5e25hKc/1/public/full?alt=json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    try {
      let devicesNumber = data.feed.entry[0].content.$t;
      animateValue("devices", 0, parseInt(devicesNumber), 1000);
    } catch (e) {
      console.log(e);
    }
  });
