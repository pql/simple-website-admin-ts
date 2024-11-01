import { filter, forEach } from '@/utils/helper/treeHelper';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import SelectCardTable from './select-card-table/select-card-table.vue';
import SelectDeviceAccessGroupTable from './select-device-access-group-table/select-device-access-group-table.vue';
import {
  PacsCardHolderService,
  PacsCardService,
  PacsDeviceAccessGroupService,
  FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto,
} from '@/apis';

const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase],
  props: {
    pacsCardHolderId: {
      type: String,
      required: true,
    },
    cardListDto: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    const cardList: any = [];
    const groupList: any = [];
    const idList: any = ([] = this.cardListDto.map((m) => {
      return m.cardId;
    }));

    return {
      id: this.pacsCardHolderId,
      selectedIdList: idList,
      cardList,
      cardLists: this.cardListDto,
      cardColumns: [
        {
          title: this.l('Unified.texts.CardNumber'),
          dataIndex: 'cardNumber',
          key: 'cardNumber',
        },
        {
          title: this.l('Unified.texts.CardStatus'),
          dataIndex: 'cardStatus',
          key: 'cardStatus',
        },
        {
          title: this.l('Unified.texts.StartDateTime'),
          dataIndex: 'startDateTime',
          key: 'startDateTime',
        },
        {
          title: this.l('Unified.texts.EndDateTime'),
          dataIndex: 'endDateTime',
          key: 'endDateTime',
        },
      ],
      groupList,
      groupColumns: [
        {
          title: this.l('Unified.texts.DeviceAccessGroup'),
          dataIndex: 'accessGroupName',
          key: 'accessGroupName',
        },
        {
          title: this.l('Unified.texts.StartDateTime'),
          dataIndex: 'startDateTime',
          key: 'startDateTime',
        },
        {
          title: this.l('Unified.texts.EndDateTime'),
          dataIndex: 'endDateTime',
          key: 'endDateTime',
        },
      ],
      card: {
        selectedRowKeys: [],
        selectedRows: [] as any[],
        clickItem: {} as any,
      },

      group: {
        selectedRowKeys: [],
        selectedRows: [] as any[],
      },
    };
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
    rowSelection() {
      return {
        selectedRowKeys: this.card.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.card.selectedRowKeys = selectedRowKeys;
          this.card.selectedRows = selectedRows;
        },
      };
    },
    rowSelectionGroup() {
      return {
        selectedRowKeys: this.group.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.group.selectedRowKeys = selectedRowKeys;
          this.group.selectedRows = selectedRows;
        },
      };
    },
  },
  watch: {
    pacsCardHolderId(val: string) {
      this.id = val;
      this.fetchDataList();
    },
  },
  mounted() {
    this.getCardPageData();
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
    customRow(record, index) {
      return {
        onClick: (event) => {
          this.card.clickItem = record;
          if (!this.card.clickItem.deviceAccessGroup) this.card.clickItem.deviceAccessGroup = [];
          this.groupList = this.getNowGroupList(this.card.clickItem.id);
        },
      };
    },
    fetchDataList() {
      // const queryFilter = (this.$refs.table as any).getSearchProps();
      // return PacsCardService.getApiAppPacsCardPaged(queryFilter);
    },
    groupHandleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.SELECT:
          this.selectGroup();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.groupBatchDelete();
          break;
        default:
          break;
      }
    },
    getCardPageData() {
      if (this.selectedIdList == null || this.selectedIdList.length == 0) return;
      this.loading = true;
      PacsCardService.postApiAppPacsCardIdlist({ requestBody: { idList: this.selectedIdList } })
        .then((res) => {
          this.cardList = res.items;
          this.cardListChange();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // getGroupPageData() {
    //   if (this.selectedGroupIdList == null || this.selectedGroupIdList.length == 0) return;
    //   this.loading = true;
    //   PacsDeviceAccessGroupService.postApiAppPacsDeviceAccessGroupByIdList({ requestBody: { idList: this.selectedIdList } })
    //     .then((res) => {
    //       this.groupList = res.items;
    //       this.cardListChange();
    //     })
    //     .catch((err) => {
    //       this.notify.error({ message: this.l(err.body.error.code) });
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    getNowGroupList(cardId) {
      let datas = this.cardLists.find((f) => {
        return f.cardId == cardId;
      })?.deviceAccessGroup;
      return datas;
    },
    getSelectedGroupIdList() {
      let datas = this.getNowGroupList(this.card.clickItem.id)?.map((m) => {
        return m.pacsDeviceAccessGroupId;
      });
      return datas;
    },
    setSelectedGroupList(itemList?) {
      if (!this.groupList) this.groupList = [];
      if (itemList) {
        // 没有的删除，
        // this.groupList.forEach((item: any) => {
        //   const index = itemList.findIndex(
        //     (u) => u.pacsDeviceAccessGroupId == item.pacsDeviceAccessGroupId,
        //   );
        //   if (index == -1) {
        //     this.groupList.splice(index, 1);
        //   }
        // });

        // 有的不变，新增的添加
        itemList.forEach((item: any) => {
          const index = this.groupList.findIndex(
            (u) => u.pacsDeviceAccessGroupId == item.pacsDeviceAccessGroupId,
          );
          if ((index == -1 || !index) && index != 0) {
            this.groupList.push(item);
          }
        });
      } else {
        this.groupList = [];
      }

      this.groupListChange();
    },
    cardListChange() {
      let idList = this.cardList.map((m) => {
        return m.id;
      });
      this.selectedIdList = idList;

      this.cardList.forEach((item: any) => {
        const index = this.cardLists.findIndex((u) => u.cardId == item.id);
        if (index == -1) {
          this.cardLists.push({
            cardId: item.id,
            deviceAccessGroup: item.deviceAccessGroup,
          });
        }
      });

      this.$emit('update:cardLists', this.cardLists);
    },
    groupListChange() {
      this.cardLists.forEach((item: any) => {
        if (this.card.clickItem.id == item.cardId) {
          item.deviceAccessGroup = this.groupList;
        }
      });
    },
    selectCards() {
      this.card.selectedRowKeys = [];
      const param = {
        pacsCardHolderId: this.id,
        selectedCardIdList: this.selectedIdList,
        _types: '',
        _titleName: 'Unified.texts.SelectCard',
      };

      if (!param.selectedCardIdList || param.selectedCardIdList.length == 0) {
        param.selectedCardIdList = ['00000000-0000-0000-0000-000000000000']
      }

      this.modalHelper.create(SelectCardTable, { ...param }, { size: 'large' }).subscribe((res) => {
        if (res) {
          // 相同的不变，没有的新增
          res.list.forEach((item: any) => {
            const index = this.cardList.findIndex((u) => u.id == item.id);
            if (index == -1) {
              if (!this.cardList) this.cardList = [];
              // 复制设备策略
              let deviceAccessGroup = this.getNowGroupList(res.copyCardId);
              if (res.copyCardId && deviceAccessGroup) {
                item.deviceAccessGroup = JSON.parse(JSON.stringify(deviceAccessGroup));
                item.deviceAccessGroup.forEach(item => {
                  item.id = null;
                });
              }

              this.cardList.push(item);
            }
          });

          this.selectedIdList = this.cardList.map((m) => { return m.id; });
          this.cardListChange();
        }
      });
    },
    selectGroup() {
      this.group.selectedRowKeys = [];
      const param = {
        pacsCardHolderId: this.id,
        selectedGroupIdList: this.getSelectedGroupIdList(),
        _types: '',
        _titleName: 'Unified.texts.SelectGroup',
      };
      this.modalHelper.create(SelectDeviceAccessGroupTable, { ...param }, { size: 'large' }).subscribe((res) => {
        if (res) {
          this.setSelectedGroupList(res);
        }
      });
    },
    cardBatchDelete() {
      if (this.card.selectedRowKeys.length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }

      const ids = this.card.selectedRowKeys;
      ids.forEach((item: any) => {
        let index = this.cardList.findIndex((u) => u.id == item);
        let find = this.cardList.find((u) => u.id == item);
        if (index >= 0) {
          this.cardList.splice(index, 1);
          if (find.id == this.card.clickItem?.id) {
            this.card.clickItem = [];
            this.groupList = [];
          }
          index = this.cardLists.findIndex((u) => u.cardId == item);
          this.cardLists.splice(index, 1);
        }
      });

      this.cardListChange();
    },
    groupBatchDelete() {
      if (this.group.selectedRowKeys.length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      const ids = this.group.selectedRowKeys;
      ids.forEach((item: any) => {
        const index = this.groupList.findIndex((u) => u.pacsDeviceAccessGroupId == item);
        if (index >= 0) {
          this.groupList.splice(index, 1);
        }
      });

      this.groupListChange();
    },
  },
});
