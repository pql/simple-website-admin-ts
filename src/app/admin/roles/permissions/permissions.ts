// https://github.com/abpframework/abp/blob/dev/npm/ng-packs/packages/permission-management/src/lib/components/permission-management.component.ts
import { defineComponent } from 'vue';
import { permissionsProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PermissionsService,
  Volo_Abp_PermissionManagement_GetPermissionListResultDto,
  Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
  Volo_Abp_PermissionManagement_PermissionGroupDto,
  Volo_Abp_PermissionManagement_ProviderInfoDto,
  Volo_Abp_PermissionManagement_UpdatePermissionDto,
} from '@/apis';
import { MenuItemType } from 'ant-design-vue/es/menu/src/interface';
import { Key } from 'ant-design-vue/es/_util/type';
import { UserStore } from '@/store/modules/user';
import { initAbpConfigStore } from '@/logics/initAppConfig';
import { usePermission } from '@/hooks/web/usePermission';
const { refreshMenuMax } = usePermission();

type PermissionWithStyle = Volo_Abp_PermissionManagement_PermissionGrantInfoDto & {
  style: string;
};

type PermissionWithGroupName = Volo_Abp_PermissionManagement_PermissionGrantInfoDto & {
  groupName: string;
};

function findParentPermissions(
  permissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[],
  permission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
): Volo_Abp_PermissionManagement_PermissionGrantInfoDto[] {
  const permissionMap = new Map(permissions.map((p) => [p.name, p]));
  let currentPermission = permissionMap.get(permission.name) ?? null;
  const parentPermissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[] = [];

  while (currentPermission && currentPermission.parentName) {
    const parentPermission = permissionMap.get(currentPermission.parentName);
    if (!parentPermission) {
      break;
    }
    parentPermissions.push(parentPermission);
    currentPermission = parentPermission;
  }

  return parentPermissions;
}

function findMargin(
  permissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[],
  permission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
): number {
  const parentPermission = permissions.find((per) => per.name === permission.parentName);

  if (parentPermission && parentPermission.parentName) {
    let margin = 20;
    return (margin += findMargin(permissions, parentPermission));
  }

  return parentPermission ? 20 : 0;
}

function getPermissions(
  groups: Volo_Abp_PermissionManagement_PermissionGroupDto[],
): PermissionWithGroupName[] {
  return groups.reduce(
    (acc, val) => [
      ...acc,
      ...val!.permissions!.map<PermissionWithGroupName>((p) => ({
        ...p,
        groupName: val.name || '',
      })),
    ],
    [] as PermissionWithGroupName[],
  );
}

