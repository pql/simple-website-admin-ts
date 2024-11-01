<template>
  <a-spin :spinning="loading">
    <div v-if="currentComponentsKey == 'message'" class="modal-header">
      <h2>{{ l('TextTemplateManagement.texts.Contents') }}</h2>

      <div class="alert alert-danger">
        <div v-html="l('TextTemplateManagement.texts.InlineContentDescription')"></div>
        <!-- <div> {{ l('TextTemplateManagement.texts.Contents2') }}</div> -->
      </div>

      <div class="toolbar-area">
        <div class="modal-header">
          <span class="template-Content"> {{ l('TextTemplateManagement.texts.Name') }}</span>
          ：<span class="modal-header form-label">{{ param.templateName }}</span>
        </div>

        <div class="modal-header">
          <span class="template-Content">
            {{ l('TextTemplateManagement.texts.TemplateContent') }}*</span
          >
          <a-textarea class="textarea" v-model:value="param.content" showCount />
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

            <a class="button-layout" @click="custom()">{{
              l('TextTemplateManagement.texts.CustomizePerCulture')
            }}</a>
          </span>
        </div>
      </div>
    </div>

    <div v-if="currentComponentsKey == 'custom'">
      <custom :_templateName="currentComponentsValue" @childData="receiveDataFromChild"></custom>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import messageMixin from './message';
  export default defineComponent({
    name: 'Message',
    mixins: [messageMixin],
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
