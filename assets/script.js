// Come usare un google spreadsheet come json endpoint:
// https://www.freecodecamp.org/news/cjn-google-sheets-as-json-endpoint/
fetch(
  "https://spreadsheets.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    try {
      console.log(data.feed.entry[0].content.$t);
      console.log(data.feed.entry[1].content.$t);
      console.log(data.feed.entry[2].content.$t);
      console.log(data.feed.entry[3].content.$t);
    } catch (e) {
      console.log(e);
    }
  });
