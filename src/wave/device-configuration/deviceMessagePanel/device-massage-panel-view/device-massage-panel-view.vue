<template>
  <div>
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.DeviceMessagePanelDetail') }}
      </div>
    </div>
    <div class="modal-body">
      <page-header-wrapper class="modal_content h-[600px] flex flex-col overflow-auto">
        <a-collapse v-model:activeKey="activeKey">
          <!-- 基本信息 -->
          <a-collapse-panel
            :header="l('Unified.texts.BasicInfomation')"
            :defaultActive="defaultActive"
          >
            <a-descriptions layout="vertical">
              <!-- 类型 -->
              <a-descriptions-item :label="l('Unified.texts.MessagePanelType')">
                <span v-if="!!entity.requestMesssageId"> Command Response </span>
                <span
                  v-else-if="
                    !!entity.deviceTypeFunctionId &&
                    entity.deviceTypeFunctionId != '00000000-0000-0000-0000-000000000000'
                  "
                >
                  {{ l('Unified.texts.CommandRequest') }}
                </span>
                <span v-else>{{ l('Unified.texts.ReportData') }}</span>
              </a-descriptions-item>

              <!-- 事件Id -->
              <a-descriptions-item :label="l('Unified.texts.VendorEventId')">
                {{ entity.vendorEventId || '--' }}
              </a-descriptions-item>

              <!-- 响应结果 -->
              <a-descriptions-item
                v-if="!!entity.requestMesssageId"
                :label="l('Unified.texts.CommandResponseResult')"
              >
                {{ entity.responseResult || '--' }}
              </a-descriptions-item>
              <a-descriptions-item v-else :label="l('Unified.texts.ResponseResult')">
                <span v-if="responseResultViewRender !== 'string'">
                  <a-button type="primary" @click="showResponseResultView()">
                    {{ l('Unified.texts.ResponseResultView') }}
                  </a-button>
                </span>
                <span v-else>
                  {{ entity.responseResult || '--' }}
                </span>
              </a-descriptions-item>

              <!-- 响应状态 -->
              <a-descriptions-item
                :label="l('Unified.texts.CommandResponseStatus')"
                v-if="!!entity.requestMesssageId"
              >
                <a class="isAlert">
                  <Icon
                    v-if="entity.isSuccessful"
                    icon="icon-f-Success"
                    :size="19"
                    class="text-[#3DCF36]"
                  />
                  <Icon
                    v-if="!entity.isSuccessful"
                    icon="icon-f-Wrong"
                    :size="19"
                    class="text-[#EE3131]"
                  />
                </a>
              </a-descriptions-item>

              <!-- 请求信息 -->
              <!-- <a-descriptions-item
            label="Command Request Message Panel"
            v-if="!!entity.requestMesssageId"
          >
            <a-button @click="showMessagePanelRequest()">View</a-button>
          </a-descriptions-item> -->

              <!-- 人脸信息 -->
              <a-descriptions-item
                :label="l('Unified.texts.FaceData')"
                v-if="entity.faceData && entity.faceData != ''"
              >
                <img
                  style="max-width: 90px; max-height: 120px"
                  :src="'data:image/jpeg;base64,' + entity.faceData"
                />
              </a-descriptions-item>

              <!-- user info -->
              <!-- user -->
              <a-descriptions-item
                :label="l('Unified.texts.UserName')"
                v-if="pacsUserViewInfo && pacsUserViewInfo.userId"
              >
                <span>{{ pacsUserViewInfo.userName ?? '--' }}</span>
              </a-descriptions-item>
              <a-descriptions-item
                :label="l('Unified.texts.Name')"
                v-if="pacsUserViewInfo && pacsUserViewInfo.userId"
              >
                <span>{{ pacsUserViewInfo.userRealName ?? '--' }}</span>
              </a-descriptions-item>

              <!-- pacs user -->
              <a-descriptions-item
                :label="l('Unified.texts.FirstName')"
                v-if="pacsUserViewInfo && pacsUserViewInfo.pacsUserId"
              >
                {{ pacsUserViewInfo.firstName || '--' }}
              </a-descriptions-item>
              <a-descriptions-item
                :label="l('Unified.texts.LastName')"
                v-if="pacsUserViewInfo && pacsUserViewInfo.pacsUserId"
              >
                {{ pacsUserViewInfo.lastName || '--' }}
              </a-descriptions-item>
              <a-descriptions-item
                :label="l('Unified.texts.CardHolderNumber')"
                v-if="pacsUserViewInfo && pacsUserViewInfo.pacsUserId"
              >
                {{ pacsUserViewInfo.cardHolderNumber || '--' }}
              </a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <!--  -->
          <a-collapse-panel :header="DeviceType">
            <a-descriptions layout="vertical">
              <a-descriptions-item layout="layout" :label="l('Unified.texts.DeviceTypeName')">{{
                entity.deviceTypeName || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="Device">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.DeviceName')">{{
                entity.deviceName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceVendorSystemId')">{{
                entity.deviceVendorSystemId || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceHostNameOrIp')">{{
                entity.deviceHostNameOrIp || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceHostPort')">{{
                entity.deviceHostPort || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceHostWebAddress')">{{
                entity.deviceHostWebAddress || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceSlaveId')">{{
                entity.deviceSlaveId || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceMacAddress')">{{
                entity.deviceMacAddress || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceModel')">{{
                entity.deviceModel || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="DeviceStatus">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.Table:StatusName')">{{
                entity.statusName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.StatusIconFont')">
                <img
                  v-if="entity.statusIconFont"
                  :src="entity.statusIconFont"
                  style="min-width: 45px; max-width: 45px"
                />
                <span v-else>--</span>
              </a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Table:StatusCode')">{{
                entity.statusCode || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.VendorStatusCode')">{{
                entity.vendorStatusCode || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.IsAlert')">{{
                entity.isAlert ? l('Unified.texts.Yes') : l('Unified.texts.No')
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Table:MessageBackgroundColorCode')">
                <input
                  type="color"
                  v-model="entity.messageBackgroundColorCode"
                  style="height: 32px"
                  disabled
                />
              </a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Table:RequireAlertAcknowledgement')">{{
                entity.requireAlertAcknowledgement || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="DeviceTypeFunction">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.Table:MessagePriority')">{{
                entity.messagePriority || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.DeviceFunction')">{{
                entity.deviceFunction || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="InterfaceService">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.ServiceName')">{{
                entity.serviceName || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="SiteBuildingFloor">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.Brand')">{{
                entity.brandName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Site')">{{
                entity.siteName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Building')">{{
                entity.buildingName || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Floor')">{{
                entity.floor || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
          <a-collapse-panel :header="Architecture">
            <a-descriptions layout="vertical">
              <a-descriptions-item :label="l('Unified.texts.AcknowledgedComment')">{{
                entity.acknowledgedComment || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.AcknowledgedDateTime')">
                <!-- {{ formateDatetime(entity.acknowledgedDateTime)||'--' }} -->
                {{ entity.acknowledgedDateTime || '--' }}
              </a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.AcknowledgedBy')">{{
                entity.acknowledgedBy || '--'
              }}</a-descriptions-item>
              <a-descriptions-item :label="l('Unified.texts.Details')">{{
                entity.details || '--'
              }}</a-descriptions-item>
            </a-descriptions>
          </a-collapse-panel>
        </a-collapse>
      </page-header-wrapper>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    // DeviceMessagePanelListDto,
    // DeviceMessagePanelServiceProxy,
    // PacsUserServiceProxy,
    // PacsUserViewInfo
    FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto as DeviceMessagePanelListDto,
    DeviceMessagePanelService,
    PacsCardHolderService,
    FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsUserViewInfo as PacsUserViewInfo,
  } from '/@/apis';
  // import CollapseItem from '/@/ams/component/collapse-item/collapse-item.vue';
  import { useTimezone } from '@/timezones/useTimezone';

  const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();

  function getComponent() {
    return deviceMessagePanelView;
  }

  const deviceMessagePanelView = defineComponent({
    name: 'CreateOrEditDeviceMessagePanel',
    components: {
      // CollapseItem
    },
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
        entity: {} as DeviceMessagePanelListDto,
        activeKey: [],
        defaultActive: true,
        DeviceType: this.l('Unified.texts.Table:DeviceType'),
        Device: this.l('Unified.texts.Device'),
        DeviceStatus: this.l('Unified.texts.DeviceStatus'),
        DeviceTypeFunction: this.l('Unified.texts.DeviceTypeFunction2'),
        InterfaceService: this.l('Unified.texts.Table:InterfaceService'),
        SiteBuildingFloor: this.l('Unified.texts.Site:Building:Floor'),
        Architecture: this.l('Unified.texts.Acknowledgement'),
        responseResultViewRender: 'string',
        responseResultObj: null as any,
        pacsUserViewInfo: {} as PacsUserViewInfo,
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
        DeviceMessagePanelService.getApiAppDeviceMessagePanelById({
          id: id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            if (result.statusIconFont) {
              // result.statusIconFont = UrlHelper.getFileUrlById(result.statusIconFont)
            }

            this.entity = result;
            if (!!result.responseResult && result.responseResult.includes('"RenderType"')) {
              this.responseResultObj = JSON.parse(result.responseResult);
              this.responseResultViewRender = this.responseResultObj.RenderType;
            }

            this.loadUserInfo();
          });
      },
      loadUserInfo() {
        if (!this.entity.creatorId || this.entity.creatorId === '') {
          return;
        }
        PacsCardHolderService.getApiAppPacsCardHolderPacsUserViewInfo({
          userId: this.entity.creatorId,
        }).then((res) => {
          if (!!res.userId || !!res.pacsUserId) {
            this.pacsUserViewInfo = res;
          }
        });
      },
      showMessagePanelRequest() {
        const component = getComponent();
        this.modalHelper
          .create(component, { pageDataList: [this.entity.requestMesssageId] }, { width: 1300 })
          .subscribe((res) => {});
      },
      showResponseResultView() {
        // const renderView=ResponseResultConfig[this.responseResultViewRender];
        // if(!renderView){
        //   return;
        // }
        // this.modalHelper.create(
        //   renderView,
        //   {
        //     responseResult:this.responseResultObj
        //   },
        //   {
        //     width:1300
        //   }
        // )
        // .subscribe((res) => {
        // });
      },
      formateDatetime(dateTimeString) {
        // 判断字符串是否包含多余的引号
        const hasExtraQuotes = /^"(\\".*\\"|.*)"$/.test(dateTimeString);
        if (hasExtraQuotes) {
          // 去掉前后双引号和转义的双引号
          dateTimeString = dateTimeString.replace(/^"|"$/g, '').replace(/\\"/g, '"');
        }
        return formateDateToDatetime(dateTimeString);
      },
    },
  });

  export default deviceMessagePanelView;
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions-item) {
    padding-bottom: 4px;
  }

  :deep(.ant-descriptions-item-label) {
    color: #999;
    font-family: 'Source Han Sans CN';
    font-size: 13px;
    font-weight: 400;
  }

  // html[data-theme='dark'] {
  //   .modal-header {
  //     background: #21242A;

  //   }

  //   .modal_content {
  //     background: #21242A;
  //     height: 100%;

  //     :deep(.ant-card-body) {
  //       background: #21242A !important;
  //     }
  //   }
  // }
</style>
