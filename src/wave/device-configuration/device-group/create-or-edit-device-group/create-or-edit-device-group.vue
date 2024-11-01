<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !id ? l('Unified.texts.CreateNewDeviceBroadcast') : l('Unified.texts.EditDeviceBroadcast') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form :form="entity" @submit="handleSubmit" :model="entity" :layout="'vertical'" ref="formRef"
        autocomplete="off">
        <a-form-item :label="l('Unified.texts.CommandName')" name="groupName" :rules="[
          { required: true, message: l('Unified.texts.ThisFieldIsRequired') },
          { validator: nameVerify },
        ]">
          <a-input v-model:value="entity.groupName" type="text" />
        </a-form-item>
        <a-form-item :label="l('Unified.texts.Description')" name="description">
          <a-input v-model:value="entity.description" type="text" />
        </a-form-item>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()" type="button">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button :loading="saving" v-show="showNextStepButton" :type="'primary'" @click="handleSubmit(false)">
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
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  // CreateOrUpdateDeviceGroupInput,
  // DeviceGroupEditDto,
  // DeviceGroupServiceProxy,
  // GetDeviceGroupForEditOutput,
  // NameVerifyInput
  FireBytes_Unified_Wave_DeviceGroups_Dtos_CreateOrUpdateDeviceGroupInput as CreateOrUpdateDeviceGroupInput,
  FireBytes_Unified_Wave_DeviceGroups_Dtos_DeviceGroupEditDto as DeviceGroupEditDto,
  DeviceGroupService,
  FireBytes_Unified_Wave_DeviceGroups_Dtos_GetDeviceGroupForEditOutput as GetDeviceGroupForEditOutput,
  FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
} from '/@/apis';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateOrEditDeviceGroup',
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
      editData: {} as GetDeviceGroupForEditOutput,
      entity: {} as DeviceGroupEditDto,
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
      DeviceGroupService.getApiAppDeviceGroupForEdit({
        id: id,
      })
        .finally(() => {
          this.loading = false;
        })
        .then((result) => {
          this.entity = result.deviceGroup;
        });
    },
    handleClose() { },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then((vse) => {
        const input = {} as CreateOrUpdateDeviceGroupInput;
        input.deviceGroup = this.entity;
        this.saving = true;
        DeviceGroupService.postApiAppDeviceGroupOrUpdate({
          requestBody: input,
        })
          .finally(() => {
            this.saving = false;
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
      if (!this.entity.groupName) return Promise.resolve();
      var verifyInput = {} as NameVerifyInput;
      verifyInput.name = this.entity.groupName;
      verifyInput.id = this.id;
      DeviceGroupService.postApiAppDeviceGroupNameRepeatVerify({
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
