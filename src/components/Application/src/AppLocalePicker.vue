<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <Dropdown
    placement="bottom"
    :trigger="['click']"
    :dropMenuList="languageList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center app-locale-picker">
      <!-- <Icon icon="ion:language" /> -->
      <span :class="getClass"></span>
      <!-- <span v-if="showText" class="ml-1">{{ getLocaleText }}</span> -->
    </span>
  </Dropdown>
</template>
<script lang="ts" setup>
  import type { LocaleType } from '#/config';
  import type { DropMenu } from '@/components/Dropdown';
  import { ref, watchEffect, unref, computed } from 'vue';
  import { Dropdown } from '@/components/Dropdown';
  import Icon from '@/components/Icon/Icon.vue';
  import { useLocale } from '@/locales/useLocale';
  import { AbpStore } from '@/store/modules/abp';
  import { array } from 'vue-types';
  const abpStore = AbpStore.useStoreWithOut();
  const languages = abpStore.application.localization?.languages;
  const flagIcon = {
    en: 'us',
    fr: 'fr',
    'zh-Hant': 'cn',
    'zh-Hans': 'cn',
    es: 'es',
    ar: 'sa',
  } as object;
  //增加语言时请前往该文件(utils\http\axios\indexV2.ts )下 方法中（requestInterceptors） 一并添加
  const props = defineProps({
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  });

  const selectedKeys = ref<string[]>([]);
  const languageList = ref<DropMenu[]>([]);

  languages?.forEach((lang) => {
    const { displayName: text, cultureName: event } = lang;
    if (event && flagIcon[event]) {
      const baseClass = 'flag-icon';
      const flagCode = event ? flagIcon[event] || '' : '';
      const iconFlag = `${baseClass} ${baseClass}-squared ${baseClass}-${flagCode}`;
      languageList.value.push({
        iconFlag,
        text,
        event,
      } as DropMenu);
    }
  });

  const { changeLocale, getLocale } = useLocale();
  const getClass = computed(() => {
    const baseClass = 'flag-icon';
    const flagCode = flagIcon[selectedKeys.value[0]] || '';
    return `flagIcon ${baseClass} ${baseClass}-squared ${baseClass}-${flagCode}`;
  });
  const getLocaleText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
      return '';
    }
    return languageList.value.find((item) => item.event === key)?.text;
  });

  watchEffect(() => {
    selectedKeys.value = [unref(getLocale)];
  });

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    selectedKeys.value = [lang as string];
    props.reload && location.reload();
  }

  function handleMenuEvent(menu: DropMenu) {
    if (unref(getLocale) === menu.event) {
      return;
    }
    toggleLocale(menu.event as string);
  }
</script>

<style lang="less">
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
  .flagIcon {
    border-radius: 50%;
    font-size: 20px;
  }
  .app-locale-picker {
    padding: 10px;
    border-radius: 50%;
    &:hover {
      background-color: rgba(60, 82, 213, 0.1);
    }
  }

  html[data-theme='dark'] {
    .app-locale-picker {
      &:hover {
        background-color: #2e3033;
      }
    }
  }
</style>
