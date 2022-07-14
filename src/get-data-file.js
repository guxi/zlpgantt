


const getXlsxFile = (filepath) => {
  const nodeXlsx = require("node-xlsx");
  try {
    let data = nodeXlsx.parse(filepath);
    //xlsx文件第一个表格的数据在data内，为一个数组
    //{"name":"Sheet1","data":[["项目","开始时间","持续时间"],["a",45.8,33],["f",45,33.8]]}
    let returnData = {};
    let dd = [];
    data[0].data.forEach((e, index) => {
      if (index == 0) returnData.title = e;
      else {
        dd.push(e);
      }
    });
    returnData.data = dd;

    let JSONData = JSON.stringify(returnData);

    return JSONData;
  } catch (err) {
    console.log("getExcellFile error:" + err)
  };
}

const getJsonFile = (filepath) => {
  try {
    const fs = require("fs");
    let data = fs.readFileSync(filepath, "utf-8");
    return data;
  } catch (err) {
    console.log("getJsonFile error:" + err)
  };

}
export { getXlsxFile, getJsonFile }