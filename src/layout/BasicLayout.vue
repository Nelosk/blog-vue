<template>
  <div id="basicLayout">
      <div>
        <el-container>
          <el-header class="header">
            <GlobalHeader/>
          </el-header>
          <el-main>Main</el-main>
          <el-footer class="footer">
            myblog  
          </el-footer>
        </el-container>
      </div>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';

</script>
<style scoped>
#basicLayout .header{
  background-color: #fafbff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 16px;
  padding-inline: 20px;
}
#basicLayout .footer{
  background: green;
  position: absolute;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
</style>
