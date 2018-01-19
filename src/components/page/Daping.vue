<template>
    <div class="daping">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-menu"></i>自定义</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="screen-wrap">
            <div class="screen" v-for="(list,index) in lists" :key="list.index">
                <div class="image-wrap">
                    <img :src="list.image" alt="">
                </div>
                <div class="screen-bottom-wrap">
                    <div class="screen-name">{{list}}</div>
                    <div class="fix">
                        <div @click="screen(index)">修改</div>
                        <div>预览</div>
                        <div>发布</div>
                    </div>
                </div>
            </div>
            <div class="screen screenPlus">
                <i class="el-icon-plus" @click="newScreen"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    // axios.get("/user?ID=12345",{
    //       params:{ID:12345}
    //       })
    //   .then(function(response) {
    //     console.log(response);
    //     this.lists=response.data,
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  },
  methods: {
    // 修改某一项目
    screen(index) {
      this.$store.commit("screenItem", this.lists[index]);
      this.$router.push({ path: "/screen" });
    },
    // 新建项目
    newScreen() {
      this.$router.push({ path: "/screen" });
    }
  }
};
</script>
<style>
.screen-wrap {
  display: flex;
}
.screen {
  width: 200px;
  height: 220px;
  margin: 10px;
  border: 1px solid #dcd8da;
}
.image-wrap {
  width: 100%;
  height: 150px;
  border: 1px solid #dddfdf;
}
img {
  width: 100%;
  height: 100%;
}
.screen-bottom-wrap {
  height: 70px;
}
.screen-name {
  width: 100%;
  height: 40px;
  vertical-align: middle;
}
.fix {
  display: flex;
  height: 30px;
  vertical-align: middle;
}
.screenPlus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  color: #ccc;
  cursor: pointer;
}
</style>
