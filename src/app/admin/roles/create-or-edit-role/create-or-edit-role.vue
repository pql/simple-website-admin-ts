<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('AbpIdentity.texts.NewRole') : l('AbpIdentity.texts.Permission:Edit') }}
      </div>
    </div>
    <div class="modal-body">
      <!-- 表单 -->
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :rules="rules"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="24">
            <!-- 角色名称 -->
            <a-form-item :label="l('AbpIdentity.texts.RoleName')" name="name">
              <a-input
                name="name"
                v-model:value="form.name"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <!-- 默认 -->
            <a-form-item>
              <template #label>
                {{ l('AbpIdentity.texts.DisplayName:IsDefault') }}
              </template>
              <a-switch
                v-model:checked="form.isDefault"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <!-- 公开 -->
            <a-form-item>
              <template #label>
                {{ l('AbpIdentity.texts.DisplayName:IsPublic') }}
              </template>
              <a-switch
                v-model:checked="form.isPublic"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
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
  import CreateOrEditRole from './create-or-edit-role';

  export default defineComponent({
    name: 'CreateOrEditRole',
    mixins: [CreateOrEditRole],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-role.less';
</style>
