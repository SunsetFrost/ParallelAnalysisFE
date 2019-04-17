<template>
  <el-aside width="260px" class="aside">
    <el-row type="flex" justify="start" class="title">
      <el-col :span="4">
        <img src="../../images/logo.png" alt="logo" height="28px">
      </el-col>
      <el-col :span="16"><span>Parallel Model</span></el-col>
    </el-row>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#424242"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span>DashBoard</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span slot="title">Cluster</span>
        </template>
          <el-menu-item index="2-1">Net</el-menu-item>
          <el-menu-item index="2-2">Data</el-menu-item>
          <el-menu-item index="2-2">Calc</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-printer"></i>
          <span slot="title">Parallel</span>
        </template>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-upload"></i>
          <span slot="title">Data</span>
        </template>
      </el-submenu>
      <el-menu-item index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">Analysis</span>
        </template>
      </el-menu-item>
    </el-menu>
    <div class="bg"></div>
  </el-aside>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
  .aside {
    background-color: #424242;
    z-index: 10;
    position: relative;
    min-height: 100vh;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
      .title {
        padding: 16px 24px;
        position: relative;
        overflow: hidden;
        background-color: #424242;
        opacity: .8;
        z-index: 5;
        span {
          color: #fff;
          font-weight: 600;
          font-size: 18px;
          font-family: "Roboto", "Helvetica", "Arial", sans-serif;
          margin-left: 5px;
          height: 32px;
          line-height: 32px;
        }
      }
      .el-menu {
        position: relative;
        z-index: 5;
        opacity: .8;
        // height: calc(100vh - 64px);
        border-right: solid 1px #424242;
        padding-top:16px;
        height: calc(100% - 80px);
      }
      .bg {
        top: 0;
        left: 0;
        width: 260px;
        height: 100%;
        z-index: 1;
        display: block;
        position: absolute;
        background-image: url('../../images/sidebar.jpg');
        background-size: cover;
        background-position: center center;
        background-color: #000;
        opacity: 0.5;
      }
  }


</style>
