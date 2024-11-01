<!--
 * @Author: eric
 * @Description: Multi-Time offset switching component
-->
<template>
  <Popover title="" trigger="click">
    <template #content>
      <List class="max-w-72" :data-source="timezoneList" :pagination="paginationConfig">
        <template #renderItem="{ item }">
          <List.Item class="cursor-pointer" @click="toggleTimeoffset(item.value)">
            <template v-if="item.label === getTimeoffsetText">
              <Typography.Text type="success">
                {{ item.label }} <CheckCircleOutlined class="ml-2" />
              </Typography.Text>
            </template>
            <template v-else>
              <Typography.Text>
                {{ item.label }}
              </Typography.Text>
            </template>
          </List.Item>
        </template>
      </List>
    </template>
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:time" />
      <span v-if="showText" class="pr-3">{{ getTimeoffsetText }}</span>
    </span>
  </Popover>
</template>
<script lang="ts" setup>
  import type { DropMenu } from '@/components/Dropdown';
  import { ref, watchEffect, unref, computed } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useTimezone } from '@/timezones/useTimezone';
  import { PaginationProps, Popover, List, Typography } from 'ant-design-vue';
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
  const timezoneList = ref<DropMenu[]>([]);

  const { getOffset, changeOffset } = useTimezone();

  const chunkTimezoneArray = (array, chunkSize: number) => {
    let chunks: any = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const arr = array.slice(i, i + chunkSize);
      chunks.push(arr);
    }
    return chunks;
  };

  const paginationConfig = {
    size: 'small',
    total: UTC_OFFSET_LIST.length,
    current: 1,
    pageSize: 10,
    showSizeChanger: false,
  } as PaginationProps;

  paginationConfig.onChange = (page, pageSize) => {
    paginationConfig.current = page;
    paginationConfig.pageSize = pageSize;
    setTimeoffsetListDataByIndex(page - 1);
  };

  const chunkTimezoneArrays = chunkTimezoneArray(
    UTC_OFFSET_LIST,
    paginationConfig.pageSize as number,
  );

  const setTimeoffsetListDataByIndex = (index: number) => {
    timezoneList.value = chunkTimezoneArrays[index].map((item) => {
      return item;
    });
  };

  /** 默认获取第一页数据 */
  setTimeoffsetListDataByIndex((paginationConfig.current as number) - 1);

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
