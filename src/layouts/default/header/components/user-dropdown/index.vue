<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name`" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          v-if="getShowDoc"
          key="doc"
          :text="t('Unified.texts.layout:header:dropdownItemDoc')"
          icon="ion:document-text-outline"
        />
        <Menu.Divider v-if="getShowDoc" />
        <MenuItem
          v-if="getShowApi"
          key="api"
          :text="t('Unified.texts.layout:header:dropdownChangeApi')"
          icon="ant-design:swap-outlined"
        />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('Unified.texts.layout:header:tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="account"
          :text="t('AbpAccount.texts.MyAccount')"
          icon="ant-design:menu-unfold-outlined"
        />
        <MenuItem
          key="personalData"
          :text="t('AbpGdpr.texts.Menu:PersonalData')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="securityLog"
          :text="t('AbpAccount.texts.MySecurityLogs')"
          icon="ant-design:unordered-list-outlined"
        />
        <MenuItem
          key="linkUser"
          :text="t('AbpAccount.texts.LinkedAccounts')"
          icon="ant-design:deployment-unit-outlined"
        />
        <MenuItem
          key="delegatedUser"
          :text="t('AbpAccount.texts.AuthorityDelegation')"
          icon="ant-design:team-outlined"
        />
        <MenuItem
          v-if="userStore.getBeforeToken"
          key="backToLogin"
          :text="t('Unified.texts.BackToLogin')"
          icon="ant-design:retweet-outlined"
        />
        <MenuItem key="logout" :text="t('AbpUi.texts.Logout')" icon="ant-design:import-outlined" />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
  <ChangeApi @register="registerApi" />
</template>
<script lang="ts" setup>
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { computed, ref, onMounted } from 'vue';
  import { DOC_URL } from '@/settings/siteSetting';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useModal } from '@/components/Modal';
  import headerImg from '@/assets/images/header.jpg';
  import { propTypes } from '@/utils/propTypes';
  import { openWindow } from '@/utils';
  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
  import { UserStore } from '@/store/modules/user';
  import { useGo } from '@/hooks/web/usePage';
  import ModalHelper from '@/shared/helpers/modal/modal-service';
  import DelegatedUser from '@/app/admin/delegated-user/delegated-user.vue';
  import LinkUser from '@/app/admin/link-user/link-user.vue';
  import { OidcClient } from '@/utils/auth/oidc';
  import { router } from '@/router';

  type MenuEvent =
    | 'logout'
    | 'doc'
    | 'lock'
    | 'api'
    | 'account'
    | 'personalData'
    | 'securityLog'
    | 'backToLogin'
    | 'linkUser'
    | 'delegatedUser';

  const MenuItem = createAsyncComponent(() => import('./DropMenuItem.vue'));
  const LockAction = createAsyncComponent(() => import('../lock/LockModal.vue'));
  const ChangeApi = createAsyncComponent(() => import('../ChangeApi/index.vue'));

  defineOptions({ name: 'UserDropdown' });

  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });
  const { prefixCls } = useDesign('header-user-dropdown');
  const { t } = useI18n();
  const { getShowDoc, getUseLockPage, getShowApi } = useHeaderSetting();
  const userStore = UserStore.useStore();
  const go = useGo();
  const getUserInfo = computed(() => {
    const { userName = '' } = userStore.getUserInfo || {};
    return { realName: userName, avatar: picture.value ? picture.value : headerImg, desc: '' };
  });
  const menuEvent = ModalHelper.getModalService();

  const [register, { openModal }] = useModal();
  const [registerApi, { openModal: openApiModal }] = useModal();
  const picture = ref<string | null>('');

  onMounted(() => {
    getAvatarPic();
  });
  const getAvatarPic = async () => {
    const { id = '' } = userStore.getUserInfo || {};
    if (id) {
      const res = await OidcClient.getApiAccountProfilePicture({ useId: id });
      if (res.fileContent) picture.value = `data:image/png;base64,${res.fileContent}`;
    }
  };

  function handleLock() {
    openModal(true);
  }

  function handleApi() {
    openApiModal(true, {});
  }

  //  login out
  function handleLoginOut() {
    userStore.confirmLoginOut();
  }

  // open doc
  function openDoc() {
    openWindow(DOC_URL);
  }
  // my account
  function handleAccount() {
    go('/admin/account/account', false);
  }
  // personal data
  function handlePersonalData() {
    go('/admin/personal-data/personalData', false);
  }
  // security log
  function handleSecurityLog() {
    go('/admin/account-security-log/accountSecurityLog', false);
  }
  // backToLogin
  function backToLogin() {
    const userStore = UserStore.useStore();
    userStore.returnMyAccount();
  }
  // linkUser
  function linkUser() {
    menuEvent.create(LinkUser, { size: 'large' }).subscribe((res) => {});
  }
  // delegatedUser
  function delegatedUser() {
    menuEvent.create(DelegatedUser, { size: 'large' }).subscribe((res) => {});
  }
  function handleMenuClick(e: MenuInfo) {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLoginOut();
        break;
      case 'doc':
        openDoc();
        break;
      case 'lock':
        handleLock();
        break;
      case 'api':
        handleApi();
        break;
      case 'account':
        handleAccount();
        break;
      case 'personalData':
        handlePersonalData();
        break;
      case 'securityLog':
        handleSecurityLog();
        break;
      case 'backToLogin':
        backToLogin();
        break;
      case 'linkUser':
        linkUser();
        break;
      case 'delegatedUser':
        delegatedUser();
        break;
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    align-items: center;
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
