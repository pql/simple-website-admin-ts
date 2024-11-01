<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('AbpOpenIddict.texts.NewScope') : l('Unified.texts.Edit') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
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
            <!-- 名称 * -->
            <a-form-item :label="l('AbpOpenIddict.texts.Name')" name="name" required="true">
              <a-input
                name="name"
                v-model:value="form.name"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 显示名称 * -->
            <a-form-item :label="l('AbpOpenIddict.texts.DisplayName')" name="displayName">
              <a-input
                name="displayName"
                v-model:value="form.displayName"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 说明* -->
            <a-form-item :label="l('AbpOpenIddict.texts.Description')" name="description">
              <a-input
                name="description"
                v-model:value="form.description"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 资源 -->
            <a-form-item :label="l('AbpOpenIddict.texts.Resources')" name="resources">
              <a-textarea
                v-model:value="formattedResources"
                :rows="3"
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
  import CreateScopesModalMixin from './CreateScopesModal';

  export default defineComponent({
    name: 'Scopes',
    mixins: [CreateScopesModalMixin],
  });
</script>

<style scoped lang="less"></style>
