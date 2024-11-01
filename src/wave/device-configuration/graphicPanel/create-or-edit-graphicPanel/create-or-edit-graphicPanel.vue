<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          !id
            ? l('Unified.texts.CreateNewDesignGraphicPanel')
            : l('Unified.texts.EditDesignGraphicPanel')
        }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
      <a-form :form="entity" :model="entity" ref="formRef" :layout="'vertical'" @submit="handleSubmit"
        autocomplete="off">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item :label="l('Unified.texts.Table:GraphicName')" name="graphicName" :rules="[
              {
                required: true,
                message: l('Unified.texts.ThisFieldIsRequired'),
                trigger: 'blur',
              },
              { validator: nameVerify },
            ]">
              <a-input v-model:value="entity.graphicName" type="text" />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item :label="l('Unified.texts.Table:GraphicPanelType')" name="graphicPanelTypeId" :rules="[
              {
                required: true,
                message: l('Unified.texts.ThisFieldIsRequired'),
                trigger: 'blur',
              },
            ]">
              <f-select name="graphicPanelTypeId" v-model:value="entity.graphicPanelTypeId" allow-clear show-search
                optionFilterProp="name" :show-arrow="true" :dataSource="graphicPanelTypeDataSource"
                @change="selectGraphicPanelTypeChange" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input v-model:value="entity.description" type="text" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8" v-if="entity.graphicPanelTypeName == 'Image'">
            <a-form-item :label="l('Unified.texts.Table:GraphicUrl')" name="graphicUrl"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]">
              <f-image-upload v-model:value="entity.graphicUrl" :maxSize="20" :maxNumber="1"
                :uploadParams="uploadParams" :api="fileDescriptorUpload" @before-upload="handleBeforeUpload" />
            </a-form-item>
          </a-col>
          <a-col :span="8" v-if="entity.graphicPanelTypeName == 'Floor'">
            <a-form-item :label="l('Unified.texts.BuildingFloorModel')" name="modelId"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]">
              <f-select name="buildingFloorModel" v-model:value="entity.modelId" allow-clear show-search
                optionFilterProp="name" :show-arrow="true" :dataSource="buildingFloorDataSource"
                @change="selectBuildingFloorModelTypeChange" />
              <!-- <building-floor-model-select
                name="buildingFloorModel"
                :isDefalut="true"
                v-model:type="buildingFloorModelType"
                v-model:value="entity.modelId"
              /> -->
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="loading" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button :loading="loading" v-show="showNextStepButton" :type="'primary'" @click="handleSubmit(false)">
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="loading" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>
<script lang="ts">
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  // CreateOrUpdateGraphicPanelInput,
  // GraphicPanelEditDto,
  // GraphicPanelServiceProxy,
  // GetGraphicPanelForEditOutput,
  // NameVerifyInput
  FireBytes_Unified_Wave_GraphicPanels_Dtos_CreateOrUpdateGraphicPanelInput as CreateOrUpdateGraphicPanelInput,
  FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelEditDto as GraphicPanelEditDto,
  FireBytes_Unified_Wave_GraphicPanels_Dtos_GetGraphicPanelForEditOutput as GetGraphicPanelForEditOutput,
  FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
  GraphicPanelService,
} from '/@/apis';
import { defineComponent, getCurrentInstance, ref } from 'vue';
// import { PagedListingComponentBase, IPagedRequestDto } from '/@/shared/component-base';
import GraphicPanelTypeSelect from '/@/wave/component/select/graphic-panel-type-select.vue';
import BuildingFloorModelSelect from '/@/wave/component/select/building-floor-model-select.vue';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
// import { string } from 'vue-types';
import { config } from '@/shared/config/config.js';

