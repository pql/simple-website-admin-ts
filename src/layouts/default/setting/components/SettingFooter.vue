<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <CopyOutlined class="mr-2" />
      {{ t('Unified.texts.layout:setting:copyBtn') }}
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('Unified.texts.common:resetText') }}
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('Unified.texts.layout:setting:clearBtn') }}
    </a-button>
  </div>
</template>
<script lang="ts" setup>
  import { unref } from 'vue';

  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';

  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';
  import { copyText } from '@/utils/copyTextToClipboard';
  import { updateColorWeak } from '@/logics/theme/updateColorWeak';
  import { updateGrayMode } from '@/logics/theme/updateGrayMode';
  import defaultSetting from '@/settings/projectSetting';
  import { updateSidebarBgColor } from '@/logics/theme/updateBackground';
  import { UserStore } from '@/store/modules/user';
  import { AppStore } from '@/store/modules/app';
  import { MultipleTabStore } from '@/store/modules/multipleTab';
  import { PermissionStore } from '@/store/modules/permission';

  defineOptions({ name: 'SettingFooter' });

  const permissionStore = PermissionStore.useStore();
  const { prefixCls } = useDesign('setting-footer');
  const { t } = useI18n();
  const { createSuccessModal, createMessage } = useMessage();
  const tabStore = MultipleTabStore.useStore();
  const userStore = UserStore.useStore();
  const appStore = AppStore.useStore();

  function handleCopy() {
    copyText(JSON.stringify(unref(appStore.getProjectConfig), null, 2), null).then(() => {
      createSuccessModal({
        title: t('Unified.texts.layout:setting:operatingTitle'),
        content: t('Unified.texts.layout:setting:operatingContent'),
      });
    });
  }

  function handleResetSetting() {
    try {
      appStore.setProjectConfig(defaultSetting);
      const { colorWeak, grayMode } = defaultSetting;
      updateSidebarBgColor();
      updateColorWeak(colorWeak);
      updateGrayMode(grayMode);
      createMessage.success(t('Unified.texts.layout:setting:resetSuccess'));
    } catch (error: any) {
      createMessage.error(error);
    }
  }

  function handleClearAndRedo() {
    localStorage.clear();
    appStore.resetAllState();
    permissionStore.resetState();
    tabStore.resetState();
    userStore.resetState();
    location.reload();
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
