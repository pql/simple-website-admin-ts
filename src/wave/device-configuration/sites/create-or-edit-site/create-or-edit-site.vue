<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
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
        <a-row :gutter="16">
          <a-col :span="8">
            <!-- Site Name -->
            <a-form-item :label="l('Unified.texts.SiteName')" name="siteName">
              <a-input name="siteName" v-model:value="form.siteName" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Country -->
            <a-form-item :label="l('Unified.texts.Country')" name="country">
              <a-input name="country" v-model:value="form.country" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Site SiteAddress -->
            <a-form-item :label="l('Unified.texts.SiteAddress')" name="siteAddress">
              <a-input name="siteAddress" v-model:value="form.siteAddress" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- GraphicPanel -->
            <a-form-item :label="l('Unified.texts.GraphicPanel')" name="graphicPanelId">
              <f-select
                v-model:value="form.graphicPanelId"
                name="graphicPanelId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="graphicPanelDataSource"
                @change="selectGraphicPaneChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Site Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input name="description" v-model:value="form.description" :autocomplete="'off'" />
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
  import CreateoOrEditSite from './create-or-edit-site';

  export default defineComponent({
    name: 'CreateoOrEditSite',
    mixins: [CreateoOrEditSite],
  });
</script>

<style lang="less" scoped></style>
