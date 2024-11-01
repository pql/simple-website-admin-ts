<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title" v-if="id"> {{ l('Unified.texts.Edit') }} </div>
      <div class="modal-title" v-else>{{ l('LanguageManagement.texts.CreateNewLanguage') }}</div>
    </div>

    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :rules="rules"
        :label-col="{ style: { width: '200px' } }"
        :model="language"
        @submit="handleSubmit"
      >
        <!-- 语言名称 -->
        <template v-if="!id">
          <a-form-item :label="l('LanguageManagement.texts.CultureName')" name="cultureName">
            <f-select
              name="cultureName"
              allow-clear
              v-model:value="language.cultureName"
              :show-arrow="true"
              optionFilterProp="name"
              show-search
              :dataSource="cultureDataSource"
            />
          </a-form-item>
          <!-- 界面名称 -->

          <a-form-item :label="l('LanguageManagement.texts.UiCultureName')" name="uiCultureName">
            <f-select
              name="uiCultureName"
              allow-clear
              v-model:value="language.uiCultureName"
              :show-arrow="true"
              optionFilterProp="name"
              show-search
              :dataSource="cultureDataSource"
            />
          </a-form-item>
        </template>
        <!-- 显示名称 -->
        <a-form-item :label="l('LanguageManagement.texts.DisplayName')" name="displayName">
          <a-input
            name="displayName"
            v-model:value="language.displayName"
            :autocomplete="'off'"
          />
        </a-form-item>

        <!-- 启用 -->
        <a-form-item :label="l('LanguageManagement.texts.IsEnabled')">
          <a-switch
            v-model:checked="language.isEnabled"
            :checkedChildren="l('Yes')"
            :unCheckedChildren="l('No')"
          />
        </a-form-item>
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
  import CreateLanguagesModalMixin from './CreateLanguagesModal';

  export default defineComponent({
    name: 'CreateLanguages',
    mixins: [CreateLanguagesModalMixin],
  });
</script>

<style scoped lang="less"></style>
