<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !id ? l('Unified.texts.CreateNewDesignGraphicPanelType') : l('Unified.texts.EditDesignGraphicPanelType') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
      <a-form :form="entity" :model="entity" ref="formRef" :layout="'vertical'" @submit="handleSubmit"
        autocomplete="off">
        <a-form-item :label="l('Unified.texts.Filter:GraphicType')" name="graphicType" :rules="[
          { required: true, message: this.l('Unified.texts.NameRepetition'), trigger: 'blur' },
          { validator: nameVerify, trigger: 'blur' },
        ]">
          <a-input v-model:value="entity.graphicType" type="text" :disabled="entity.graphicType == 'Map' ||
            entity.graphicType == 'Floor' ||
            entity.graphicType == 'Image'
            " />
        </a-form-item>
        <a-form-item :label="l('Unified.texts.Description')" name="description">
          <a-input v-model:value="entity.description" type="text" />
        </a-form-item>
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

  FireBytes_Unified_Wave_GraphicPanelTypes_Dtos_CreateOrUpdateGraphicPanelTypeInput as CreateOrUpdateGraphicPanelTypeInput,
  FireBytes_Unified_Wave_GraphicPanelTypes_Dtos_GraphicPanelTypeEditDto as GraphicPanelTypeEditDto,
  FireBytes_Unified_Wave_GraphicPanelTypes_Dtos_GetGraphicPanelTypeForEditOutput as GetGraphicPanelTypeForEditOutput,
  GraphicPanelTypeService,
  FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
} from '/@/apis';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateOrEditGraphicPanelType',
  components: {},
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      id: '',
      editData: {} as GetGraphicPanelTypeForEditOutput,
      entity: {} as GraphicPanelTypeEditDto,
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
      GraphicPanelTypeService.getApiAppGraphicPanelTypeForEdit({
        id: id == undefined ? null : id,
      })
        .finally(() => {
          this.loading = false;
        })
        .then((result) => {
          this.entity = result.graphicPanelType;
        });
    },
    handleClose() {
      (this.$refs.formRef as any).resetFields();
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        const input = {} as CreateOrUpdateGraphicPanelTypeInput;
        input.graphicPanelType = this.entity;
        this.loading = true;
        GraphicPanelTypeService.postApiAppGraphicPanelTypeOrUpdate({
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
      // 如果没有输入值，直接返回通过（因为必填校验已经在前面做了）
      if (!value) {
        return Promise.resolve();
      }
      var verifyInput = {} as NameVerifyInput;
      verifyInput.name = this.entity.graphicType;
      verifyInput.id = this.id;
      GraphicPanelTypeService.postApiAppGraphicPanelTypeNameRepeatVerify({
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
