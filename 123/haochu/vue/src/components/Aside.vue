<template>
  <div>


    <el-menu
      style="width: 200px; min-height: calc(100vh - 50px);"
      :default-active="path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#30333c" text-color="#fff"
    >
      <el-menu-item index="/dashboard" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icondashboard "></use>
        </svg>
        <span>展示板</span>
      </el-menu-item>
      <el-sub-menu index="2" text-color="#fff">
        <template #title>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mingpian "></use>
          </svg>
          <span>个人信息</span>
        </template>
        <el-menu-item index="/person" style="font-color: white">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-bianji1 "></use>
          </svg>
          <span>修改个人信息</span>
        </el-menu-item>
        <el-menu-item index="/password">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mima "></use>
          </svg>
          <span>修改密码</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/user" v-if="user.role == 1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconreader "></use>
        </svg>
        <span>客户管理</span>
      </el-menu-item>
      <el-menu-item index="/car" v-if="user.role == 1" >
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbook "></use>
        </svg>
        <span>车辆管理</span>
      </el-menu-item>
      <el-menu-item index="/car" v-if="user.role == 2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconbook "></use>
        </svg>
        <span>车辆查询</span>
      </el-menu-item>
      <el-menu-item index="/lendrecord" v-if="user.role == 1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconlend-record "></use>
        </svg>
        <span>租凭管理</span>
      </el-menu-item>
      <el-menu-item index="/lendrecord" v-if="user.role == 2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconlend-record"></use>
        </svg>
        <span>租凭信息</span>
      </el-menu-item>
      <el-menu-item index="/carwithuser" >
        <el-icon><grid /></el-icon>
        <span>租凭状态</span>
      </el-menu-item>
      <el-menu-item index="/car-lot" v-if="user.role == 1">
        <el-icon><grid /></el-icon>
        <span>租车点管理</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>



export default {
  name: "Aside",
  components:{},
  created(){
    let userStr = sessionStorage.getItem("user") ||"{}"
    this.user = JSON.parse(userStr)
  },
  data(){
    return {
      user:{},
      path: this.$route.path
    }
  }
}
</script>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  padding-top: 5px;
  padding-right: 10px;
}
</style>
