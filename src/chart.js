import * as echarts from "echarts";


const setEcharts = function (source, divid) {
  var chartDom = document.getElementById(divid);
  var myChart = echarts.init(chartDom
    //   , null
    //   , {
    //   width: 600,
    //   height: 400,
    // }
  );
  window.onresize = function () {
    myChart.resize();
  }

  var option;
  var dataset = {
    // 提供一份数据。
    source: source
  };
  option = {
    visualMap: [
      {
        //   type: 'piecewise',//分段，缺省连续
        // min: 0,
        // max: 200,
        dimension: 2,
        inRange: {
          color: ["#37a2da", "#32e5d9", "#9fe6bb", "#ffdb5c"]
        }
      }
    ],
    //legend: {},
    // colors: colors,
    //柱图上标签
    tooltip: {
      // formatter: '{c}',
    },
    toolbox: {
      show: true,
      feature: {
        dataView: {
          show: true,
          title: "数据",
          readOnly: false,


        },

        dataZoom: {
          show: true,

        },
        restore: {//还原原始图表
          show: true
        },
        saveAsImage: {
          show: true,
          type: 'png',
          name: '下载',
          title: '保存为图片',
        },
      },
    },

    title: {
      text: '甘特图'
    },

    dataset: dataset,
    yAxis: {
      name: '项目',
      type: 'category',

    },
    xAxis: {

      name: '时间'
    },
    series: [
      {
        itemStyle: {
          opacity: 0
        },
        type: 'bar',
        stack: "x",
      },
      {
        // label: labelOption, //柱图内标签
        type: 'bar',
        stack: "x"
      }
    ]
  };
  myChart.setOption(option);
}

export { setEcharts };
