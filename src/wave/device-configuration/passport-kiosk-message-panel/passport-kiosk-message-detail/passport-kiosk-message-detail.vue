<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.ViewDetails') }}
      </div>
    </div>
    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
      >
        <a-tabs v-model:activeKey="currentTab">
          <!-- 请求信息 -->
          <a-tab-pane key="1" :tab="l('Unified.texts.DocumentInformation')">
            <!-- 表单 -->
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DocumentPage')">
                  <a-image
                    :fallback="fallback"
                    :src="form.documentImageVisableBase64String"
                    :width="200"
                    :height="200"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-row :gutter="4">
                  <a-col :span="24">
                    <a-form-item :label="l('Unified.texts.DocumentType')">
                      <a-input
                        disabled
                        v-model:value="form.documentType"
                        :autocomplete="'off'"
                      /> </a-form-item
                  ></a-col>
                  <a-col :span="24">
                    <a-form-item :label="l('Unified.texts.DocumentId')">
                      <a-input disabled v-model:value="form.documentId" :autocomplete="'off'" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="24">
                    <a-form-item :label="l('Unified.texts.Nationality')">
                      <a-input disabled v-model:value="form.nationality" :autocomplete="'off'" />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="l('Unified.texts.FacialImages')">
            <a-row :gutter="4">
              <a-col :span="9">
                <a-form-item :label="l('Unified.texts.CapturedFace')">
                  <a-image
                    :fallback="fallback"
                    :src="form.faceBase64String"
                    :width="200"
                    :height="200"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="9">
                <a-form-item :label="l('Unified.texts.ImageExtractedFromChip')">
                  <a-image
                    :fallback="fallback"
                    :src="form.documentImageFaceBase64String"
                    :width="200"
                    :height="200"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" :tab="l('Unified.texts.IrisImages')">
            <a-row :gutter="4">
              <a-col :span="9">
                <!-- File -->
                <a-form-item :label="l('Unified.texts.LeftIris	')">
                  <a-image
                    :fallback="fallback"
                    :src="form.irisLeftBase64String"
                    :width="200"
                    :height="200"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="9">
                <a-form-item :label="l('Unified.texts.RightIris')" name="modelName">
                  <a-image
                    :fallback="fallback"
                    :src="form.irisRightBase64String"
                    :width="200"
                    :height="200"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import mixinsComponent from './passport-kiosk-message-detail';

  export default defineComponent({
    name: 'PassportKioskMessageDetail',
    mixins: [mixinsComponent],
  });
</script>

<style lang="less" scoped></style>
