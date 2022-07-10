

const setdataTable = function (data, divid) {
  let dragdiv = document.getElementById("data");
  let div = document.getElementById("data_Table_div");
  let title = JSON.parse(data).title;
  let tr_data = JSON.parse(data).data;
  let table_R = document.createElement("table");
  let thead_R = document.createElement("thead");
  let tbody_R = document.createElement("tbody");
  let Div_R = document.createElement("div");

  Div_R.setAttribute("id", "data_Table_div");
  table_R.setAttribute("class", "table table-hover");

  let trh = document.createElement("tr");
  title.forEach(e => {
    let th = document.createElement("th");
    th.innerHTML = e;
    trh.appendChild(th);
  })
  thead_R.appendChild(trh);

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
  table_R.appendChild(thead_R);
  table_R.appendChild(tbody_R);
  Div_R.append(table_R);
  dragdiv.replaceChild(Div_R, div);

}


export { setdataTable };



// const setdataTable = function (data, divid) {

//   var div = document.getElementById("data_Table_div");
//   let data_Table = document.getElementById("data_Table");








//   let thead = document.getElementById("data_thead");
//   let tbody = document.getElementById("data_tbody");

//   let title = JSON.parse(data).title;
//   let tr_data = JSON.parse(data).data;

//   let table_R = document.createElement("table");
//   let thead_R = document.createElement("thead");
//   let tbody_R = document.createElement("tbody");
//   let trh = document.createElement("tr");

//   table_R.setAttribute("class", "table table-striped");
//   table_R.setAttribute("id", "data_Table");

//   title.forEach(e => {
//     let th = document.createElement("th");
//     th.innerHTML = e;
//     trh.appendChild(th);
//   })
//   thead_R.appendChild(trh);
//   data_Table.replaceChild(thead_R, thead);


//   tr_data.forEach(e => {
//     let trd = document.createElement("tr");
//     e.forEach(ee => {
//       let td
//       if (typeof ee == "string") { td = document.createElement("th"); }
//       else td = document.createElement("td");

//       td.innerHTML = ee;
//       trd.appendChild(td);
//     })
//     tbody_R.appendChild(trd)
//   })

//   //table_R.replaceChild(tbody_R, tbody);

//   //data_Table_div.replaceChild(data_Table, table_R);


// }

// export { setdataTable };