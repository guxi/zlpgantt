
const setdataTable = function (data, divid) {

  var tableDom = document.getElementById(divid);

  console.log(tableDom);

  let dataStr = "<table class='table'>";

  tableDom.replaceWith(dataStr);

}

export { setdataTable };