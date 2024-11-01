<!--
 * @Author: eric
 * @Description: Multi-Time offset switching component
-->
<template>
  <Popover title="" trigger="click">
    <template #content>
      <f-enum-select
        style="width: 120px"
        v-model:value="getTimeoffsetText"
        label-field="label"
        value-field="value"
        :show-arrow="true"
        optionFilterProp="label"
        show-search
        :options="UTC_OFFSET_LIST"
        @change="toggleTimeoffset"
      />
    </template>
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:time" />
      <span v-if="showText" class="pr-3">{{ getTimeoffsetText }}</span>
    </span>
  </Popover>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, unref, computed } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useTimezone } from '@/timezones/useTimezone';
  import { Popover } from 'ant-design-vue';
  import { UTC_OFFSET_LIST } from '@/consts/UTC';

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

  const { getOffset, changeOffset } = useTimezone();

  const getTimeoffsetText = computed(() => {
    const key = selectedKeys.value[0];
    if (!key) {
      return '';
    }
    return (UTC_OFFSET_LIST.find((item) => item.value === key) as any).label;
  });

  watchEffect(() => {
    selectedKeys.value = [unref(getOffset)];
  });

  async function toggleTimeoffset(offset: string) {
    if (unref(getOffset) === offset) {
      return;
    }
    changeOffset(offset);
    selectedKeys.value = [offset];
    props.reload && location.reload();
  }
</script>

<style lang="less">
  .app-timezone-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