export default defineComponent({
  name: 'CreateOrEditGraphicPanel',
  components: { GraphicPanelTypeSelect, BuildingFloorModelSelect },
  mixins: [
    ModalComponentBase,
    // , PagedListingComponentBase
  ],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const vm = getCurrentInstance();
    return { vm };
  },
  data() {
    return {
      entity: ref<GraphicPanelEditDto>({}),
      buildingFloorModelType: 0,
      uploadFileList: new Array<any>(),
      uploadFileUrl: '',
      uploadHeaders: {},
      graphicPanelType: '',
      maxProfilPictureBytesValue: 100, //AppConsts.maxProfilPictureMb,
      id: '',
      editData: {} as GetGraphicPanelForEditOutput,
      uploadParams: {
        // directoryId: 'c4bdce2d-fa05-eb55-e3db-3a14cd3e0759'
      } as {
        name?: string;
        directoryId?: string;
        overrideExisting?: false;
        extraProperties?: Record<string, any>;
      },
      fileDescriptorUpload: fileDescriptorUpload,
      graphicPanelTypeDataSource: {
        service: 'GraphicPanelTypeService.getApiAppGraphicPanelTypeNdoList',
        labelField: 'name',
        valueField: 'id',
        valueChange: [],
        params: {},
      },
      buildingFloorDataSource: {
        service: 'BuildingFloorModelService.getApiAppBuildingFloorModelNdoList',
        labelField: 'name',
        valueField: 'id',
        valueChange: [],
        params: { type: 0 },
      },
    };
  },
  computed: {},
  mounted() {
    this.id = this.pageDataList[0] as string;
    this.getPageData(this.id);
  },
  methods: {
    /**
     * 获取数据
     */
    getPageData(id) {
      this.id = id;
      this.loading = true;
      GraphicPanelService.getApiAppGraphicPanelForEdit({
        id: id == undefined ? null : id,
      })
        .finally(() => {
          this.loading = false;
        })
        .then((result) => {
          this.entity = result.graphicPanel;
        });
    },
    handleClose() {
      (this.$refs.formRef as any).resetFields();
    },
    selectGraphicPanelTypeChange(selectKey, item) {
      this.entity.graphicPanelTypeName = item?.name;
    },
    selectBuildingFloorModelTypeChange(selectKey, item) {
      this.entity.buildingFloorModelType = item?.name;
    },
    /**
     * 处理图片上传前的文件是否已经上传过的校验
     * @param file
     */
    async handleBeforeUpload(file) {
      // const { name, size } = file;
      // const fileList = [
      //   {
      //     fileName: name,
      //     directoryId: this.directoryId,
      //     size,
      //   },
      // ];
      // try {
      //   const info =
      //     await FileDescriptorsService.postApiFileManagementFileDescriptorPreUploadInfo({
      //       requestBody: fileList,
      //     });
      //   info.forEach((item) => {
      //     item.doesExist &&
      //     this.notify.warning({
      //         message: this.l('Unified.texts.SomeChoosedFilesExist'),
      //       });
      //   });
      // } catch (err) {
      //   this.notify.error({ message: this.l(err.body.error.code) });
      // }
    },
    /**
     *上传文件
     */
    uploadChange(info: { file: any; fileList: any }): void {
      this.getFileUploadUrl('');
      if (info.file.status === 'error') {
        this.notify.error({
          message: this.l('Unified.texts.FileSavedFailed'),
        });
        return;
      }
      if (info.file.status === 'done') {
        this.notify.success({
          message: this.l('Unified.texts.SavedSuccessfully'),
        });
        // this.isTableLoading = false;
        let fileList = [...info?.fileList];
        fileList = fileList.slice(-2);
        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.url;
          }
          return file;
        });
        this.uploadFileList = fileList;
        //this.fileRefresh();
        return;
      }
    },
    /**
     * 按钮回调事件
     */
    //  fileRefresh() {
    //   console.log(this.showType);

    //   if (this.showType === 'big') {
    //     this.refresh();
    //   } else {
    //     (this.$refs.table as any).reloadGoFirstPage();
    //   }
    // },
    beforeUpload(file: any) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif' ||
        file.type === 'image/bmp';
      if (!isJPG) {
        this.message.error(this.l('OnlySupportPictureFile'));
      }
      const isLtXM = file.size / 1024 / 1024 < this.maxProfilPictureBytesValue;
      if (!isLtXM) {
        this.message.error(
          this.l('Unified.texts.ProfilePictureWarnSizeLimit', [this.maxProfilPictureBytesValue]),
        );
      }
      const isValid = isJPG && isLtXM;
      return isValid;
    },
    /**
     * 获取上传文件地址
     */
    getFileUploadUrl(parentId: string) {
      this.uploadFileUrl =
        this.appConsts.remoteServiceBaseUrl +
        '/api/services/app/SysFile/Create?parentId=' +
        parentId;
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        const input = {} as CreateOrUpdateGraphicPanelInput;
        input.graphicPanel = this.entity;
        input.graphicPanel.graphicUrlPath = input.graphicPanel.graphicUrl;
        if (this.entity.graphicPanelTypeName == 'Avue') {
          input.graphicPanel.visualConfigJson = JSON.stringify(
            Object.assign({}, config, {
              name: this.entity.graphicName,
            })
          );
        }

        this.loading = true;
        GraphicPanelService.postApiAppGraphicPanelOrUpdate({
          requestBody: input,
        })
          .finally(() => {
            this.loading = false;
          })
          .then(() => {
            this.notify.success({
              message: this.l('Unified.texts.SavedSuccessfully'),
            });
            if (closeFlag) {
              this.success();
            } else {
              this.saveNotClose();
            }
          });
      });
    },
    nameVerify(rule, value, callback) {
      if (!this.entity.graphicName) return Promise.resolve();
      var verifyInput = {} as NameVerifyInput;
      verifyInput.name = this.entity.graphicName;
      verifyInput.id = this.id;
      GraphicPanelService.postApiAppGraphicPanelNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.NameRepetition'));
          return;
        }
        callback();
      });
    },
  },
});
</script>
<style lang="less" scoped>
.number-width {
  width: 100%;
}
</style>
