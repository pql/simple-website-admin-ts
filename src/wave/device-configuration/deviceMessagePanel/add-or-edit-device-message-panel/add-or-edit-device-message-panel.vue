<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          isView
            ? l('Unified.texts.DeviceMessagePanelDetail')
            : !id
              ? l('Unified.texts.CreateNewDeviceMessagePanel')
              : l('Unified.texts.EditDeviceMessagePanel')
        }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form :form="entity" layout="vertical" autocomplete="off">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item :label="l('Unified.texts.AcknowledgedBy')" name="acknowledgedBy">
              <a-input v-model:value="entity.acknowledgedBy" type="text" :disabled="true" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="l('Unified.texts.AcknowledgedDateTime')" name="AcknowledgedDateTime">
              <f-date-picker
                show-time
                v-model:value="entity.acknowledgedDateTime"
                :disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item :label="l('Unified.texts.AcknowledgedComment')" name="acknowledgedsssComment">
              <a-textarea v-model:value="entity.acknowledgedComment" :rows="4" :disabled="isView" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item :label="l('Unified.texts.Details')" name="details">
              <a-textarea v-model:value="entity.details" :rows="4" :disabled="isView" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="modal-footer" v-if="!isView">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="saving"
          type="primary"
          v-show="showNextStepButton"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="saving" type="primary" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  // import { appSessionService } from '/@/shared';
  // import { dateTimeService } from '@firebytes/basic-module-vue';
  import { formatToDateTime } from '@/utils/dateUtil';
  import moment from 'moment';
  import {
    DeviceMessagePanelService,
    FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateOrUpdateDeviceMessagePanelInput as UpdateDeviceMessagePanelInput,
    FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelEditDto as DeviceMessagePanelEditDto,
  } from '@/apis';
  import { useTimezone } from '@/timezones/useTimezone';
  const {
    fromUTCDateToLocalDateTime: formateDateToDatetime,
    fromLocalDateToUTCDateFormat: formateUtc,
  } = useTimezone();
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'add-or-edit-device-message-panel',
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
        deviceMessagePanelService: '',
        entity: {} as DeviceMessagePanelEditDto,
        isView: false,
      };
    },
    computed: {},
    mounted() {
      this.id = this.pageDataList[0] as string;
      const userName = this.abp.currentUser ? this.abp?.currentUser.userName : '';
      this.getPageData(this.id, userName);
    },
    methods: {
      /**
       * 获取数据
       */
      getPageData(id, userName) {
        this.id = id;
        this.loading = true;
        DeviceMessagePanelService.getApiAppDeviceMessagePanelForEdit({ id })
          .then((result) => {
            this.entity = result.deviceMessagePanel;
            if (this.entity?.acknowledgedBy == null) {
              this.entity.acknowledgedBy = userName;
              const timestamp = Date.now();
              this.entity.acknowledgedDateTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            } else {
              this.isView = true;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      handleClose() {},
      handleSubmit(closeFlag = true) {
        let { acknowledgedDateTime } = this.entity;
        const DateTime = formateUtc(moment(acknowledgedDateTime).valueOf());
        const requestBody = {
          deviceMessagePanel: { ...this.entity, acknowledgedDateTime: DateTime },
        } as UpdateDeviceMessagePanelInput;
        this.saving = true;
        DeviceMessagePanelService.postApiAppDeviceMessagePanelOrUpdate({ requestBody })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            if (closeFlag) {
              this.success();
            } else {
              this.saveNotClose();
            }
          })
          .finally(() => {
            this.saving = false;
          });
      },
    },
  });
</script>
