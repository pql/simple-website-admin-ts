import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { isGrantedAny } from '@/shared/permission/granted';

import { getFileUrlById } from '@/shared/components/f-upload/src/helper';
import CreateOrEditDevice from '/@/wave/device-configuration/device/create-or-edit-device/create-or-edit-device.vue';
import { Add_VIEW_DICT } from './add-views';
import { EDIT_VIEW_DICT } from './edit-views';
import CreateDevice from '/@/wave/device-configuration/device/create-device/create-device.vue';
import { AppConsts } from '@/abpPro/AppConsts';
import {
  ControlPanelTreeNodeService,
  FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest as TreeNodeLoadingRequest,
  DeviceTypeService,
} from '@/apis';
import { clone } from 'radash';

export default defineComponent({
  name: 'ControlPanelTree',
  mixins: [AppComponentBase, ModalComponentBase],
  props: {
    /** 当前为设计模式 */
    isDesign: {
      type: Boolean,
    },
    /** 只显示摄像头 */
    isCamera: {
      type: Boolean,
    },
    /**是否是MapViewer调用 */
    isMapViewer: {
      type: Boolean,
    },
    /**是否是opsPanel页面调用 */
    isOpsPanel: {
      type: Boolean,
    },
    //树状名称
    treeName: {
      type: String,
    },
  },
  emits: {
    showTable: (data) => {
      return true;
    },
    'update:activeKey': String,
    'update:isBinding': String,
    'update:bindingId': String,
    'update:bindingType': String,
    selectNodeChange: (node: any) => {
      return true;
    },
    // activeKey: String,
  },
  data() {
    return {
      treeData: [] as any[],
      NodeTreeItem: null, // 右键菜单
      // 选中的item
      activeNode: { type: '', nodeId: '', id: '', parentNodeId: '' },
      expandedKeys: [] as string[],
      selectedKeys: [] as string[],
      loadedKeys: [] as string[],
      loadData: (e) => {
        return this.innerLoadData(e);
      },
      searchValue: '',
    };
  },
  watch: {},
  mounted() {
    //初始化site数据
    this.getControlePanelTreeLoading(null, 'site', null).then((data) => {
      if (!Array.isArray(data)) {
        data = [];
      }
      this.treeData = data;
    });
  },
  methods: {
    /** 异步加载展开数据 */
    innerLoadData(treeNode) {
      // const c = this.loadedKeys;

      return new Promise((resolve) => {
        if (!treeNode) {
          resolve(null);
          return;
        }

        // 防止重复加载，可能会出现不刷新数据的问题
        if (treeNode.dataRef.children) {
          this.loadedKeys = [...this.expandedKeys]; //
          resolve(null);
          return;
        }
        //根据id作为上层数据获取子数据
        const parentId = treeNode.nodeId;

        // 加载数据
        this.getControlePanelTreeLoading(parentId, treeNode.type, treeNode.key).then((data) => {
          // if (!Array.isArray(data) || data.length === 0) {
          //   data = undefined;
          // }
          if (!Array.isArray(data)) {
            data = [];
          }
          // // 没有数据表示展开无效
          // if (data.length === 0) {
          //   treeNode.expanded = true;
          //   // this.expandedKeys = this.expandedKeys.filter((o) => o !== treeNode.key);
          // }
          // 已经加载的数据就是展开的数据
          this.loadedKeys = [...this.expandedKeys]; //

          treeNode.dataRef.children = data;
          this.treeData = [...this.treeData];
          resolve(null);
          return;
        });
      });
    },
    /**
     * 搜索
     */
    onSearch() {
      //初始化site数据
      this.getControlePanelTreeLoading(null, 'site', null).then((data) => {
        if (!Array.isArray(data)) {
          data = [];
        }
        this.treeData = data;
        this.loadedKeys = []; //
        this.selectedKeys = []; //
        this.expandedKeys = []; //
        if (this.searchValue != '') {
          for (const item of data) {
            this.unfoldSubUnit(item);
          }
        }
      });
    },
    /** 选中节点 */
    onSelect(selectedKeys, info) {
      if (info.selectedNodes.length == 0) {
        return;
      }
      this.$emit('showTable', info.selectedNodes[0]);
      this.$emit('selectNodeChange', info.node);
      this.$nextTick(() => {
        this.selectedKeys = [];
      });
      // update:selectNode
    },
    /** 从后端拉取树形结构数据 */

    getControlePanelTreeLoading(parentId: string | null, type: string, id: string | null) {
      this.loading = true;

      return new Promise<any[]>((res, rej) => {
        const request = {
          filter: this.searchValue,
          parentId: parentId,
          type: type,
          id: id,
        } as TreeNodeLoadingRequest;

        ControlPanelTreeNodeService.postApiAppControlPanelTreeNodeControlePanelTreeNodeLoading({
          requestBody: request,
        })
          .then(async (result) => {
            //遍历数据title和key
            const resultTreeData: any[] = [];
            for (const item of result) {
              // isCamera模式设备类型只显示摄像头
              if (item && this.isCamera) {
                //格式化name
                const tempDisplayName = item.nodeName?.toLowerCase().replace(' ', '');
                if (item.type === 'deviceType' && tempDisplayName?.indexOf('camera') == -1) {
                  continue;
                }
              }
              let treeItem: any = {};
              treeItem = item;
              //设备没有子数据不需要下级加载
              if (this.isMapViewer && item.type == 'floor') {
                treeItem.isLeaf = true;
              }

              if (item.isHaveSlave) {
                treeItem.isLeaf = false;
              }
              treeItem.title = item.nodeName;
              treeItem.key = item.id;
              if (item.type != 'deviceCategory') {
                treeItem.iconUrl = await getFileUrlById(item.icon);
              }

              treeItem.icon = null;
              treeItem.parent = {} as any;
              resultTreeData.push(treeItem);
            }
            res(resultTreeData);
          })
          .catch((err) => {
            rej(err);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    /** 右键点击 */
    onRightClick(e) {
      this.activeNode = e.node;
    },
    /** 刷新 */
    reload() {
      // 初始化树形数据资源
      this.expandedKeys = [];
      this.searchValue = '';
      this.selectedKeys = [];
      this.loadedKeys = [];
      this.activeNode = { type: '', nodeId: '', id: '', parentNodeId: '' };
      this.selectedKeys = [];
      this.$nextTick(() => {
        this.getControlePanelTreeLoading(null, 'site', null).then((data) => {
          if (!Array.isArray(data)) {
            data = [];
          }
          this.treeData = data;
        });
      });
    },
    /**
     * 树形控件右键菜单
     * @param key nodeId
     * @param type 节点类型
     * @param menuKey 菜单keu
     */
    onContextMenuClick(menuKey) {
      switch (menuKey) {
        case 'AddSubUnit':
          this.addSubUnit();
          break;
        case 'Delete':
          this.deleteTreeNode();
          break;
        case 'Edit':
          this.editUnit();
          break;
        case 'Build':
          this.buildAvue();
          break;
        case 'Binding':
          if (
            this.activeNode.type == 'site' ||
            this.activeNode.type == 'building' ||
            this.activeNode.type == 'floor'
          ) {
            this.$emit('update:activeKey', this.activeNode.nodeId);
          }
          this.$emit('update:isBinding', true);
          this.$emit('update:bindingId', this.activeNode.nodeId);
          this.$emit('update:bindingType', this.activeNode.type);
          break;
        //刷新
        case 'RefreshSubUnit':
          this.refreshUnit();
          break;
        //展开
        case 'UnfoldSubUnit':
          this.unfoldSubUnit(this.activeNode);
          break;
        case 'View':
          this.onViewPanel();
          break;
        default:
          break;
      }
    } /**查看panel */,
    onViewPanel() {
      this.success(this.activeNode);
    },
    /**
     * 右键展开
     */
    unfoldSubUnit(data: any) {
      const treeKey = data.nodeId;
      const type = data.type;
      this.getControlePanelTreeLoading(treeKey, type, data.id).then((resData) => {
        if (!Array.isArray(resData)) {
          resData = [];
        }

        data.children = resData;
        const dataTree: any[] = [];
        //赋值tree树数据
        this.treeData.forEach((item) => {
          item = this.setNode(item, data);
          dataTree.push(item);
        });
        this.treeData = [...dataTree];
        //添加展开数据
        this.expandedKeys.push(data.key);
        this.loadedKeys = [...this.expandedKeys]; //
        //递归子级展开

        if (data.type == 'building' && this.isMapViewer) {
          return;
        }
        //递归子级展开
        for (const children of data.children) {
          this.unfoldSubUnit(children);
        }

        return;
      });
    },
    setNode(item, data) {
      if (item.id == data.id) {
        item = data;
      } else {
        if (item.children != null) {
          const tempClidren: any[] = [];
          item.children.forEach((childrenItem) => {
            childrenItem = this.setNode(childrenItem, data);
            tempClidren.push(childrenItem);
          });
          item.children = tempClidren;
        }
      }

      return item;
    },
    /**
     * 节点刷新
     * @param isRefreshActiveNode  是否刷新当前节点
     */
    refreshUnit(isRefreshActiveNode = true) {
      const treeKey = this.activeNode.nodeId;
      const type = this.activeNode.type;
      this.getControlePanelTreeLoading(treeKey, type, this.activeNode.id).then((resData) => {
        if (!Array.isArray(resData)) {
          resData = [];
        }
        const temp = clone(this.treeData);
        let node;
        const loopFn = (data, id) => {
          if (node) {
            return;
          }
          data.some((item) => {
            if (item.nodeId === id) {
              node = clone(item.children);
              item.children = resData;
              item.isLeaf = false;
              return true;
            }
            if (item.children && item.children.length) {
              loopFn(item.children, id);
            }
          });
        };
        // 获取节点 重新赋值children
        loopFn(temp, treeKey);
        this.treeData = clone(temp);

        // 获取节点下面所有子孙节点的id
        const nodeIds = this.getNodeAndChildrenIds(node);
        // nodeIds.push(this.activeNode.id);
        const tempKeys = this.loadedKeys.filter((item) => {
          for (const nodeid of nodeIds) {
            if (item == nodeid || (item == this.activeNode.id && isRefreshActiveNode)) {
              return false;
            }
          }
          return true;
        });
        // 已经加载的数据就是展开的数据
        this.loadedKeys = [...tempKeys];
        this.expandedKeys = [...tempKeys];

        // 加载数据
        return;
      });
    },
    // 获取当前节点id下面所有子孙节点的id
    getNodeAndChildrenIds(data) {
      const temp = [] as any[];
      if (data === null || data === undefined) {
        return temp;
      }
      const loop = (data) => {
        data.map((item) => {
          temp.push(item['key']);
          if (item.children && item.children.length) {
            loop(item.children);
          }
        });
      };

      loop(data);
      return temp;
    },
    addSiteSubUnit() {
      const addViewDef = Add_VIEW_DICT[''];
      //添加site的子级building
      const params = { pageDataList: [], isDesign: this.isDesign, ...addViewDef?.props };
      if (addViewDef) {
        this.modalHelper
          .create(addViewDef.component, params, { width: addViewDef.width })
          .subscribe((res) => {
            if (res) {
              if (addViewDef.component.name == 'create-device') {
                //将基础信息传递给下一步
                const selectItems = [res];
                this.modalHelper
                  .create(CreateOrEditDevice, {
                    pageDataList: selectItems,
                    isDesign: this.isDesign,
                  })
                  .subscribe((res) => {
                    if (res) {
                      this.reload();
                    }
                  });
              } else {
                this.reload();
              }
            }
          });
      }
    },

    /**
     * 添加子单元
     */
    addSubUnit() {
      let type = this.activeNode.type;
      const key = this.activeNode.nodeId;
      if (type == null) {
        type = '';
      }
      const addViewDef = Add_VIEW_DICT[type];
      console.log(this.activeNode, 'addViewDef', addViewDef);
      let params = { ...addViewDef?.props };
      let floorId: string = '';
      let deviceTypeId: string = '';
      switch (type) {
        case 'site':
          //添加site的子级building
          params = {
            pageDataList: [],
            isDesign: true,
            parameters: {
              parentId: key,
            },
            ...params,
          };
          console.log('params', params);
          break;
        case 'building':
          //添加building的子级floor
          params = {
            pageDataList: [],
            parameters: { parentId: key },
            isDesign: true,
            ...params,
          };
          break;
        case 'floor':
          params = {
            pageDataList: [],
            parameters: { floorId: key },
            ...params,
          };
          //floor添加device
          break;
        case 'deviceType':
          //deviceType添加device
          params = {
            pageDataList: [],
            parameters: {
              deviceTypeId: key,
              floorId: this.activeNode.parentNodeId,
            },
            isDesign: true,
            ...params,
          };
          break;
        case 'deviceCategory':
          //ddeviceCategory添加device
          floorId = this.activeNode.parentIdList.split('|')[2];
          params = {
            pageDataList: [],
            parameters: {
              deviceTypeId: this.activeNode.parentNodeId,
              deviceCategoryId: key,
              floorId: floorId,
            },
            isDesign: true,
            ...params,
          };
          break;
        case 'device':
        case 'slaveDevice':
          floorId = this.activeNode.parentIdList.split('|')[2];
          deviceTypeId = this.activeNode.parentIdList.split('|')[3];
          params = {
            pageDataList: [],
            parameters: {
              floorId: floorId,
            },
            deviceTypeRole: 'Slave',
            masterDeviceId: key,
            isDesign: true,
            ...params,
          };
          break;
        default:
          params = { pageDataList: [], isDesign: true };
          break;
      }
      if (addViewDef) {
        this.modalHelper
          .create(addViewDef.component, params, { width: addViewDef.width })
          .subscribe((res) => {
            if (res) {
              if (addViewDef.component.name == 'create-device') {
                //将基础信息传递给下一步
                //获取默认类型状态
                DeviceTypeService.getApiAppDeviceTypeDeviceStatusByTypeId({
                  id: res.deviceTypeId,
                }).then((statusId) => {
                  res.deviceStatusId = statusId;
                  this.modalHelper
                    .create(
                      CreateOrEditDevice,
                      {
                        entityConfig: res,
                        pageDataList: [],
                        isDesign: this.isDesign,
                      },
                      { size: 'large' },
                    )
                    .subscribe((res) => {
                      if (res) {
                        this.refreshUnit(false);
                      }
                    });
                });
              } else {
                this.refreshUnit(false);
              }
            }
          });
      }
    },
    /**
     * 编辑
     */
    editUnit() {
      if (this.activeNode) {
        const pageDataList = [this.activeNode.nodeId];
        const editViewDef = EDIT_VIEW_DICT[this.activeNode.type];
        console.log('this.activeNode.type ', this.activeNode.type);
        this.modalHelper
          .create(editViewDef.component, {
            pageDataList: pageDataList,
            isDesign: this.isDesign,
            ...editViewDef.props,
          })
          .subscribe((res) => {
            if (res) {
              //获取父节点
              if (this.activeNode.type != 'site') {
                this.activeNode = this.getParentNode(this.activeNode.parentNodeId);
                this.refreshUnit(false);
              } else {
                this.reload();
              }
            }
          });
      }
    },
    /**
     * 构建avue
     */
    buildAvue(){
      if (this.activeNode) {
        let url = `${AppConsts.avueUrl}/build/${this.activeNode.bladeVisualId}`;
        window.open(`${url}`);
      }
    },

    /** this.
     * 删除树节点
     */
    deleteTreeNode() {
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteMultipleItemWarningMessage'),
        onOk: () => {
          this.loading = true;
          ControlPanelTreeNodeService.deleteApiAppControlPanelTreeNodeTreeNode({
            id: this.activeNode.id,
          })
            .then((res) => {
              if (res) {
                this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
                // 获取父节点并刷新
                if (this.activeNode.type !== 'site') {
                  this.activeNode = this.getParentNode(this.activeNode.parentNodeId);
                  this.refreshUnit(false);
                } else {
                  this.reload();
                }
              } else {
                this.notify.error({ message: this.l('delete fail') });
              }
            })
            .finally(() => {
              this.loading = false;
            });
        },
      });
    },
    // 获取父节点的函数
    getParentNode(id) {
      let parentNode = clone(this.activeNode);
      const temp = clone(this.treeData);
      const loopFn = (data) => {
        data.forEach((item) => {
          if (item.nodeId === id) {
            parentNode = clone(item);
          } else if (item.children && item.children.length) {
            loopFn(item.children);
          }
        });
      };

      loopFn(temp);
      return parentNode;
    },
    /**数据同步 */
    nodeDataSynchronous(hierarchy) {
      this.loading = true;
      ControlPanelTreeNodeService.postApiAppControlPanelTreeNodeNodeDataSynchronous({ hierarchy })
        .then((res) => {
          if (res) {
            if (hierarchy == 0) {
              this.nodeDataSynchronous(1);
            } else {
              this.reload();
            }
          } else {
            this.notify.error({ message: this.l('Synchronization Failure') });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
