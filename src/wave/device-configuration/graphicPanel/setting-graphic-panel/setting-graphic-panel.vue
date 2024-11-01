<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.SettingGraphicPanel') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <floor-plan
        :graphicStoragePath="graphicStoragePath"
        :graphicPanelId="graphicPanelId"
        :showExplorer="true"
        :showContextMenu="true"
        :showToolbar="false"
        :setHideObjectIds="setHideObjectIds"
        ref="floorPlan"
      />
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
    // GraphicPanelServiceProxy,
    // SetFloorPlanHideObjectIdInput
    GraphicPanelService,
    FireBytes_Unified_Wave_GraphicPanels_Dtos_SetFloorPlanHideObjectIdInput as SetFloorPlanHideObjectIdInput,
  } from '/@/apis';
  import { defineComponent } from 'vue';
  import { FloorPlan } from '/@/wave/component';

  export default defineComponent({
    name: 'CreateOrEditGraphicPanel',
    components: {
      FloorPlan,
    },
    mixins: [ModalComponentBase],
    props: {
      graphicStoragePath: {
        type: String,
      },
      graphicPanelId: {
        type: String,
      },
    },
    data() {
      return {
        setHideObjectIds: [],
      };
    },
    computed: {},
    mounted() {
      this.getPageData();
    },
    methods: {
      /**
       * 获取数据
       */
      getPageData() {},
      handleSubmit(closeFlag = true) {
        //设置隐藏的场景id集合
        this.loading = true;
        const pam = {} as SetFloorPlanHideObjectIdInput;
        pam.hideObjectIds = (this.$refs.floorPlan as any).getHideObjectIds();
        pam.id = this.graphicPanelId;
        console.log('pam', pam);
        GraphicPanelService.postApiAppGraphicPanelSetFloorPlanHideObjectId({
          requestBody: pam,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((res) => {
            if (res) {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
              this.success();
            }
          });
        //    this.success();
      },
    },
  });
</script>
<style lang="less">
  .xeokit-tree-panel {
    overflow-x: auto !important;
  }

  // ::-webkit-scrollbar {
  // 	display: none
  // }
</style>
