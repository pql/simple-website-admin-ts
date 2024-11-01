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
  import { onMounted, reactive } from 'vue';
  import { OidcClient } from '@/utils/auth/oidc';
  import { Loading } from '@/components/Loading';

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
    tip: 'Refreshing token...',
  });

  onMounted(async () => {
    try {
      // 处理静默刷新逻辑
      await OidcClient.signinSilentCallback();
      console.log('Silent token refresh successful.');
    } catch (error) {
      console.error('Silent token refresh failed:', error);
    } finally {
      // 刷新完成后关闭 loading
      compState.loading = false;
    }
  });
</script>

<style scoped>
  /* 根据你的样式需求修改这里 */
</style>
