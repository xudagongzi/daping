<template>
  <div class="screen-wrap">
    <div class="sheader">
      <div class="back-wrap" style="margin:15px;width:50px">
        <i @click="back" class="el-icon-arrow-left" style="font-size:25px;border-radius:25px;border:2px solid #1f2d3d"></i>
      </div>
      <div class="header-img">
        <el-dropdown>
          <span class="el-dropdown-link">
            基本图表
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem($event,'bar')">
                <img src="/static/img/bar.png" alt="">
                <div>柱状图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem($event,'line')">
                <img src="/static/img/line.png" alt="">
                <div>折线图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="img-wrap" @click="createItem($event,'pie')">
                <img src="/static/img/pie.png" alt="">
                <div>饼状图</div>
              </div>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <div class="img-wrap" @click="createItem($event,'ring')">
                <img src="/static/img/ring.png" alt="">
                <div>环状图</div>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

      <div class="dialog-wrap" id="dialogWrap">
        <div class="drag" v-for="(item,index) in items" :key="item.id" :id="item.id" @click="draw(index)" :style="{width:item.w,height:item.h,left:item.x,top:item.y}" v-if="items.length!=0">
          <div class="close el-icon-delete" @click="close"></div>
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
      </div>
    <settings></settings>
    <!-- <div class="settings"> -->
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
            <!-- <el-tab-pane label="样式" name="first">
              <div class="styleWrap">
                <div class="block">
                  <span class="demonstration">输入标题</span>
                  <el-input v-model="item.options.title" placeholder="请输入名称"></el-input>
                  {{item.options.title}}
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
          </el-tabs> -->
    <!-- </div> -->
  </div>
</template>
 
