<template>
  <div>
    <UploadDragger
      v-if="draggable"
      v-bind="$attrs"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="getStringAccept"
      :multiple="multiple"
      :maxCount="maxNumber"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      :disabled="disabled"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div>
        <plus-outlined />
        <div style="margin-top: 8px">{{ t('Unified.texts.component:upload:upload') }}</div>
      </div>
    </UploadDragger>
    <Upload
      v-else
      v-bind="$attrs"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="getStringAccept"
      :multiple="multiple"
      :maxCount="maxNumber"
      :before-upload="beforeUpload"
      :custom-request="customRequest"
      :disabled="disabled"
      @preview="handlePreview"
      @remove="handleRemove"
    >
      <div v-if="fileList && fileList.length < maxNumber">
        <plus-outlined />
        <div style="margin-top: 8px">{{ t('Unified.texts.component:upload:upload') }}</div>
      </div>
    </Upload>
    <Modal :open="previewOpen" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, toRefs, watch } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  import { Modal, Upload, Form, UploadDragger } from 'ant-design-vue';
  import { UploadRequestOption } from 'ant-design-vue/lib/vc-upload/interface';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isArray, isFunction, isObject, isString } from '@/utils/is';
  import { warn } from '@/utils/log';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useUploadType } from '../hooks/useUpload';
  import { uploadContainerProps } from '../props';
  import { checkFileType, getFileUrlById, getFileInfoById } from '../helper';
  import { UploadResultStatus } from '@/components/Upload/src/types/typing';
  import { get, omit } from 'lodash-es';

  defineOptions({ name: 'FImageUpload' });

  const emit = defineEmits(['change', 'update:value', 'delete', 'beforeUpload']);
  const props = defineProps({
    ...omit(uploadContainerProps, ['previewColumns', 'beforePreviewData']),
  });
  const { t } = useI18n();
  const { createMessage } = useMessage();
  const { accept, helpText, maxNumber, maxSize } = toRefs(props);
  const isInnerOperate = ref<boolean>(false);
  const { getStringAccept } = useUploadType({
    acceptRef: accept,
    helpTextRef: helpText,
    maxNumberRef: maxNumber,
    maxSizeRef: maxSize,
  });
  const previewOpen = ref<boolean>(false);
  const previewImage = ref<string>('');
  const previewTitle = ref<string>('');

  const fileList = ref<UploadProps['fileList']>([]);
  const isLtMsg = ref<boolean>(true);
  const isActMsg = ref<boolean>(true);
  const isFirstRender = ref<boolean>(true);

  const formItemContext = Form.useInjectFormItemContext();

  watch(
    () => props.value,
    (v) => {
      if (isInnerOperate.value) {
        isInnerOperate.value = false;
        return;
      }
      let value: string[] = [];
      if (v) {
        if (isArray(v)) {
          value = v;
        } else {
          value.push(v);
        }
        /**
         * 通过文件id获取图片base64地址
         */
        const transformedValue = value.map(async (v) => {
          if (v && isString(v) && v.length === 36) {
            // const previewImage = await getFileUrlById(v);
            const previewImage = await getFileInfoById(v);
            return previewImage;
          }
        });
        Promise.all(transformedValue).then((values) => {
          fileList.value = values.map((item, i) => {
            console.log('fileList.value', item);

            if (item && isString(item)) {
              return {
                response: {
                  id: value[i],
                },
                uid: -i + '',
                name: item.substring(item.lastIndexOf('/') + 1),
                status: 'done',
                url: item,
              };
            } else if (item && isObject(item)) {
              if (item.fileName && item.base64String) {
                return {
                  response: {
                    id: value[i],
                  },
                  uid: -i + '',
                  name: item.fileName,
                  status: 'done',
                  url: item.base64String,
                };
              } else {
                return item;
              }
            } else {
              return [];
            }
          }) as UploadProps['fileList'];
          console.log('fileList.value', fileList.value);
        });
      }
      // emit('update:value', value);
      if (!isFirstRender.value) {
        emit('change', value);
        isFirstRender.value = false;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  function getBase64<T extends string | ArrayBuffer | null>(file: File) {
    return new Promise<T>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as T);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64<string>(file.originFileObj!);
    }
    previewImage.value = file.url || file.preview || '';
    previewOpen.value = true;
    previewTitle.value =
      file.name || previewImage.value.substring(previewImage.value.lastIndexOf('/') + 1);
  };

  const handleRemove = async (file: UploadFile) => {
    if (fileList.value) {
      const index = fileList.value.findIndex((item) => item.uid === file.uid);
      index !== -1 && fileList.value.splice(index, 1);
      const value = getValue();
      isInnerOperate.value = true;
      emit('update:value', value);
      emit('change', value);
      emit('delete', file);
    }
  };

  const handleCancel = () => {
    previewOpen.value = false;
    previewTitle.value = '';
  };

  const beforeUpload = (file: File) => {
    const { maxSize, accept } = props;
    const isAct = checkFileType(file, accept);
    if (!isAct) {
      createMessage.error(t('Unified.texts.component:upload:acceptUpload', [accept]));
      isActMsg.value = false;
      // 防止弹出多个错误提示
      setTimeout(() => (isActMsg.value = true), 1000);
    }
    const isLt = file.size / 1024 / 1024 > maxSize;
    if (isLt) {
      createMessage.error(t('Unified.texts.component:upload:maxSizeMultiple', [maxSize]));
      isLtMsg.value = false;
      // 防止弹出多个错误提示
      setTimeout(() => (isLtMsg.value = true), 1000);
    }
    emit('beforeUpload', file);
    return (isAct && !isLt) || Upload.LIST_IGNORE;
  };

  async function customRequest(info: UploadRequestOption<any>) {
    const { api, uploadParams = {}, name, filename, resultField } = props;
    if (!api || !isFunction(api)) {
      return warn('upload api must exist and be a function');
    }
    try {
      const file: any = info.file;
      const formData = new window.FormData();
      const formDataJson = {
        relativePath: file.webkitRelativePath,
        name: file.name,
        type: file.type,
        file: file,
      };

      Object.keys(formDataJson).forEach((key) => {
        const value = formDataJson[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, formDataJson[key]);
      });

      const res = await api?.({
        ...(uploadParams || {}),
        formData: formData,
      });

      if (props.resultField) {
        let result = get(res, resultField);
        info.onSuccess!(result);
      } else {
        // 不传入 resultField 的情况
        info.onSuccess!(res.data);
      }
      const value = getValue();
      isInnerOperate.value = true;
      emit('update:value', value);
      emit('change', value);
      formItemContext && formItemContext.onFieldChange();
    } catch (e: any) {
      console.log(e);
      info.onError!(e);
    }
  }

  function getValue() {
    const list = (fileList.value || [])
      .filter((item) => item?.status === UploadResultStatus.DONE)
      .map((item: any) => {
        if (item?.response && props?.resultField) {
          return item?.response;
        }
        // 返回图片文件描述id
        const fileId = item?.response?.id;
        if (fileId) {
          return fileId;
        }
        return item?.url || item?.response?.url;
      });
    if (!props.multiple && list.length === 1) {
      return list[0];
    }
    return list;
  }
</script>

<style lang="less" scoped>
  .ant-upload-select-picture-card i {
    color: #999;
    font-size: 32px;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
