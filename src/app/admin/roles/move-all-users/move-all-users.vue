<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.MoveAllUsers') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="24">
            <!-- 名称 * -->
            <a-form-item name="roleId">
              <template #label>
                <span v-html="l('Unified.texts.MoveAllUsersWithRoleTo', [`${name}`])"></span>
              </template>
              <f-select
                ref="roleId"
                v-model:value="form.roleId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="roleDataSource"
                @selectListChange="selectListChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
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
  import MoveAllUsersMixin from './move-all-users';

  export default defineComponent({
    name: 'MoveAllUsers',
    mixins: [MoveAllUsersMixin],
  });
</script>

<style scoped lang="less"></style>
