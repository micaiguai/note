<template>
  <div class="app-container">
    <a-menu 
      v-model:selectedKeys="current" 
      mode="horizontal" 
      :items="items" 
      @click="onMenuItemClick"
    />
    <div class="app-main">
      <div id="vue"></div>
      <div id="vue2"></div>
    </div>
  </div>
</template>

<script setup>
import { h, inject, ref } from 'vue';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router'

const current = ref(['mail']);
const router = useRouter()

const items = ref([
  {
    key: 'vue',
    icon: () => h(MailOutlined),
    label: 'vue',
    title: 'vue',
  },
  {
    key: 'vue2',
    icon: () => h(AppstoreOutlined),
    label: 'vue2',
    title: 'vue2',
  }
]);

/**
 * 当菜单被点击时
 * @param {any} menuItemInfo 菜单信息
 */
function onMenuItemClick({ item, key, keyPath }) {
  router.push(`/${key}`)
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.app-main {
  flex: 1;
}
</style>
