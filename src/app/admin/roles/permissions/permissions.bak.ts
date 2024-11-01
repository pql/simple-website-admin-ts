import { defineComponent } from 'vue';
import { permissionsProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PermissionsService,
  Volo_Abp_PermissionManagement_GetPermissionListResultDto,
  Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
  Volo_Abp_PermissionManagement_PermissionGroupDto,
  Volo_Abp_PermissionManagement_UpdatePermissionDto,
} from '@/apis';
import { MenuItemType } from 'ant-design-vue/es/menu/src/interface';
import { Key } from 'ant-design-vue/es/_util/type';
import { DataNode } from 'ant-design-vue/es/tree/index';
import { UserStore } from '@/store/modules/user';

const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...permissionsProps,
  },
  data() {
    return {
      permissionResult: {} as Volo_Abp_PermissionManagement_GetPermissionListResultDto,
      /** 菜单items */
      menuData: [] as MenuItemType[],
      /** 菜单选中的Key */
      menuSelectedKeys: [] as Key[],
      /** 授予所有权限-复选框 */
      parentCheckbox: false,
      /**授予所有权限-复选框-半选中状态  */
      parentCheckboxIndeterminate: false,
      /** 全选-复选框 */
      childCheckbox: false,
      /** 全选-复选框-半选中状态 */
      childCheckboxIndeterminate: false,
      /** 树节点 数据 */
      treeData: [] as DataNode[],
      /** 树节点 被勾选的数据 */
      treeCheckedKeys: [] as string[],
      /** 树节点 选中的数据 */
      treeSelectedKeys: [] as string[],
      /** 当前 group 节点数据 */
      currentGroup: {} as Volo_Abp_PermissionManagement_PermissionGroupDto,
    };
  },
  watch: {
    'permissionResult.groups': {
      handler: function (val: Volo_Abp_PermissionManagement_PermissionGroupDto[]) {
        this.calcParentCheckboxStateByGroups(val);
      },
    },
    'currentGroup.permissions': {
      handler: function (val: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[]) {
        this.calcChildCheckboxStateByCurrentGroupPermissions(val);
      },
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
    async handleSubmit(closeFlag: boolean = true) {
      const permissions: Array<Volo_Abp_PermissionManagement_UpdatePermissionDto> = [];
      this.permissionResult.groups?.forEach((item) => {
        item.permissions?.map((perm) => {
          const permission = {
            name: perm.name,
            isGranted: perm.isGranted,
          } as Volo_Abp_PermissionManagement_UpdatePermissionDto;
          permissions.push(permission);
        });
      });

      if (permissions.length > 0) {
        this.loading = true;
        PermissionsService.putApiPermissionManagementPermissions({
          providerName: this.providerName,
          providerKey: this.pageDataList[0] as string,
          requestBody: { permissions },
        })
          .then((res) => {
            // userStore.refreshApplicationConfiguration();
          })
          .catch((error) => {
            this.message.error(this.l(error.body.error.code));
          })
          .finally(() => {
            this.message.success(this.l('Unified.texts.SavedSuccessfully'));
            this.handleSubmitAfter(closeFlag);
            this.loading = false;
          });
      } else {
        this.close();
      }
    },
    getData() {
      this.initData();
    },
    async initData() {
      this.loading = true;
      const permissionResult = await PermissionsService.getApiPermissionManagementPermissions({
        providerName: this.providerName,
        providerKey: this.pageDataList[0] as string,
      });
      this.loading = false;
      this.permissionResult = permissionResult;
      this.getMenuData(this.permissionResult.groups ?? []);
    },
    /**
     * 获取菜单数据
     * @param groups
     */
    getMenuData(groups: Array<Volo_Abp_PermissionManagement_PermissionGroupDto>) {
      const menuData: MenuItemType[] = [];
      groups.forEach((item) => {
        const permCount = item.permissions?.filter((perm) => perm.isGranted).length;
        if (item.displayNameKey || item.name) {
          const menuItem: MenuItemType = {
            key: item.displayNameKey ?? item.name ?? '',
            label: `${item.displayName}${permCount ? '(' + permCount + ')' : ''}`,
          };
          menuData.push(menuItem);
        }
      });
      this.menuData = menuData;
      this.menuSelectedKeys[0] = menuData[0].key;
      this.findCurrentGroupByKey(menuData[0].key as string);
      this.genTreeData(this.currentGroup);
      this.setTreeDataCheckedKeys(this.currentGroup);
      console.log(this.menuData);
    },
    /**
     * 生成节点数据
     */
    genTreeData(currentGroup: Volo_Abp_PermissionManagement_PermissionGroupDto) {
      const dataNode: DataNode[] = [];
      currentGroup.permissions?.forEach((item) => {
        // 各个权限源处理.
        let disabled = false;
        const u = item.grantedProviders?.find(
          (f) => f.providerName == 'U' && f.providerKey == (this.pageDataList[0] as string),
        );
        const r = item.grantedProviders?.find((f) => f.providerName == 'R');
        if (r && this.providerName == 'U') disabled = true;

        const treeNodeItem: DataNode = {
          title: item.displayName,
          key: item.name ?? item.displayName ?? '',
          checked: item.isGranted,
          children: [],
          disabled: disabled,
        };
        dataNode.push(treeNodeItem);
      });
      console.log(dataNode);
      this.treeData = dataNode;
      return dataNode;
    },
    /**
     * 设置(筛选)树节点选中的数据
     */
    setTreeDataCheckedKeys(currentGroup: Volo_Abp_PermissionManagement_PermissionGroupDto) {
      const filteredData =
        currentGroup.permissions?.filter((item) => {
          return (item.name != null || item.displayName != null) && item.isGranted;
        }) ?? [];
      const checkedKeys: string[] = filteredData.map(
        (item) => (item.name ?? item.displayName) as string,
      );
      this.treeCheckedKeys = checkedKeys;
    },
    /**
     * 通过 displayNameKey | name  查找 权限 groups 对应数据
     * @param key
     */
    findCurrentGroupByKey(key: string) {
      let currentGroup: Volo_Abp_PermissionManagement_PermissionGroupDto = {};
      this.permissionResult.groups?.filter((item) => {
        if (item.displayNameKey || item.name) {
          if (item.displayNameKey === key) {
            currentGroup = item;
          } else if (item.name === key) {
            currentGroup = item;
          }
        }
      });
      this.currentGroup = currentGroup;
      return currentGroup;
    },
    calcParentCheckboxStateByGroups(groups: Volo_Abp_PermissionManagement_PermissionGroupDto[]) {
      const grantedList: boolean[] = [];
      groups.forEach((item: Volo_Abp_PermissionManagement_PermissionGroupDto) => {
        let arr =
          item.permissions
            ?.filter(
              (f) =>
                (f.grantedProviders?.filter((f) => f.providerName == this.providerName)?.length ??
                  0) > 0,
            )
            ?.map((i) => i.isGranted) ?? [];
        if (this.providerName == 'U') {
          const notR = item.permissions?.filter(
            (f) => (f.grantedProviders?.filter((f) => f.providerName == 'R')?.length ?? 0) == 0,
          );
          arr =
            notR
              ?.filter(
                (f) =>
                  (f.grantedProviders?.filter((f) => f.providerName == this.providerName)?.length ??
                    0) > 0,
              )
              ?.map((i) => i.isGranted) ?? [];
        }
        grantedList.push(...(arr as boolean[]));
      });
      /** 授予所有权限-复选框 全选状态 */
      const parentCheckbox = grantedList.every((i) => i);
      this.parentCheckbox = parentCheckbox;
      /** 授予所有权限-复选框 部分选中状态 */
      const parentCheckboxIndeterminate = !parentCheckbox && grantedList.some((i) => i);
      this.parentCheckboxIndeterminate = parentCheckboxIndeterminate;
    },
    /**
     * 计算 全选-复选框 全选/半选/取消选择状态
     * @param permissions
     */
    calcChildCheckboxStateByCurrentGroupPermissions(
      permissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[],
    ) {
      let grantedList: boolean[] =
        permissions
          ?.filter(
            (f) =>
              (f.grantedProviders?.filter((f) => f.providerName == this.providerName)?.length ??
                0) > 0,
          )
          .map((item) => item.isGranted!) ?? [];
      if (this.providerName == 'U') {
        const notR = permissions?.filter(
          (f) => (f.grantedProviders?.filter((f) => f.providerName == 'R')?.length ?? 0) == 0,
        );
        grantedList =
          notR
            ?.filter(
              (f) =>
                (f.grantedProviders?.filter((f) => f.providerName == this.providerName)?.length ??
                  0) > 0,
            )
            .map((item) => item.isGranted!) ?? [];
      }
      /** 全选-复选框-全选状态 */
      const childCheckbox = grantedList.every((i) => i);
      this.childCheckbox = childCheckbox;
      /** 全选-复选框-部分选中状态 */
      const childCheckboxIndeterminate = !childCheckbox && grantedList.some((i) => i);
      this.childCheckboxIndeterminate = childCheckboxIndeterminate;
    },
    /**
     * 通过key 改变 当前组的 权限数据 选中状态
     * @param key
     */
    changeCurrentGroupPermissionItemDataByKey(key: string, bool: boolean) {
      this.currentGroup.permissions?.forEach((item) => {
        if (item.name === key || item.displayName === key) {
          item.isGranted = bool;
        }
      });
    },
    /**
     * 菜单项选中事件
     */
    handleMenuItemSelect({ item, key, selectedKeys }) {
      console.log('item', item);
      console.log('key', key);
      console.log('selectedKeys', selectedKeys);
      this.menuSelectedKeys = [key];
      this.findCurrentGroupByKey(key);
      this.genTreeData(this.currentGroup);
      this.setTreeDataCheckedKeys(this.currentGroup);
    },
    /**
     * 授予所有权限 全选/取消全选
     * @param bool
     */
    toggleGrantedAllCheckedState(bool: boolean) {
      this.permissionResult.groups?.forEach((item) => {
        item.permissions?.forEach((perm) => {
          if (
            !(this.providerName == 'U' && perm.grantedProviders?.find((f) => f.providerName == 'R'))
          )
            perm.isGranted = bool;
        });
      });
    },
    /**
     * 当前按钮组 全选/取消全选
     */
    toggleCurrentGroupCheckedState(bool: boolean) {
      this.currentGroup.permissions?.forEach((item) => {
        if (
          !(this.providerName == 'U' && item.grantedProviders?.find((f) => f.providerName == 'R'))
        )
          item.isGranted = bool;
      });
    },
    /**
     * 授予所有权限-复选框 change事件
     * @param e
     */
    handleParentCheckboxChange(e) {
      /** 选中状态 */
      const checked = e.target.checked;
      this.toggleGrantedAllCheckedState(checked);
      this.parentCheckbox = checked;
      this.parentCheckboxIndeterminate = false;

      this.findCurrentGroupByKey(this.menuSelectedKeys[0] as string);
      this.genTreeData(this.currentGroup);
      this.setTreeDataCheckedKeys(this.currentGroup);
      this.calcChildCheckboxStateByCurrentGroupPermissions(
        this.currentGroup.permissions as Volo_Abp_PermissionManagement_PermissionGrantInfoDto[],
      );
    },
    /**
     * 全选-复选框 change事件
     * @param e
     */
    handleChildCheckboxChange(e) {
      /** 选中状态 */
      const checked = e.target.checked;
      this.toggleCurrentGroupCheckedState(checked);
      this.childCheckbox = checked;
      this.childCheckboxIndeterminate = false;

      this.setTreeDataCheckedKeys(this.currentGroup);
      this.calcParentCheckboxStateByGroups(
        this.permissionResult.groups as Volo_Abp_PermissionManagement_PermissionGroupDto[],
      );
    },
    /**
     * 树节点选中状态改变事件
     * @param e
     */
    handleTreeCheck(checkedKeys, { checked, checkedNodes, node, event }) {
      /** 选中状态 */
      console.log('checkedKeys', checkedKeys);
      console.log('checked', checked);
      console.log('checkedNodes', checkedNodes);
      console.log('node', node.key);
      this.changeCurrentGroupPermissionItemDataByKey(node.key, checked);
      this.calcChildCheckboxStateByCurrentGroupPermissions(
        this.currentGroup.permissions as Volo_Abp_PermissionManagement_PermissionGrantInfoDto[],
      );
      this.calcParentCheckboxStateByGroups(
        this.permissionResult.groups as Volo_Abp_PermissionManagement_PermissionGroupDto[],
      );
    },
  },
});
