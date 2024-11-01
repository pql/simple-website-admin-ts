<template>
  <div style="padding: 10px">
    <div>
      <card v-if="isGrantedAny('Unified.SiteIconSetting.Edit')">
        <a-form-item>
          <a-button type="primary" @click="handleSubmit">
            <save-outlined />
            {{ l('Unified.texts.SaveAll') }}
          </a-button>
        </a-form-item>
      </card>
    </div>
    <div style="padding: 10px 0">
      <card>
        <a-form ref="formRef" layout="inline" :model="form" :rules="rules">
          <a-form-item :label="l('Unified.texts.SiteIcon')" name="siteIcon">
            <f-image-upload
              v-model:value="form.siteIcon"
              :maxSize="20"
              :maxNumber="1"
              :uploadParams="uploadParams"
              :api="fileDescriptorUpload"
            />
          </a-form-item>
          <a-form-item :label="l('Unified.texts.BuildingIcon')" name="buildingIcon">
            <f-image-upload
              v-model:value="form.buildingIcon"
              :maxSize="20"
              :maxNumber="1"
              :uploadParams="uploadParams"
              :api="fileDescriptorUpload"
            />
          </a-form-item>
          <a-form-item :label="l('Unified.texts.FloorIcon')" name="floorIcon">
            <f-image-upload
              v-model:value="form.floorIcon"
              :maxSize="20"
              :maxNumber="1"
              :uploadParams="uploadParams"
              :api="fileDescriptorUpload"
            />
          </a-form-item>
        </a-form>
      </card>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SiteIconSetting from './site-lcon-setting';

  export default defineComponent({
    name: 'SiteConfigurationDesignSiteIconSetting',
    mixins: [SiteIconSetting],
  });
</script>

<style lang="less" scoped></style>
