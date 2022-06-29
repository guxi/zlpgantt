import './index.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//////// file_drog ////////
const dragWrapper = document.getElementById("drag_test");
dragWrapper.addEventListener("drop", (e) => {
  console.log("begain drop!");
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const path = files[0].path;
    console.log(path);
    window.electronAPI.setDrogFile(path);
    console.log("end drop!");
  }
})
dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
}
)

////////// end file drog ////////////

//////////// begain echarts ///////////
var source1
  = [
    ['项目', '开始时间', '持续时间'],
    ['a', 43.3, 5.8,],
    ['b', 83.1, 43.4],
    ['C', 86.4, 65.2],
    ['d', 72.4, 178.9]
  ];

window.electronAPI.handleGetData(
  (_event, value) => {

    let data = JSON.parse(value).data;
    let title = JSON.parse(value).title;

    let source = [];
    let tt = []

    title.forEach(e => {
      tt.push(e);
    })
    source.push(tt);
    console.log(source);

    data.forEach(e => {
      let dd = [];
      for (var i = 0; i < 3; i++) {
        if (i > 0)
          e[i] = +(e[i]) //字符串转浮点     
        dd.push(e[i]);
      }
      source.push(dd);
    })
    ff(source);
  }
);

const ff = (s) => {
  const charts = require('./chart.js')
  charts.setEcharts(s, 'echarts');
}

//ff(source1);
//////////// end echarts ///////////




