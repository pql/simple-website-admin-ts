<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <safety-certificate-outlined />
      <span class="ml-2">
        {{ l('AbpPermissionManagement.texts.Permissions') }}
        <span v-if="pageDataList!.length > 0"
          >- {{ providerName == 'R' ? pageDataList!.join(',').toString() : titleUserName }}</span
        >
      </span>
    </div>
    <slot></slot>
    <div class="modal-body p-2">
      <div class="flex max-h-96 overflow-auto">
        <div class="basis-52">
          <a-checkbox
            v-model:checked="parentCheckbox"
            :indeterminate="parentCheckboxIndeterminate"
            @change="handleParentCheckboxChange"
          >
            {{ l('AbpPermissionManagement.texts.SelectAllInAllTabs') }}
          </a-checkbox>
          <a-divider class="my-2" />
          <a-menu
            v-model:selectedKeys="menuSelectedKeys"
            :items="menuData"
            @select="handleMenuItemSelect"
          />
        </div>
        <div class="flex-1 ml-8">
          <a-checkbox
            v-model:checked="childCheckbox"
            :indeterminate="childCheckboxIndeterminate"
            @change="handleChildCheckboxChange"
          >
            {{ l('AbpPermissionManagement.texts.SelectAllInThisTab') }}
          </a-checkbox>
          <a-divider class="my-2" />
          <a-tree
            :tree-data="treeData"
            checkable
            v-model:checkedKeys="treeCheckedKeys"
            v-model:selectedKeys="treeSelectedKeys"
            @check="handleTreeCheck"
          />
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="saving"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="saving" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Permissions from './permissions';

  export default defineComponent({
    name: 'RolesPermissions',
    mixins: [Permissions],
  });
</script>

<style lang="less" scoped>
  @import './permissions.less';
</style>
