<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 图表</el-breadcrumb-item>
                <el-breadcrumb-item>基础图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            vschart：vue.js封装sChart.js的图表组件。 npmjs地址：
            <a href="https://www.npmjs.com/package/vschart" target="_blank">vschart</a>
        </div>
        <div class="schart">
            <div class="content-title">柱状图</div>
            <schart canvasId="bar1" width="500" height="400" :data="data1" type="bar" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">折线图</div>
            <schart canvasId="line" width="500" height="400" :data="data1" type="line" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">饼状图</div>
            <schart canvasId="pie" width="500" height="400" :data="data1" type="pie" :options="options1"></schart>
        </div>
        <div class="schart">
            <div class="content-title">环形图</div>
            <schart canvasId="ring" width="500" height="400" :data="data2" :type="type" :options="options2"></schart>
        </div>
     
    </div>
</template>

<script>
import Schart from "vschart";
export default {
  components: {
    Schart
  },
  data: () => ({
    type: "ring",
    data1: [
      { name: "2012", value: 1141 },
      { name: "2013", value: 1499 },
      { name: "2014", value: 2260 },
      { name: "2015", value: 1170 },
      { name: "2016", value: 970 }
    ],
    data2: [
      { name: "短袖", value: 1200 },
      { name: "休闲裤", value: 1222 },
      { name: "连衣裙", value: 1283 },
      { name: "外套", value: 1314 },
      { name: "羽绒服", value: 2314 }
    ],
    options1: {
      title: "某商店近年营业总额",
      bgColor: "#009688",
      titleColor: "#ffffff",
      fillColor: "#e0f2f1", //柱子，折线的颜色
      axisColor: "#ffffff", //坐标轴及字体颜色
      contentColor: "#999" //网格线颜色
    },
    options2: {
      title: "某商店各商品年度销量",
      bgColor: "#009688",
      titleColor: "#ffffff",
      legendColor: "#ffffff" //图例字体颜色
    }
  }),
};
</script>

<style scoped>
.schart {
  width: 600px;
  display: inline-block;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>