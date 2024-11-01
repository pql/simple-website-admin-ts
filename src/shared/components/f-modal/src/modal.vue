<template>
  <a-modal
    v-model:open="isShowForm"
    :width="typeof width === 'string' ? width : `${width}px`"
    destroyOnClose
    :wrap-class-name="isNeedFullClass"
    :maskClosable="false"
  >
    <template #title>
      <span>{{ title }}</span>
    </template>
    <template #closeIcon>
      <modal-close
        :canFullscreen="true"
        :fullScreen="fullScreen"
        @cancel="close"
        @fullscreen="handleFullScreen"
      />
    </template>
    <a-spin :spinning="loading">
      <a-pagination
        class="f-modal-pagination"
        v-if="pageDataList.length > 1"
        size="small"
        v-model:current="current"
        :page-size="1"
        :total="pageDataList.length"
        @change="(page, pageSize) => handlePageChange(page, pageSize)"
      />
      <slot></slot>
    </a-spin>
    <template #footer>
      <a-space>
        <slot name="leftBtn"></slot>
        <div v-if="isShowFooter">
          <a-button key="back" @click="close">{{ l('Modal.Cancel') }}</a-button>
          <a-button key="submit" type="primary" @click="handleSaveAndClose">{{
            l('Modal.Save')
          }}</a-button>
          <a-button key="submit" type="primary" @click="handleSave">{{
            l('Modal.SaveNotExit')
          }}</a-button>
        </div>
        <slot name="rightBtn"></slot>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Modal from './modal';

  export default defineComponent({
    name: 'FModal',
    mixins: [Modal],
  });
</script>

<style lang="less" scoped>
  @import './modal.less';
</style>
