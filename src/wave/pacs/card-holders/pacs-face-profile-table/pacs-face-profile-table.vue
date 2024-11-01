<template>
  <div>
    <card>
      <a-form ref="formRef" labelAlign="right" layout="vertical" :autocomplete="'off'">
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item :label="l('Unified.texts.Photo')" name="Photo">
              <a-upload
                :showUploadList="false"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                :multiple="false"
                list-type="picture-card"
                class="avatar-uploader"
                :before-upload="beforeUploadPhoto"
              >
                <div v-if="faceProfile.photo" class="relative">
                  <div class="absolute top-50% left-50%" style="transform: translate(-50%, -50%)">
                    <Icon
                      icon="ant-design:eye"
                      class="mr-2 eyeIcon"
                      @click.stop="previewPicture(faceProfile.photo)"
                    ></Icon>
                    <Icon
                      icon="ant-design:delete"
                      class="mr-2 deleteIcon"
                      @click.stop="deletePicture('photo')"
                    ></Icon>
                  </div>
                  <img class="imgFormat" :src="srcPrefix + faceProfile.photo" alt="avatar" />
                </div>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    {{ l('Unified.texts.Photo') }}
                  </div>
                </div>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="l('Unified.texts.1Fingerprint')" name="1Fingerprint">
              <a-upload
                :showUploadList="false"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                :multiple="false"
                list-type="picture-card"
                class="avatar-uploader"
                :before-upload="beforeUploadFingerprintTemplate"
              >
                <div v-if="faceProfile.fingerprintTemplate" class="relative">
                  <div class="absolute top-50% left-50%" style="transform: translate(-50%, -50%)">
                    <Icon
                      icon="ant-design:eye"
                      class="mr-2 eyeIcon"
                      @click.stop="previewPicture(faceProfile.fingerprintTemplate)"
                    ></Icon>
                    <Icon
                      icon="ant-design:delete"
                      class="mr-2 deleteIcon"
                      @click.stop="deletePicture('fingerprintTemplate')"
                    ></Icon>
                  </div>
                  <img
                    class="imgFormat"
                    :src="srcPrefix + faceProfile.fingerprintTemplate"
                    alt="avatar"
                  />
                </div>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    {{ l('Unified.texts.1Fingerprint') }}
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="l('Unified.texts.2Fingerprint')" name="2Fingerprint">
              <a-upload
                :showUploadList="false"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                :multiple="false"
                list-type="picture-card"
                class="avatar-uploader"
                :before-upload="beforeUploadPalmVeinTemplate"
              >
                <div v-if="faceProfile.palmVeinTemplate" class="relative">
                  <div class="absolute top-50% left-50%" style="transform: translate(-50%, -50%)">
                    <Icon
                      icon="ant-design:eye"
                      class="mr-2 eyeIcon"
                      @click.stop="previewPicture(faceProfile.palmVeinTemplate)"
                    ></Icon>
                    <Icon
                      icon="ant-design:delete"
                      class="mr-2 deleteIcon"
                      @click.stop="deletePicture('palmVeinTemplate')"
                    ></Icon>
                  </div>
                  <img
                    class="imgFormat"
                    :src="srcPrefix + faceProfile.palmVeinTemplate"
                    alt="avatar"
                  />
                </div>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    {{ l('Unified.texts.2Fingerprint') }}
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="l('Unified.texts.LeftLris')" name="LeftLris">
              <a-upload
                :showUploadList="false"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                :multiple="false"
                list-type="picture-card"
                class="avatar-uploader"
                :before-upload="beforeUploadLeftIrisTemplate"
              >
                <div v-if="faceProfile.leftIrisTemplate" class="relative">
                  <div class="absolute top-50% left-50%" style="transform: translate(-50%, -50%)">
                    <Icon
                      icon="ant-design:eye"
                      class="mr-2 eyeIcon"
                      @click.stop="previewPicture(faceProfile.leftIrisTemplate)"
                    ></Icon>
                    <Icon
                      icon="ant-design:delete"
                      class="mr-2 deleteIcon"
                      @click.stop="deletePicture('leftIrisTemplate')"
                    ></Icon>
                  </div>
                  <img
                    class="imgFormat"
                    :src="srcPrefix + faceProfile.leftIrisTemplate"
                    alt="avatar"
                  />
                </div>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    {{ l('Unified.texts.LeftLris') }}
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :label="l('Unified.texts.RightLris')" name="RightLris">
              <a-upload
                :showUploadList="false"
                accept="image/jpeg,image/png,image/gif,image/bmp"
                :multiple="false"
                list-type="picture-card"
                class="avatar-uploader"
                :before-upload="beforeUploadRightIrisTemplate"
              >
                <div v-if="faceProfile.rightIrisTemplate" class="relative">
                  <div class="absolute top-50% left-50%" style="transform: translate(-50%, -50%)">
                    <Icon
                      icon="ant-design:eye"
                      class="mr-2 eyeIcon"
                      @click.stop="previewPicture(faceProfile.rightIrisTemplate)"
                    ></Icon>
                    <Icon
                      icon="ant-design:delete"
                      class="mr-2 deleteIcon"
                      @click.stop="deletePicture('rightIrisTemplate')"
                    ></Icon>
                  </div>
                  <img
                    class="imgFormat"
                    :src="srcPrefix + faceProfile.rightIrisTemplate"
                    alt="avatar"
                  />
                </div>
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    {{ l('Unified.texts.RightLris') }}
                  </div>
                </div>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import FaceProfile from './pacs-face-profile-table';
  export default defineComponent({
    name: 'FaceProfile',
    mixins: [FaceProfile],
  });
</script>

<style lang="less" scoped>
  .imgFormat {
    width: 100px;
    height: 100px;
  }

  .deleteIcon:hover,
  .eyeIcon:hover {
    transform: scale(1.3);
  }
</style>
