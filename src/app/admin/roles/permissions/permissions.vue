<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <span class="ml-2">
        {{ l('AbpPermissionManagement.texts.Permissions') }}
        <span v-if="pageDataList!.length > 0"
          >- {{ providerName == 'R' ? pageDataList!.join(',').toString() : titleUserName }}</span
        >
      </span>
    </div>
    <slot></slot>
    <div class="modal-body">
      <f-resize-layout class="resize-container">
        <template #leftSider>
          <div class="checkbox-container pl-1" style="height: 30px; line-height: 35px">
            <a-checkbox
              v-model:checked="selectAllTab"
              :disabled="disabledSelectAllInAllTabs"
              :indeterminate="selectAllTabIndeterminate"
              @change="onClickSelectAll"
            >
              {{ l('AbpPermissionManagement.texts.SelectAllInAllTabs') }}
            </a-checkbox>
          </div>
          <a-divider class="my-1.5" />
          <div class="overflow-auto" style="height: calc(100% - 45px)">
            <a-menu
              v-model:selectedKeys="menuSelectedKeys"
              :items="menuData"
              @click="onChangeGroup"
              @select="({ item }) => setDisabled(item.dto.permissions)"
            />
          </div>
        </template>
        <template #content>
          <div class="checkbox-container pl-1" style="height: 30px; line-height: 35px">
            <a-checkbox
              :disabled="disableSelectAllTab"
              v-model:checked="selectThisTab"
              :indeterminate="selectThisTabIndeterminate"
              @change="onClickSelectThisTab"
            >
              {{ l('AbpPermissionManagement.texts.SelectAllInThisTab') }}
            </a-checkbox>
          </div>
          <a-divider class="my-1.5" />
          <div class="overflow-auto p-2" style="height: calc(100% - 45px)">
            <div
              v-for="(permission, index) of selectedGroupPermissions"
              :key="index"
              :style="permission.style"
              class="mb-2"
            >
              <a-checkbox
                :id="permission.name"
                :checked="getChecked(permission.name!)"
                :value="getChecked(permission.name!)"
                :disabled="isGrantedByOtherProviderName(permission.grantedProviders!)"
                @change="onClickCheckbox($event, permission)"
              >
                {{ permission.displayName }}
              </a-checkbox>
            </div>
          </div>
        </template>
      </f-resize-layout>
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