const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...permissionsProps,
  },
  data() {
    return {
      permissionsData: {
        groups: [],
        entityDisplayName: '',
      } as Volo_Abp_PermissionManagement_GetPermissionListResultDto,
      permissions: [] as PermissionWithGroupName[],
      selectedGroup: {} as Volo_Abp_PermissionManagement_PermissionGroupDto,
      selectedGroupPermissions: [] as PermissionWithStyle[],
      selectThisTab: false,
      selectThisTabIndeterminate: false,
      selectAllTab: false,
      selectAllTabIndeterminate: false,
      disableSelectAllTab: false,
      disabledSelectAllInAllTabs: false,

      /** 菜单items */
      menuData: [] as MenuItemType[],
      /** 菜单选中的Key */
      menuSelectedKeys: [] as Key[],
    };
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
      const unchangedPermissions = getPermissions(this.permissionsData.groups!);

      const changedPermissions: Volo_Abp_PermissionManagement_UpdatePermissionDto[] =
        this.permissions
          .filter((per) =>
            (unchangedPermissions.find((unchanged) => unchanged.name === per.name) || {})
              .isGranted === per.isGranted
              ? false
              : true,
          )
          .map(({ name, isGranted }) => ({ name, isGranted }));

      if (changedPermissions.length > 0) {
        this.loading = true;
        PermissionsService.putApiPermissionManagementPermissions({
          providerName: this.providerName,
          providerKey: this.pageDataList[0] as string,
          requestBody: { permissions: changedPermissions },
        })
          .then((res) => {
            initAbpConfigStore().then(()=>{
              refreshMenuMax();
            });
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
      const providerName = this.providerName;
      const providerKey = this.pageDataList[0] as string;

      if (!providerKey || !providerName) {
        throw new Error('Provider Key and Provider Name are required.');
      }
      const permissionsData = await PermissionsService.getApiPermissionManagementPermissions({
        providerName: providerName,
        providerKey: providerKey,
      });
      this.loading = false;
      this.permissionsData = permissionsData;
      this.permissions = getPermissions(permissionsData.groups!);
      this.setSelectedGroup(permissionsData!.groups![0]);
      this.disabledSelectAllInAllTabs = this.permissions.every(
        (per) =>
          per.isGranted &&
          per.grantedProviders?.every((provider) => provider.providerName !== this.providerName),
      );
      this.getMenuData(permissionsData.groups! ?? []);
    },
    getChecked(name: string) {
      return (this.permissions.find((per) => per.name === name) || { isGranted: false }).isGranted;
    },

    setSelectedGroup(group: Volo_Abp_PermissionManagement_PermissionGroupDto) {
      this.selectedGroup = group;
      if (!this.selectedGroup) {
        this.selectedGroupPermissions = [];
        return;
      }

      const margin = `margin-${document.body.dir === 'rtl' ? 'right' : 'left'}`;

      const permissions =
        (this.permissionsData.groups?.find((group) => group.name === this.selectedGroup.name) || {})
          .permissions || [];
      this.selectedGroupPermissions = permissions.map(
        (permission) =>
          ({
            ...permission,
            style: { [margin]: findMargin(permissions, permission) + 'px' },
            isGranted: (this.permissions.find((per) => per.name === permission.name) || {})
              .isGranted,
          }) as unknown as PermissionWithStyle,
      );
    },
    initModal() {
      // TODO: Refactor
      setTimeout(() => {
        this.setDisabled(this.selectedGroup?.permissions || []);
        this.setTabCheckboxState();
        this.setGrantCheckboxState();
      });
    },
    getAssignedCount(groupName: string) {
      return this.permissions.reduce(
        (acc, val) => (val.groupName === groupName && val.isGranted ? acc + 1 : acc),
        0,
      );
    },
    /**
     * 获取菜单数据
     * @param groups
     */
    getMenuData(groups: Volo_Abp_PermissionManagement_PermissionGroupDto[]) {
      const menuData: MenuItemType[] = [];
      groups.forEach((group) => {
        const count = { assignedCount: this.getAssignedCount(group.name!) };
        const menuItem = {
          key: group.displayName!,
          label: `${group?.displayName}${count.assignedCount > 0 ? '(' + count.assignedCount + ')' : ''}`,
          dto: group,
        };
        menuData.push(menuItem);
      });
      this.menuData = menuData;
      this.menuSelectedKeys[0] = menuData[0].key;
      this.initModal();
    },
    onChangeGroup({ item: { dto: group } }) {
      this.setDisabled(group!.permissions!);
      this.setSelectedGroup(group!);
      this.setTabCheckboxState();
    },
    updateSelectedGroupPermissions(
      clickedPermissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
    ) {
      this.selectedGroupPermissions = this.selectedGroupPermissions.map((per) => {
        if (per.name === clickedPermissions.name) {
          per.isGranted = !per.isGranted;
        }
        return per;
      });
    },
    setTabCheckboxState() {
      const selectablePermissions = this.permissions.filter((per) =>
        per.grantedProviders?.every((p) => p.providerName === this.providerName),
      );
      const selectedPermissions = selectablePermissions.filter((per) => per.isGranted);

      console.log('selectedPermissions.length', selectedPermissions.length);
      console.log('selectablePermissions.length', selectablePermissions.length);

      if (selectedPermissions.length === selectablePermissions.length) {
        this.selectThisTabIndeterminate = false;
        this.selectThisTab = true;
      } else if (selectedPermissions.length === 0) {
        this.selectThisTabIndeterminate = false;
        this.selectThisTab = false;
      } else {
        this.selectThisTabIndeterminate = true;
        this.selectThisTab = false;
      }
    },
    setGrantCheckboxState() {
      const selectablePermissions = this.permissions.filter((per) =>
        per.grantedProviders?.every((p) => p.providerName === this.providerName),
      );
      const selectedAllPermissions = selectablePermissions.filter((per) => per.isGranted);

      if (selectedAllPermissions.length === selectablePermissions.length) {
        this.selectAllTabIndeterminate = false;
        this.selectAllTab = true;
      } else if (selectedAllPermissions.length === 0) {
        this.selectAllTabIndeterminate = false;
        this.selectAllTab = false;
      } else {
        this.selectAllTabIndeterminate = true;
        this.selectAllTab = false;
      }
    },
    setDisabled(permissions: Volo_Abp_PermissionManagement_PermissionGrantInfoDto[]) {
      if (permissions.length) {
        this.disableSelectAllTab = permissions.every(
          (permission) =>
            permission.isGranted &&
            permission.grantedProviders?.every((p) => p.providerName !== this.providerName),
        );
      } else {
        this.disableSelectAllTab = false;
      }
    },
    onClickCheckbox(e, clickedPermission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto) {
      // const checked = e.target.checked;
      // console.log('checked:', checked);
      // clickedPermission.isGranted = checked;
      // console.log('clickedPermission', clickedPermission);

      const { isGranted, grantedProviders } = clickedPermission;

      if (isGranted && this.isGrantedByOtherProviderName(grantedProviders!)) {
        return;
      }

      this.setSelectedGroup(this.selectedGroup);
      setTimeout(() => {
        this.updatePermissionStatus(clickedPermission);
        this.updateSelectedGroupPermissions(clickedPermission);
        this.setParentClicked(clickedPermission);
        this.setTabCheckboxState();
        this.setGrantCheckboxState();
      }, 0);
    },
    updatePermissionStatus(
      clickedPermission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto,
    ) {
      this.permissions = this.permissions.map((permission) => {
        const isExactMatch = clickedPermission.name == permission.name;
        const isParentOfPermission = clickedPermission.parentName === permission.name;
        const isChildOfPermission = clickedPermission.name === permission.parentName;

        if (isExactMatch) {
          return { ...permission, isGranted: !permission.isGranted };
        }

        if (isChildOfPermission && permission.isGranted) {
          return { ...permission, isGranted: false };
        }

        if (isParentOfPermission && !permission.isGranted) {
          return { ...permission, isGranted: true };
        }

        return permission;
      });
    },
    setParentClicked(clickedPermission: Volo_Abp_PermissionManagement_PermissionGrantInfoDto) {
      if (clickedPermission.parentName) {
        const parentPermissions = findParentPermissions(this.permissions, clickedPermission);
        if (parentPermissions.length > 0) {
          const parentNames = new Set(parentPermissions.map((parent) => parent.name));

          this.permissions = this.permissions.map((per) => {
            let updatedIsGranted = per.isGranted;

            if (per.parentName === clickedPermission.name && !clickedPermission.isGranted) {
              updatedIsGranted = false;
            }

            if (parentNames.has(per.name)) {
              updatedIsGranted = true;
            }

            return { ...per, isGranted: updatedIsGranted };
          });
        }
        return;
      }

      this.permissions = this.permissions.map((per) => {
        const parents = findParentPermissions(this.permissions, per);
        if (parents.length > 0) {
          const rootParent = parents[parents.length - 1];

          if (rootParent.name === clickedPermission.name && !rootParent.isGranted) {
            return { ...per, isGranted: false };
          }
        }
        return per;
      });
    },
    findGroup(menuKey: string): Volo_Abp_PermissionManagement_PermissionGroupDto | undefined {
      const group = this.permissionsData.groups?.find((group) => group.displayName === menuKey);
      return group;
    },
    onClickSelectThisTab(e) {
      this.selectedGroupPermissions.forEach((permission) => {
        if (
          permission.isGranted &&
          this.isGrantedByOtherProviderName(permission.grantedProviders!)
        ) {
          return;
        }

        const index = this.permissions.findIndex((per) => per.name === permission.name);

        this.permissions = [
          ...this.permissions.slice(0, index),
          { ...this.permissions[index], isGranted: this.selectThisTab },
          ...this.permissions.slice(index + 1),
        ];
      });
      this.setGrantCheckboxState();
    },
    onClickSelectAll() {
      this.permissions = this.permissions.map((permission) => ({
        ...permission,
        isGranted:
          this.isGrantedByOtherProviderName(permission.grantedProviders!) || this.selectAllTab,
      }));
      if (!this.disableSelectAllTab) {
        this.selectThisTab = !this.selectAllTab;
        this.setTabCheckboxState();
      }

      this.onChangeGroup({
        item: {
          dto: this.selectedGroup,
        },
      });
    },
    isGrantedByOtherProviderName(
      grantedProviders: Volo_Abp_PermissionManagement_ProviderInfoDto[],
    ): boolean {
      if (grantedProviders.length) {
        return grantedProviders.findIndex((p) => p.providerName !== this.providerName) > -1;
      }
      return false;
    },
  },
});
