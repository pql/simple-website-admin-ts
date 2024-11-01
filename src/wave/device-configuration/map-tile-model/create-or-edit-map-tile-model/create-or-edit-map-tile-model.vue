<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
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
        <a-row :gutter="16">
          <a-col :span="24">
            <!-- File -->
            <a-form-item :label="l('Unified.texts.File')" name="fileId">
              <f-image-upload
                draggable
                v-model:value="form.fileId"
                :maxSize="20"
                :maxNumber="1"
                :uploadParams="uploadParams"
                :accept="['zip', 'rar']"
                :api="fileDescriptorUpload"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- MapTileName -->
            <a-form-item :label="l('Unified.texts.MapTileName')" name="modelName">
              <a-input
                name="modelName"
                v-model:value="form.modelName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Site Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input
                name="description"
                v-model:value="form.description"
                :autocomplete="'off'"
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
  import CreateOrEditMapTileModel from './create-or-edit-map-tile-model';

  export default defineComponent({
    name: 'CreateOrEditMapTileModel',
    mixins: [CreateOrEditMapTileModel],
  });
</script>

<style lang="less" scoped></style>
