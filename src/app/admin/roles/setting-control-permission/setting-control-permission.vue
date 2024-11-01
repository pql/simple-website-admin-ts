<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          !id
            ? l('Unified.texts.EditControlPanelPermissions')
            : l('Unified.texts.EditControlPanelPermissions')
        }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- 提示 -->
      <a-alert :message="l('Note_RefreshPageForPermissionChanges')" type="info" closable showIcon />
      <control-permission-tree
        v-if="isResult"
        ref="controlPermissions"
        :defaultSelectedPermissions="selectedDeviceAndSBPPermissions.selectedControlPermissions"
        @selected-control-permissions-change="selectedControlPermissions = $event"
        v-model:isChange="isControlPermissionChange"
      />
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="saving"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
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
    // PanelPermissionControlServiceProxy,
    // RoleServiceProxy,
    // CreateOrUpdatePanelPermissionControlInput
    PanelPermissionControlService,
    FireBytes_Unified_Wave_PanelPermissionControls_Dtos_CreateOrUpdatePanelPermissionControlInput as CreateOrUpdatePanelPermissionControlInput,
  } from '/@/apis';
  import { defineComponent } from 'vue';
  import {
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    CloseCircleOutlined,
    SaveOutlined,
  } from '@ant-design/icons-vue';
  import { ControlPermissionTree } from '/@/wave/admin-shared';

  export default defineComponent({
    name: 'SettingControlPermission',
    components: {
      MedicineBoxOutlined,
      SafetyCertificateOutlined,
      CloseCircleOutlined,
      SaveOutlined,
      ControlPermissionTree,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array<string>,
        required: true,
      },
    },
    data() {
      return {
        id: '',
        /** 角色选中的权限数据-从数据库来的 */
        premissions: [] as string[],
        /** 角色选中的权限数据，提交时使用的 */
        selectedPermissions: [] as string[],
        selectedDevicePermissions: [] as string[],
        selectedSBPPermissions: [] as string[],
        selectedControlPermissions: [] as string[],
        selectedDeviceAndSBPPermissions: {} as any,
        /**  建筑权限是否发生改变*/
        isSBPPermissionChange: false,
        /**  设备权限是否发生改变*/
        isDevicePermissionChange: false,
        //
        isControlPermissionChange: false,
        isResult: false,
      };
    },
    mounted() {
      this.id = this.pageDataList[0];

      // setTimeout(() => {
      this.getPageData(this.id);
      // }, 3000); // 延迟3秒
    },
    methods: {
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      /**
       * 获取数据
       */
      getPageData(id) {
        this.id = id;
        this.loading = true;
        PanelPermissionControlService.getApiAppPanelPermissionControlForEdit({
          id: id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            this.isResult = true;
            this.selectedControlPermissions = result.controlPermissions as string[];
            this.premissions = result.getRoleForEditOutput?.grantedPermissionNames || [];
            this.selectedPermissions = this.premissions;
            this.selectedDevicePermissions = result.devicePermissions as string[];
            this.selectedSBPPermissions = result.siteBuildingFloorPermissions as string[];

            this.selectedDeviceAndSBPPermissions = {
              devicePermissions: this.selectedDevicePermissions,
              siteBuildingFloorPermissions: this.selectedSBPPermissions,
              selectedControlPermissions: this.selectedControlPermissions,
            };
          });
      },
      /**
       * 提交表单
       */
      handleSubmit(closeFlag = true) {
        var input = {} as CreateOrUpdatePanelPermissionControlInput;
        input.roleId = this.id;
        input.selectedControlPermissions = this.selectedControlPermissions;
        input.isControlPermissionChange = this.isControlPermissionChange;
        this.saving = true;
        this.loading = true;
        PanelPermissionControlService.postApiAppPanelPermissionControlOrUpdate({
          requestBody: input,
        })
          .finally(() => {
            this.saving = false;
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
      },
    },
  });
</script>

<style scoped lang="less">
  .modal-header {
    .anticon {
      margin-right: 10px;
    }
  }

  .Permissions,
  .SitePermisons {
    height: 50vh;
    overflow-y: auto;
  }

  .DeivcePermisons {
    height: 50vh;
    overflow-y: auto;
  }
  // .modal-body {
  //   overflow-y: hidden;
  //   height: calc(100vh - 200px)
  // }
</style>
