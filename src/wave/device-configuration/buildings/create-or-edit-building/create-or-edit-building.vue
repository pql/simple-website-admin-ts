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
            <!-- BuildingName -->
            <a-form-item :label="l('Unified.texts.BuildingName')" name="buildingName">
              <a-input
                name="buildingName"
                v-model:value="form.buildingName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- BuildingAddress -->
            <a-form-item :label="l('Unified.texts.BuildingAddress')" name="buildingAddress">
              <a-input
                name="buildingAddress"
                v-model:value="form.buildingAddress"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input name="description" v-model:value="form.description" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Site -->
            <a-form-item :label="l('Unified.texts.Site')" name="siteId">
              <f-select
                v-model:value="form.siteId"
                name="siteId"
                :disabled="isDesign"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="siteDataSource"
              />
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
  import CreateOrEditBuilding from './create-or-edit-building';

  export default defineComponent({
    name: 'CreateOrEditBuilding',
    mixins: [CreateOrEditBuilding],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-building.less';
</style>
