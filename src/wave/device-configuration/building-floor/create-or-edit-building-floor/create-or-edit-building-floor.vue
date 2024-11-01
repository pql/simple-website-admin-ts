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
            <!-- floor -->
            <a-form-item :label="l('Unified.texts.FloorName')" name="floor">
              <a-input name="floor" v-model:value="form.floor" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- FloorDisplayName -->
            <a-form-item :label="l('Unified.texts.FloorDisplayName')" name="floorDisplayName">
              <a-input
                name="floorDisplayName"
                v-model:value="form.floorDisplayName"
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
            <!-- Building -->
            <a-form-item :label="l('Unified.texts.Building')" name="buildingId">
              <f-select
                v-model:value="form.buildingId"
                name="buildingId"
                allow-clear
                show-search
                :disabled="isDesign"
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="buildingDataSource"
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
              <!-- <GraphicPanelSelectCombox
                name="graphicPanelId"
                :defaultValue="form.graphicPanelId"
                @change="graphicPanelSelectChange"
                @change-type-name="changeTypeName"
              /> -->
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
  import CreateoOrEditBuildingFloor from './create-or-edit-building-floor';

  export default defineComponent({
    name: 'CreateoOrEditBuildingFloor',
    mixins: [CreateoOrEditBuildingFloor],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-building-floor.less';
</style>
