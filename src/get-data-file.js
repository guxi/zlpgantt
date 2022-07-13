
const fs = require("fs");

const getXlsxFile = (filepath) => {
  const nodeXlsx = require("node-xlsx");
  try {
    let data = nodeXlsx.parse(filepath);

    // console.log("data[0]:" + JSON.stringify(data[0]));

    //xlsx文件第一个表格的数据在data内，为一个数组
    //{"name":"Sheet1","data":[["项目","开始时间","持续时间"],["a",45.8,33],["f",45,33.8]]}
    data = data[0].data;

    console.log("data[0].data:" + data);
    //data = JSON.parse(data[1]);
    console.log("typeof data:" + typeof (data));

    let returnData = {};

    let yy = [];
    //let title=data[0]
    for (let i = 0; i < data.length; i++) {
      if (i == 0)
        returnData.title = "" + data[i];
      else {
        yy.push(data[i]);
      }
    }
    returnData["data"] = yy;

    //returnData = eval(returnData);
    //returnData = JSON.stringify(returnData);
    returnData = JSON.parse(returnData);
    console.log("returnData:" + returnData)

    return returnData;
  } catch (err) {
    console.log("getJsonFile error:" + err)
  };
}

const getJsonFile = (filepath) => {

  try {
    let data = fs.readFileSync(filepath, "utf-8");
    // console.log("data:" + data)
    return data;
  } catch (err) {
    console.log("getJsonFile error:" + err)
  };

}

export { getXlsxFile, getJsonFile }