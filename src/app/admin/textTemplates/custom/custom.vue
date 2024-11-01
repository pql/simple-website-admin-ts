<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      {{ l('TextTemplateManagement.texts.Contents') }}
      <div class="toolbar-area">
        <div class="modal-header">
          {{ l('TextTemplateManagement.texts.Name') }}：<span class="modal-header form-label">{{
            _templateName
          }}</span>
        </div>

        <div class="modal-header">
          <a-row>
            <a-col :span="11">
              <span class="template-Content">
                {{ l('TextTemplateManagement.texts.BaseCultureName') }}</span
              >
              <br />
              <Select
                class="a-property"
                :value="referenceKey"
                :options="selectOptions"
                @change="selectReferenceChange"
              />

              <br />
              <br />
              <br />
              <span class="template-Content">
                {{ l('TextTemplateManagement.texts.BaseContent') }}</span
              >
              <a-textarea
                class="textarea"
                disabled="true"
                v-model:value="referenceDto.content"
                showCount
              />
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="11">
              <span class="template-Content">
                {{ l('TextTemplateManagement.texts.TargetCultureName') }}</span
              >
              <br />
              <Select
                class="a-property"
                :value="targetKey"
                :options="selectOptions"
                @change="selectTargetChange"
              />

              <br />
              <br />
              <br />
              <span class="template-Content">
                {{ l('TextTemplateManagement.texts.TemplateContent') }}*</span
              >
              <a-textarea class="textarea" v-model:value="targetDto.content" showCount />
            </a-col>
          </a-row>
        </div>

        <div class="modal-header">
          <span>
            <a-button :type="'primary'" @click="goToTextTemplates()">
              <ArrowLeftOutlined />
              {{ l('TextTemplateManagement.texts.ReturnToTemplates') }}
            </a-button>
          </span>
          <span class="span-button-layout">
            <a-button class="button-layout" :type="'primary'" @click="handleSubmit()">
              {{ l('TextTemplateManagement.texts.SaveContent') }}
            </a-button>

            <a-button class="button-layout" :type="'primary'" @click="restoreDefault()" danger>
              {{ l('TextTemplateManagement.texts.RestoreToDefault') }}
            </a-button>
          </span>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import customMixin from './custom';
  export default defineComponent({
    name: 'Custom',
    mixins: [customMixin],
  });
</script>

<style scoped lang="less">
  .modal-header {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .alert-danger {
    background: #c00d494d;
    border: 1px solid rgba(192, 13, 73, 0.3);
    -webkit-backdrop-filter: saturate(100%) blur(10px);
    backdrop-filter: saturate(100%) blur(10px);
    position: relative;
    color: #325168;
  }

  .alert {
    --bs-alert-padding-x: 1.5rem;
    --bs-alert-padding-y: 1.5rem;
    --bs-alert-margin-bottom: 1rem;
    padding: var(--bs-alert-padding-y) var(--bs-alert-padding-x);
    margin-bottom: var(--bs-alert-margin-bottom);
    border-radius: var(--bs-alert-border-radius);
    --bs-alert-border-radius: 0.5rem;
  }

  .toolbar-area {
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    border: var(--border-color) solid 0.0625rem;
    border-radius: 12px;
  }

  .toolbar-area {
    width: 100%;
    height: 100%;
    margin-bottom: 7px;
    border: var(--border-color) solid 0.0625rem;
    border-radius: 12px;
  }

  .form-label {
    font-weight: 800;
  }

  .span-button-layout {
    float: right;
  }

  .button-layout {
    margin-left: 20px;
  }

  .a-property {
    width: 50%;
  }

  .template-Content {
    color: #9ca5b4;
    font:
      14px lnter,
      sans-serif;
  }

  html[data-theme='light'] {
    .textarea {
      margin-top: 5px;
    }

    .textarea :deep(textarea) {
      height: 230px;
      background: #f0f4f7;
    }
  }

  html[data-theme='dark'] {
    .textarea {
      margin-top: 5px;
    }

    .alert-danger {
      background: #c00d494d;
      border: 1px solid rgba(192, 13, 73, 0.3);
      -webkit-backdrop-filter: saturate(100%) blur(10px);
      backdrop-filter: saturate(100%) blur(10px);
      position: relative;
      color: #f9fafc;
    }

    .textarea :deep(textarea) {
      height: 230px;
      background: #121212;
    }
  }
</style>
