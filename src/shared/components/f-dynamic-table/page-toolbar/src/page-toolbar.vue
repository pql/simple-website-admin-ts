<template>
  <div class="group-container">
    <!-- 左侧按钮组 -->
    <div
      ref="left"
      v-show="leftList.length > 0"
      class="group"
      @mousewheel.prevent="handleLeftScroll"
    >
      <a-space>
        <div v-for="(item, index) in leftList" :key="index">
          <!-- 类型是否为导入 -->
          <template v-if="item.eventName === 'Import'">
            <!-- 导入Excel -->
            <f-excel-import
              v-if="!!showButton && showButton(item.eventName)"
              :ref="item.eventName"
              :text="l(item?.title ?? '')"
              :icon="item.icon"
              :disabled="item['disabled'] ? item['disabled'] : false"
              :config="item"
              type="default"
              @file-uploaded-success-event="handleClick(item.eventName, $event, item)"
            />
          </template>
          <template v-else>
            <page-toolbar-button
              v-if="!!showButton && showButton(item.eventName as string)"
              :config="item"
              @click="handleClick(item.eventName)"
            />
          </template>
        </div>
      </a-space>
    </div>
    <!-- 右侧按钮租 -->
    <div
      ref="right"
      v-show="rightList.length > 0"
      class="group right-group"
      @mousewheel.prevent="handleRightScroll"
    >
      <a-space>
        <div v-for="(item, index) in rightList" :key="index">
          <!-- 类型是否为导入 -->
          <template v-if="item.eventName === 'Import'">
            <!-- 导入Excel -->
            <f-excel-import
              v-if="!!showButton && showButton(item.eventName)"
              :ref="item.eventName"
              :text="l(item?.title ?? '')"
              :icon="item.icon"
              :config="item"
              type="default"
              @file-uploaded-success-event="handleClick(item.eventName, $event)"
            />
          </template>
          <template v-else>
            <page-toolbar-button
              v-if="!!showButton && showButton(item.eventName as string)"
              :config="item"
              @click="handleClick(item.eventName)"
            />
          </template>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageToolbar from './page-toolbar';

  export default defineComponent({
    name: 'PageToolbar',
    mixins: [PageToolbar],
  });
</script>

<style lang="less" scoped>
  @import './page-toolbar.less';
</style>
