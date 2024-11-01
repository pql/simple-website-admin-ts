<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          !id ? l('Unified.texts.CreateRedundantServer') : l('Unified.texts.EditRedundantServer')
        }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        :form="entity"
        :model="entity"
        ref="formRef"
        :layout="'vertical'"
        @submit="handleSubmit"
        autocomplete="off"
      >
        <a-row>
          <a-col :span="24">
            <a-form-item
              :label="l('Unified.texts.ServerHostNameOrIp')"
              name="serverHostNameOrIp"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <a-input v-model:value="entity.serverHostNameOrIp" type="text" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :label="l('Unified.texts.ServicePort')"
              name="port"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <a-input v-model:value="entity.port" string-mode />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item
              :label="l('Unified.texts.Table:CredentialProfile')"
              name="credentialProfileId"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <f-select
                name="credentialProfileId"
                v-model:value="entity.credentialProfileId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="credentialProfileDataSource"
              />
              <!-- <credential-profile-select
                name="credentialProfileId"
                v-model:value="entity.credentialProfileId"
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
        <a-button
          :loading="loading"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
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
    // RedundantServerServiceProxy,
    // GetRedundantServerForEditOutput,
    // RedundantServerEditDto
    RedundantServerService,
    FireBytes_Unified_Wave_RedundantServers_Dtos_GetRedundantServerForEditOutput as GetRedundantServerForEditOutput,
    FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerEditDto as RedundantServerEditDto,
  } from '/@/apis';
  import { defineComponent } from 'vue';
  import CredentialProfileSelect from '/@/wave/component/select/credential-profile-select.vue';

  export default defineComponent({
    name: 'CreateOrEditBrand',
    components: {
      CredentialProfileSelect,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
      deviceId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        id: '',
        entity: {} as RedundantServerEditDto,
        credentialProfileDataSource: {
          service: 'DeviceCredentialProfileService.getApiAppDeviceCredentialProfileNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
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
        RedundantServerService.getApiAppRedundantServerForEdit({
          id: id == undefined ? null : id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            this.entity = result.redundantServer;
          });
      },
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then(() => {
          const input = {} as GetRedundantServerForEditOutput;
          if (this.deviceId != undefined) {
            this.entity.deviceId = this.deviceId;
          }
          input.redundantServer = this.entity;
          this.saving = true;
          RedundantServerService.postApiAppRedundantServerOrUpdate({
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
    },
  });
</script>
<style lang="less" scoped>
  .number-width {
    width: 100%;
  }
</style>
