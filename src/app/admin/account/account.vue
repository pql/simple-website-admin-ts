<template>
  <Card title="" class="card-div">
    <a-row>
      <a-col :span="6">
        <a-menu
          style="width: 100%"
          mode="inline"
          v-model:selectedKeys="selectedKeys"
          :items="LeftMenu"
          @select="selectChange"
        />
      </a-col>
      <a-col :span="16" :offset="2">
        <template v-for="(item, index) in LeftMenu" :key="index">
          <div v-if="item.key == itemKey">
            <h2 class="h1-title">{{ item.label }}</h2>
            <a-divider type="horizontal" />
            <component :ref="item.key" :is="itemKey" />
          </div>
        </template>
      </a-col>
    </a-row>
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import accountMixin from './account';

  export default defineComponent({
    name: 'Account',
    mixins: [accountMixin],
  });
</script>
<style scoped lang="less">
  @import './account.less';
</style>