<script>
import Schart from "vschart";
import settings from './settings'
export default {
  components: {
    Schart,
    settings
  },
  data() {
    
    return {
      items:this.$store.state.items,
      activeSetting: "0",
      activeName: "first",
    };
  },
  beforeMount() {},
  mounted() {
    this.load();
  },
  beforeUpdate: function() {},
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
    close(index) {
      this.items.splice(index, 1);
    },
    // 创建图表
   createItem(e, string){
     this.$store.commit('createItem(e, string)')
   },
    // 进入时加装数据
    load() {
      if (window.localStorage.index == 1) {
        this.items = JSON.parse(window.localStorage.screenData);
      }
    },
    // 返回管理页面
    back() {
      window.localStorage.screenData = JSON.stringify(this.items);
      this.$router.push("/daping");
    },

    draw(index) {
      this.$store.state.index=index;
      var self = this;
      console.log(this.items);
      self.activeSetting = index;
      /*-------------------------- +
         获取id, class, tagName
         +-------------------------- */

      var get = {
        byClass: function(sClass, oParent) {
          var aClass = [];
          var reClass = new RegExp("(^| )" + sClass + "( |$)");
          var aElem = this.byTagName("*", oParent);
          for (var i = 0; i < aElem.length; i++)
            reClass.test(aElem[i].className) && aClass.push(aElem[i]);
          return aClass;
        },
        byTagName: function(elem, obj) {
          return (obj || document).getElementsByTagName(elem);
        }
      };
      var dragMinWidth = 200;     //最小尺寸
      var dragMinHeight = 200;

      /*-------------------------- +
         改变大小函数
         +-------------------------- */
      function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
        handle.onmousedown = function(event) {
          var event = event || window.event;
          var disX = event.clientX - handle.offsetLeft;
          var disY = event.clientY - handle.offsetTop;
          var iParentTop = oParent.offsetTop;
          var iParentLeft = oParent.offsetLeft;
          var iParentWidth = oParent.offsetWidth;
          var iParentHeight = oParent.offsetHeight;
          document.onmousemove = function(event) {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            var maxW =
              document.documentElement.clientWidth - oParent.offsetLeft - 2;
            var maxH =
              document.documentElement.clientHeight - oParent.offsetTop - 2;
            var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
            var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
            isLeft && (oParent.style.left = iParentLeft + iL + "px");
            isTop && (oParent.style.top = iParentTop + iT + "px");
            iW < dragMinWidth && (iW = dragMinWidth);
            iW > maxW && (iW = maxW);
            lockX || (oParent.style.width = iW + "px");
            iH < dragMinHeight && (iH = dragMinHeight);
            iH > maxH && (iH = maxH);
            lockY || (oParent.style.height = iH + "px");
            if (
              (isLeft && iW == dragMinWidth) ||
              (isTop && iH == dragMinHeight)
            )
              document.onmousemove = null;

            return false;
          };
          //拉伸后的宽高存入items
          document.onmouseup = function() {
            self.items[oParent.id].w = oParent.style.width;
            self.items[oParent.id].h = oParent.style.height;
            document.onmousemove = null;
            document.onmouseup = null;
          };

          return false;
        };
      }
      
       /*-------------------------- +
         拖拽函数
         +-------------------------- */
      function drag(oDrag, handle) {
        var disX = 0;
        var disY = 0;
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function(event) {
          var event = event || window.event;
          disX = event.clientX - oDrag.offsetLeft;
          disY = event.clientY - oDrag.offsetTop;
          document.onmousemove = function(event) {
            var event = event || window.event;
            var iL = event.clientX - disX;
            var iT = event.clientY - disY;
            var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
            var maxT =
              document.documentElement.clientHeight - oDrag.offsetHeight;
            iL <= 0 && (iL = 0);
            iT <= 0 && (iT = 0);
            iL >= maxL && (iL = maxL);
            iT >= maxT && (iT = maxT);
            oDrag.style.left = iL + "px"; //相对于父元素左侧的距离
            oDrag.style.top = iT + "px";

            return false;
          };
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
            this.releaseCapture && this.releaseCapture();
            self.items[oDrag.id].x = oDrag.style.left; // 坐标存入item
            self.items[oDrag.id].y = oDrag.style.top;
          };
          this.setCapture && this.setCapture();
          return false;
        };
      }

      //  点击激活某个图形，调用拖拽函数drag和改变大小函数resize
      $("#dialogWrap>div").click(function() {
        $(this).addClass("active");
        $(this)
          .siblings()
          .removeClass("active");
        var oDrag = $(this)[0]; //获取document对象
        var oTitle = get.byClass("title", oDrag)[0];
        var oDialog = get.byClass("dialog", oDrag)[0];
        var oL = get.byClass("resizeL", oDrag)[0];
        var oT = get.byClass("resizeT", oDrag)[0];
        var oR = get.byClass("resizeR", oDrag)[0];
        var oB = get.byClass("resizeB", oDrag)[0];
        var oLT = get.byClass("resizeLT", oDrag)[0];
        var oTR = get.byClass("resizeTR", oDrag)[0];
        var oBR = get.byClass("resizeBR", oDrag)[0];
        var oLB = get.byClass("resizeLB", oDrag)[0];
        drag(oDrag, oDialog); //可以拖拽
        //四角
        resize(oDrag, oLT, true, true, false, false);
        resize(oDrag, oTR, false, true, false, false);
        resize(oDrag, oBR, false, false, false, false);
        resize(oDrag, oLB, true, false, false, false);
        //四边
        resize(oDrag, oL, true, false, false, true);
        resize(oDrag, oT, false, true, true, false);
        resize(oDrag, oR, false, false, false, true);
        resize(oDrag, oB, false, false, true, false);
      });

     
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
  width: 1000px;
  height: 600px;
  position: absolute;
  left: 200px;
  top: 100px;
  background-color: #173347;
}
/* .settings {
      position: absolute;
    right: 0;
    top: 62px;
    width: 250px;
    height: 100%;
    border: 1px solid #ccc;
    background: #fbfdffdb;
} */
.styleWrap {
  padding: 5px;
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
  width: 70px;
  height: 70px;
}
.img-wrap div {
  height: 14px;
  line-height: 14px;
  font-size: 12px;
  text-align: center;
}
</style>
