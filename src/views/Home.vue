<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <Header></Header>
      <el-main>Main</el-main>
      <el-footer>
        <el-row type="flex" justify="center" :gutter="20">
          <a title="OGMS" target="_blank" href="http://geomodeling.njnu.edu.cn">OGMS</a>
          <a title="github" target="_blank" href="https://github.com/SunsetFrost/model-parallel-frontend"><i class="el-icon-star-on"></i></a>
          <a title="team" target="_blank" href="http://geomodeling.njnu.edu.cn">Team</a>
        </el-row>
        <el-row type="flex" justify="center">
          <span>Copyright</span>
          <i class="el-icon-location-outline"></i>
          <span>Nanjng Normal University</span>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '../components/Aside/Aside.vue';
import Header from '../components/Header/Header.vue';

export default {
  name: 'home',

  components: {
    Aside,
    Header,
  },
};
</script>

<style lang="less" scoped>
  .el-container {
    box-sizing: border-box;
    background-color: #f0f2f5;
    height: 100vh;
    .el-footer {
      color: rgba(0,0,0,.45);
      transition: all .3s;
      font-size: 14px;
      .el-row {
        margin-bottom: 8px;
        a {
          color: inherit;
          margin-right: 32px;
          text-decoration: none;
          outline: 0;
          background-color: transparent;
          cursor: pointer;
        }
        span {
          margin: 0px 8px;
        }
        i {
          line-height: 1.5;
        }
      }
    }
  }
</style>
