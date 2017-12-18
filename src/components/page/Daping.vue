<template>
  <div class="daping">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>自定义</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="screen-wrap">
           <div class="screen" v-for="(list,index) in lists" :key="list.index">
              
              <div class="image-wrap">
                  <img src="" alt="">
              </div>
              <div class="screen-bottom-wrap">
                  <div class="screen-name">{{list}}</div>
                  <div class="fix">
                       <div @click="screen()">修改</div>
                       <div>预览</div>
                       <div>发布</div>
                  </div>
              </div>
           </div>
        </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
               lists:[1,2,3]
            }
        },
        methods:{
            screen(){
                  this.$router.push('/screen');
            }
        }
    }
</script>
<style>
.screen-wrap{
    display: flex;
}
.screen{
   width: 200px;
   height:220px;
   margin: 10px;
   border: 1px solid #dcd8da;

}
.image-wrap{
    width: 100%;
    height: 150px;
    border: 1px solid #dddfdf;
}
img{
   width: 100%;
   height: 100%; 
   
}
.screen-bottom-wrap{
     height:70px;
}
.screen-name{
   width: 100%;
   height:40px;
   vertical-align: middle;
}
.fix{
    display: flex;
    height:30px;
    vertical-align: middle;
}
</style>
