<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.imageUploadLabel')" name="imageFieldValue">
      <f-image-upload
        v-model:value="form.imageFieldValue"
        :maxSize="20"
        :maxNumber="10"
        :uploadParams="uploadParams"
        :api="fileDescriptorUpload"
        @before-upload="handleBeforeUpload"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.submit') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { l } from '@/shared/i18n';
  import { ref, onMounted } from 'vue';
  import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
  import { FileDescriptorsService } from '@/apis';
  import { useMessage } from '@/hooks/web/useMessage';

  const form = ref({
    imageFieldValue: Array<string>(),
  });

  const { notification: notify } = useMessage();

  const formRef = ref('formRef');
  const directoryId = ref<string | undefined>(undefined);
  const uploadParams = {} as {
    name?: string;
    directoryId?: string;
    overrideExisting?: boolean;
    extraProperties?: Record<string, any>;
  };

  const rules = {
    imageFieldValue: [{ required: true, message: '请选择', trigger: 'change' }],
  };

  onMounted(() => {
    setTimeout(() => {
      form.value.imageFieldValue = ['a805309c-8f41-d140-3afe-3a14c8dbd741'];
    }, 1000);
  });

  /**
   * 处理图片上传前的文件是否已经上传过的校验
   * @param file
   */
  const handleBeforeUpload = async (file) => {
    const { name, size } = file;
    const fileList = [
      {
        fileName: name,
        directoryId: directoryId.value,
        size,
      },
    ];

    try {
      const info = await FileDescriptorsService.postApiFileManagementFileDescriptorPreUploadInfo({
        requestBody: fileList,
      });
      info.forEach((item) => {
        item.doesExist &&
          notify.warning({
            message: l('Unified.texts.SomeChoosedFilesExist'),
          });
      });
    } catch (err) {
      notify.error({ message: l(err.body.error.code) });
    }
  };

  const handleSubmit = () => {
    (formRef.value as any).validate().then((res) => {
      console.log('form：', res);
    });
  };
</script>
