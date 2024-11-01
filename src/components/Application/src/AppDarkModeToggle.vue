<template>
  <!-- <div v-if="getShowDarkModeToggle" :class="getClass" @click="toggleDarkMode">
    <div :class="`${prefixCls}-inner`"></div>
    <SvgIcon size="14" name="sun" /> 
    <SvgIcon size="14" name="moon" /> 
  </div> -->
  <div :class="getClass" @click="toggleDarkMode">
    <div>
      <SvgIcon v-show="!isDark" size="20" name="yueliang" />
      <SvgIcon v-show="isDark" size="20" name="taiyang" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { SvgIcon } from '@/components/Icon';
  import Icon from '@/components/Icon/Icon.vue';
  import { ThemeEnum } from '@/enums/appEnum';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { useDesign } from '@/hooks/web/useDesign';
  import { updateDarkTheme } from '@/logics/theme/dark';
  import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground';
  import { baseHandler } from '@/layouts/default/setting/handler';
  import { HandlerEnum } from '@/layouts/default/setting/enum';

  const { prefixCls } = useDesign('dark-switch');
  const { getDarkMode, setDarkMode, getShowDarkModeToggle } = useRootSetting();

  const isDark = computed(() => getDarkMode.value === ThemeEnum.DARK);

  const getClass = computed(() => [
    prefixCls,
    {
      [`${prefixCls}--dark`]: unref(isDark),
    },
  ]);

  function toggleDarkMode() {
    const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    const menuColor = getDarkMode.value === ThemeEnum.DARK ? '#ffffff' : '#17171A';
    setDarkMode(darkMode);
    updateDarkTheme(darkMode);
    updateHeaderBgColor();
    updateSidebarBgColor();
    baseHandler(HandlerEnum.MENU_THEME, menuColor);
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-dark-switch';

  .@{prefix-cls} {
    padding: 10px;
    border-radius: 50%;
    color: #333;

    &:hover {
      background-color: rgb(60 82 213 / 10%);
    }
  }

  html[data-theme='dark'] {
    .@{prefix-cls} {
      &:hover {
        background-color: #2e3033;
      }
    }
  }
  // .@{prefix-cls} {
  //   display: flex;
  //   position: relative;
  //   align-items: center;
  //   justify-content: space-between;
  //   width: 50px;
  //   height: 26px;
  //   margin-left: auto;
  //   padding: 0 6px;
  //   border-radius: 30px;
  //   background-color: #151515;
  //   cursor: pointer;

  //   &-inner {
  //     position: absolute;
  //     z-index: 1;
  //     width: 18px;
  //     height: 18px;
  //     transition:
  //       transform 0.5s,
  //       background-color 0.5s;
  //     border-radius: 50%;
  //     background-color: #fff;
  //     will-change: transform;
  //   }

  //   &--dark {
  //     .@{prefix-cls}-inner {
  //       transform: translateX(calc(100% + 2px));
  //     }
  //   }
  // }
</style>
