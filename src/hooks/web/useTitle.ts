import { watch, unref } from 'vue';
import { useI18n } from '@/hooks/web/useI18n';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useGlobSetting } from '@/hooks/setting';
import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '@/router/constant';
import { LocaleStore } from '@/store/modules/locale';

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const localeStore = LocaleStore.useStore();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute);

      if (route.name === REDIRECT_NAME) {
        return;
      }

      const tTitle = t(route?.meta?.title as string);
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`;
    },
    { immediate: true },
  );
}
