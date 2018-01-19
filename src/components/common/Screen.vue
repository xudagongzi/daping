<template>
  <div class="screen-wrap">
    <!-- 顶部栏 -->
    <div class="sheader">
      <div class="back-wrap" style="margin:15px;width:50px">
        <i @click="back" class="el-icon-arrow-left" style="font-size:25px;border-radius:25px;border:2px solid #1f2d3d"></i>
      </div>
      <div class="header-img">
        <el-dropdown trigger="hover" style="cursor:pointer">
          <span class="el-dropdown-link" style="font-size:18px">
            基本图表
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem('bar')">
                <img src="/static/img/bar.png" alt="">
                <div>柱状图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem('line')">
                <img src="/static/img/line.png" alt="">
                <div>折线图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem('pie')">
                <img src="/static/img/pie.png" alt="">
                <div>饼状图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem('ring')">
                <img src="/static/img/ring.png" alt="">
                <div>环状图</div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 绘图区 -->
    <div class="dialog-wrap" id="dialogWrap">
      <div class="drag" v-for="(item,index) in items" :key="item.id" :id="item.id" @click="draw(index)" :style="{width:item.w,height:item.h,left:item.x,top:item.y}" v-if="items.length!=0">
        <div class="close el-icon-delete" @click="closeModal(index)"></div>
        <div class="resizeL"></div>
        <div class="resizeT"></div>
        <div class="resizeR"></div>
        <div class="resizeB"></div>
        <div class="resizeLT"></div>
        <div class="resizeTR"></div>
        <div class="resizeBR"></div>
        <div class="resizeLB"></div>
        <div class="dialog">
          <schart :canvasId="item.canvasId" :width="item.w" :height="item.h" :data="item.data" :type="item.type" :options="item.options"></schart>
        </div>
      </div>
        <!-- 删除弹窗 -->
        <el-dialog title="提示" :visible.sync="close" width="30%" center>
          <span>删除后无法恢复！</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="close=false">取 消</el-button>
            <el-button type="primary" @click="vclose()">确 定</el-button>
          </span>
        </el-dialog>
    </div>

    <!-- 右侧编辑组件 -->
    <settings></settings>

  </div>
</template>

 
<script>
import Schart from "vschart";
import settings from "./settings";
export default {
  components: {
    Schart,
    settings
  },
  data() {
    return {
      close: false,
      items: this.$store.state.items
    };
  },
  beforeMount() {},
  mounted() {},
  update: function() {},
  methods: {
    renderChart: function() {
      var self = this;
      new sChart(self.canvasId, self.type, self.data, self.options);
    },
    // 右侧选项卡
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    //  关闭图表
    closeModal(index){
         this.close = true;
         this.activeItem=index
    },
    vclose() {
      this.close = false;
      this.$store.commit("close",this.activeItem);
    },
    // 创建图表
    createItem(string) {
      this.$store.commit("createItem", string);
    },
    // 进入时加装数据
    load() {
      // if (window.localStorage.index == 1) {
      //   this.items = JSON.parse(window.localStorage.screenData);
      // }
    },
    // 返回管理页面
    back() {
      this.$store.commit('back')
      this.$router.push("/daping");
    },

    draw(index) {
      this.$store.commit("draw", index);
    }
  }
};
</script>

<style>
@import "/static/css/drag.css";
.screen-wrap {
  width: 100%;
  height: 100%;
}
.dialog-wrap {
  width: 1200px;
  height: 700px;
  position: absolute;
  left: 200px;
  top: 120px;
  background-color: #173347;
}
.sheader {
  width: 100%;
  height: 60px;
  background: #f4f6fa;
  display: flex;
  border-bottom: solid 2px #b5bcc3;
  box-shadow: 0 0 15px grey;
}
.header-img {
  display: flex;
  width: 350px;
  align-items: center;
}
.img-wrap img {
  width: 80px;
  height: 80px;
}
.img-wrap div {
  height: 20px;
  line-height: 10px;
  font-size: 14px;
  text-align: center;
}
</style>
