// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    })
  })
}

// 1. Create a variable to keep track of all the filters as an object.
let ufoInfo = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let input = d3.select("head").select("input");
    // 4b. Save the value that was changed as a variable.
    inputValue = input.property("value")
    // 4c. Save the id of the filter that was changed as a variable.
    inputId = inputValue.attr("id")
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (inputValue)
      {ufoInfo[inputId]=inputValue}
    else
      delete ufoInfo[inputId]
    // 6. Call function to apply all filters and rebuild the table
    filterTable(ufoInfo);
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable(ufoInfo) {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(ufoInfo).forEach(([key, value])=>{
      filteredData=filteredData.filter(row=>[key]===value)
    });
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  // Build the table when the page loads
  buildTable(tableData);
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("#filter-btn").on("click", updateFilters);

