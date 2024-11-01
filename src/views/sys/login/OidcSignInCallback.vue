<template>
  <Loading
    :loading="compState.loading"
    :absolute="compState.absolute"
    :theme="compState.theme"
    :background="compState.background"
    :tip="compState.tip"
    :spinColor="true"
  />
</template>

<script lang="ts" setup>
  import { onMounted, unref, reactive, computed } from 'vue';
  import { OidcClient } from '@/utils/auth/oidc';
  import { useRouter } from 'vue-router';
  import { AbpStore } from '@/store/modules/abp';
  import { UserStore } from '@/store/modules/user';
  import { Loading } from '@/components/Loading';
  import { LocaleStore } from '@/store/modules/locale';
  import { APP_DARK_MODE_KEY } from '@/enums/cacheEnum';

  const abpStore = AbpStore.useStore();
  const router = useRouter();
  const { currentRoute } = router;

  const compState = reactive<{
    absolute?: boolean;
    loading?: boolean;
    theme?: 'dark' | 'light';
    background?: string;
    tip?: string;
  }>({
    absolute: false,
    loading: true,
    theme: 'dark',
    background: '',
    tip: '',
  });

  onMounted(async () => {
    const theme = localStorage.getItem(APP_DARK_MODE_KEY) || 'dark';
    compState.background = theme == 'dark' ? '#17171A' : '#fff';
    compState.theme = theme as 'dark' | 'light';
    const route = unref(currentRoute);
    const application = abpStore.getApplication;
    // 获取本地化
    const localeStore = LocaleStore.useStoreWithOut();
    const getLocale = computed(() => localeStore.getLocale);

    const currentUser = application.currentUser;
    if (currentUser?.id == null || currentUser?.id == undefined) {
      const code = route.redirectedFrom?.query?.code;
      const state = route.redirectedFrom?.query?.state;
      if (!code) {
        // OidcClient.signinRedirect({
        //   extraQueryParams: {
        //     prompt: 'login',
        //   },
        // });
        const localizationParams = {
          culture: unref(getLocale),
          'ui-culture': unref(getLocale),
        };
        OidcClient.signinRedirect({
          extraQueryParams: localizationParams,
        });
      } else {
        const url = route.redirectedFrom?.fullPath;
        console.log('url', url);
        const user = await OidcClient.signinCallback(url);
        console.log('user', user);
        user && (await UserStore.useStore().oidcLogin(user));
      }
    }
  });
</script>
