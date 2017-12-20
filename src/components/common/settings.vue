<template>
    <div class="settings">
        <el-tabs v-model="activeName" @tab-click="handleClick"> -->
         <el-tab-pane label="样式" name="first">
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
          </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return {
      item: this.$store.state.items[this.$store.state.index],
      activeName: "first",
    };
  },
  methods: {
    increment() {},
      handleClick(tab, event) {
 
    },
  }
};
</script>
<style>
.settings {
  position: absolute;
  right: 0;
  top: 62px;
  width: 250px;
  height: 100%;
  border: 1px solid #ccc;
  background: #fbfdffdb;
  box-shadow: 0 0 5px #ccc;
}
</style>