import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { userDetailsProps } from './props';
import { UserService, CustomUserService } from '@/apis';
import { FOrganizationUnitTree } from '@/app/admin-shared';
import { useTimezone } from '@/timezones/useTimezone';

const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();

export default defineComponent({
  components: { FOrganizationUnitTree },
  mixins: [ModalComponentBase],
  props: {
    ...userDetailsProps,
  },
  data() {
    return {
      id: null,
      selectedUnit: [] as any,
      dataList: [] as any,
      dataConventionList: [] as any,
      organizationData: {
        allOrganizationUnits: new Array<any>(),
        memberedOrganizationUnits: new Array<any>(),
        isSearch: false,
        isDisabled: true,
      },
      columns: [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'value',
          dataIndex: 'value',
          key: 'value',
        },
      ],
    };
  },
  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    initData() {
      this.featchDataList();
      this.init();
    },
    async featchDataList() {
      if (this.id != null) {
        try {
          const res = await CustomUserService.getApiAppCustomUser({ id: this.id });
          res.creationTime = formateDateToDatetime(res.creationTime);
          res.lastModificationTime = formateDateToDatetime(res.lastModificationTime);
          res.lastPasswordChangeTime = formateDateToDatetime(res.lastPasswordChangeTime);
          res.lockoutEnd = formateDateToDatetime(res.lockoutEnd);

          const resultData: [{ name: string; value: string }] = [
            {
              name: this.l('AbpIdentity.texts.UserName') as string,
              value: res.userName as string,
            },
          ];

          resultData.push({
            name: this.l('AbpIdentity.texts.Name') as string,
            value: res.name as string,
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.Surname') as string,
            value: res.surname as string,
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.EmailAddress') as string,
            value: res.email as string,
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.Roles') as string,
            value: res.roleNames?.join(',') as string,
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.PhoneNumber') as string,
            value: res.phoneNumber as string,
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.DisplayName:IsActive') as string,
            value: res.isActive ? this.l('Unified.texts.Yes') : this.l('Unified.texts.No'),
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.DisplayName:ShouldChangePasswordOnNextLogin') as string,
            value: res.shouldChangePasswordOnNextLogin
              ? this.l('Unified.texts.Yes')
              : this.l('Unified.texts.No'),
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.DisplayName:LockoutEnabled') as string,
            value: res.lockoutEnabled ? this.l('Unified.texts.Yes') : this.l('Unified.texts.No'),
          });

          resultData.push({
            name: this.l('AbpIdentity.texts.IsExternal') as string,
            value: res.isExternal ? this.l('Unified.texts.Yes') : this.l('Unified.texts.No'),
          });

          this.dataList = resultData;

          // 使用 await 等待 getUserName 返回的结果
          if (res.creatorId) {
            const userName = await this.getUserName(res.creatorId as string);
            const conventionData: [{ name: string; value: string }] = [
              {
                name: this.l('AbpIdentity.texts.CreatedBy') as string,
                value: userName,
              },
            ];

            conventionData.push({
              name: this.l('AbpIdentity.texts.CreationTime') as string,
              value: res.creationTime as string,
            });

            const modUserName = await this.getUserName(res.lastModifierId as string);
            conventionData.push({
              name: this.l('AbpIdentity.texts.ModifiedBy') as string,
              value: modUserName as string,
            });

            conventionData.push({
              name: this.l('AbpIdentity.texts.PasswordUpdateTime') as string,
              value: res.lastModificationTime as string,
            });

            conventionData.push({
              name: this.l('AbpIdentity.texts.PasswordUpdateTime') as string,
              value: res.lastPasswordChangeTime as string,
            });

            conventionData.push({
              name: this.l('AbpIdentity.texts.LockoutEndTime') as string,
              value: this.getLockoutEnd(res),
            });

            conventionData.push({
              name: this.l('AbpIdentity.texts.FailedAccessCount') as string,
              value: (res.accessFailedCount + '') as string,
            });

            this.dataConventionList = conventionData;
          }
        } catch (error) {
          // 错误处理逻辑
        }
      }
    },
    async getUserName(id: string) {
      if (!!id) {
        const user = await CustomUserService.getApiAppCustomUser({ id });
        if (user != null && user.userName != undefined) {
          return user.userName;
        }
      }
      return ''; // 提供一个默认值
    },
    getLockoutEnd(res: any) {
      let lockoutEnd = res.lockoutEnd as string;
      if (!res.lockoutEnabled) lockoutEnd = '';
      else if (lockoutEnd && new Date(res.lockoutEnabled) < new Date()) lockoutEnd = '';
      return lockoutEnd;
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      const organizationResult = await UserService.getApiIdentityUsersAvailableOrganizationUnits();
      this.organizationData.allOrganizationUnits = organizationResult.items as Array<any>;
      if (this.id != null) {
        const organizationRow = await UserService.getApiIdentityUsersOrganizationUnits({
          id: this.id,
        });
        if (organizationRow != undefined && organizationRow.length > 0) {
          const codeList = organizationRow
            ?.filter((item) => item.code)
            .map((item) => {
              return item.code;
            }) as never;

          const idList = organizationRow
            ?.filter((item) => item.id)
            .map((item) => {
              return item.id;
            }) as never;

          this.organizationData.memberedOrganizationUnits = codeList;
          this.selectedUnit.checked = idList;
        }
      }
      this.loading = false;
    },
  },
});
