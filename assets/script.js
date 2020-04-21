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
      let devicesPlaceholder = document.getElementsByClassName("devices")[0];
      let devicesNumber = data.feed.entry[0].content.$t;
      devicesPlaceholder.innerText = devicesNumber;
    } catch (e) {
      console.log(e);
    }
  });
