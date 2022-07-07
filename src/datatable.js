
const setdataTable = function (data, divid) {

  var div = document.getElementById("data_Table_div");
  let data_Table = document.getElementById("data_Table");

  let thead = document.getElementById("data_thead");
  let tbody = document.getElementById("data_tbody");

  let title = JSON.parse(data).title;
  let tr_data = JSON.parse(data).data;

  let thead_R = document.createElement("thead");
  let tbody_R = document.createElement("tbody");
  let trh = document.createElement("tr");
  title.forEach(e => {
    let th = document.createElement("th");
    th.innerHTML = e;
    trh.appendChild(th);
  })
  thead_R.appendChild(trh);
  data_Table.replaceChild(thead_R, thead);


  tr_data.forEach(e => {
    let trd = document.createElement("tr");
    e.forEach(ee => {
      let td
      if (typeof ee == "string") { td = document.createElement("th"); }
      else td = document.createElement("td");

      td.innerHTML = ee;
      trd.appendChild(td);
    })
    tbody_R.appendChild(trd)
  })
  data_Table.replaceChild(tbody_R, tbody);


}

export { setdataTable };