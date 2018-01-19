<template>
    <div class="settings">

        <div v-show="pageConfig" class="settingWrap">
            <div class="block" style="font-size: 20px;font-weight: bold;">页面设置</div>
            <div class="block">
                <span>区域大小</span>
                <div>
                    <div class="block">
                        <span>宽度</span>
                        <el-input-number v-model="num1" controls-position="right" @change="handleChange" :min="500" :max="1600"></el-input-number>
                    </div>
                    <div class="block">
                        <span>高度</span>
                        <el-input-number v-model="num2" controls-position="right" @change="handleChange" :min="500" :max="1600"></el-input-number>
                    </div>
                </div>

            </div>
            <div class="block">
                <span>背景图</span>
                <div>
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
                    </el-upload>
                </div>

            </div>
            <div class="block">
                <span>背景图</span>
                <div>
                    <el-button type="primary" @click="screenCapture">截取屏幕</el-button>
                    <img :src="image" alt="" style="width:240px;height:150px;margin-top:8px">
                </div>

            </div>
        </div>
        <!-- 激活图形时 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="init">
            <el-tab-pane label="样式" name="first">
                <div class="settingWrap">

                    <div class="block">
                        <span class="demonstration" style="margin-bottom:5px">输入标题</span>
                        <el-input style="width:60%" v-model="item.options.title" placeholder="请输入名称"></el-input>
                    </div>

                    <div class="block">
                        <span class="demonstration">标题颜色</span>
                        <el-color-picker v-model="item.options.titleColor"></el-color-picker>
                    </div>
                    <div class="block">
                        <span class="demonstration">背景颜色</span>
                        <el-color-picker v-model="item.options.bgColor"></el-color-picker>
                    </div>
                    <div class="block" v-if="item.type=='bar'">
                        <span class="demonstration">柱体颜色</span>
                        <el-color-picker v-model="item.options.fillColor"></el-color-picker>
                    </div>

                    <div class="block" v-if="item.type=='line'">
                        <span class="demonstration">折线颜色</span>
                        <el-color-picker v-model="item.options.axisColor"></el-color-picker>
                    </div>
                    <div class="block" v-if="item.type=='bar'|item.type=='line'">
                        <span class="demonstration">坐标轴字体颜色</span>
                        <el-color-picker v-model="item.options.axisColor"></el-color-picker>
                    </div>

                    <div class="block" v-if="item.type=='bar'|item.type=='line'">
                        <span class="demonstration">网格线颜色</span>
                        <el-color-picker v-model="item.options.contentColor"></el-color-picker>
                    </div>

                    <div class="block" v-if="item.type=='ring'|item.type=='pie'">
                        <span class="demonstration">图例字体颜色</span>
                        <el-color-picker v-model="item.options.legendColor"></el-color-picker>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据" name="second">内容2</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      item: this.$store.state.items[this.$store.state.index],
      activeName: "first",
      init: false,
      pageConfig: true,
      num1: 1200,
      num2: 700,
      image: this.$store.state.image
    };
  },
  mounted: function() {
    this.screenCapture();
  },
  methods: {
    increment() {},
    handleClick(tab, event) {},
    handleChange() {},
    screenCapture() {
          html2canvas(document.querySelector("#dialogWrap")).then(canvas => {
                this.image = canvas.toDataURL();
            });
       this.$store.commit("screenCapture",this.image);
    }
  },
  computed: {
    getItem() {
      return this.$store.state.items[this.$store.state.index];
    }
  },
  watch: {
    getItem(val) {
      this.item = val;
      if (this.item !== undefined) {
        this.init = true;
        this.pageConfig = false;
        // console.log(this.init);
      } else {
        this.init = false;
        this.pageConfig = true;
      }
    }
  }
};
</script>
<style>
.settings {
  position: absolute;
  right: 0;
  top: 62px;
  width: 400px;
  height: 100%;
  border: 1px solid #ccc;
  background: #fbfdffdb;
  box-shadow: 0 0 5px #ccc;
  /* padding: 15px; */
  font-size: 18px;
}
.block {
  padding: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted #ccc;
}
.block > span {
  display: inline-block;
  margin-right: 20px;
  width: 30%;
}
.settingWrap {
  width: 90%;
  margin: 15px auto;
}
.el-upload-dragger,
.el-upload--text {
  width: 250px;
}
.el-color-picker__trigger {
  width: 120px;
}
</style>