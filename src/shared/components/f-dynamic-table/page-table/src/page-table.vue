<template>
  <!-- 表格布局 -->
  <div class="table-layout">
    <!-- 表格本体 -->
    <a-table
      ref="table"
      :rowKey="rowKey"
      :columns="columnsList"
      :dataSource="dataSource"
      :scroll="tableScroll"
      :bordered="bordered"
      :showHeader="showHeader"
      :size="size"
      :customRow="customRow"
      :pagination="showPagination ? pagination : false"
      :rowSelection="
        !rowSelectionType
          ? undefined
          : {
              type: rowSelectionType,
              selectedRowKeys: selectedRowKeys,
              onChange: selectRowChange,
              getCheckboxProps: rowCheckboxProps,
            }
      "
      @change="handleTableChange"
      @resize-column="handleResizeColumn"
    >
      <template #headerCell="{ column }">
        <!-- 头部插槽 -->
        <slot name="headerCell" :column="column"></slot>
      </template>

      <template #bodyCell="{ column, record, index }">
        <!-- 内容插槽 -->
        <slot name="bodyCell" :column="column" :record="record">
          <!-- 判断类型是否是序号 -->
          <template v-if="column.type === 'no'">
            <span :style="bgColor(column, record)">
              {{ currentNo(index) }}
            </span>
          </template>

          <!-- 判断类型是否是链接 -->
          <template v-else-if="column.type === 'link'">
            <span :title="record[column.field]" :style="bgColor(column, record)">
              <a-tooltip :title="formatLinkPath(column, record)">
                <a
                  type="link"
                  v-bind="{
                    href: formatLinkPath(column, record),
                    target: column.LinkType === 'Inner' ? '_self' : '_blank',
                  }"
                  >{{ l(formatFieldValue(column.field, record)) }}</a
                >
              </a-tooltip>
            </span>
          </template>

          <!-- 判断类型是否是时间 -->
          <template v-else-if="column.type === 'datetime' || column.type === 'dateTime'">
            <span
              :title="formatDate(column, formatFieldValue(column.field, record))"
              :style="bgColor(column, record)"
            >
              {{ formatDate(column, formatFieldValue(column.field, record)) }}
            </span>
          </template>

          <!-- 判断类型是否是数字 -->
          <template v-else-if="column.type === 'number'">
            <span :title="record[column.field]" :style="bgColor(column, record)">
              {{ formatNumber(column, formatFieldValue(column.field, record)) }}
            </span>
          </template>

          <!-- 判断类型是否是开关 -->
          <template v-else-if="column.type === 'switch'">
            <span :style="bgColor(column, record)">
              <a-switch v-if="formatFieldValue(column.field, record)" :checked="true" disabled />
              <a-switch v-else :checked="false" disabled />
            </span>
          </template>

          <!-- 判断类型是否是图片-url地址 -->
          <template v-else-if="column.type === 'imgUrl'">
            <span :style="bgColor(column, record)">
              <a-image
                v-if="formatFieldValue(column.field, record)"
                :src="formatFieldValue(column.field, record)"
                style="display: block; width: 40px; margin: 0 auto"
                :fallback="fallback"
              />
            </span>
          </template>

          <!-- 判断类型是否是图片-base64 -->
          <template v-else-if="column.type === 'imgBase64'">
            <span :style="bgColor(column, record)">
              <a-image
                v-if="formatFieldValue(column.field, record)"
                :src="'data:image/gif;base64,' + formatFieldValue(column.field, record)"
                style="display: block; width: 40px; margin: 0 auto"
                :fallback="fallback"
              />
            </span>
          </template>
          <template v-else-if="column.type === 'statusIcon'">
            <span :style="bgColor(column, record)">
              <Icon
                v-if="formatFieldValue(column.field, record)"
                icon="icon-f-Success"
                :size="19"
                class="text-[#3DCF36]"
              />
              <Icon
                v-else-if="!formatFieldValue(column.field, record)"
                icon="icon-f-Wrong"
                :size="19"
                class="text-[#EE3131]"
              />
            </span>
          </template>
          <!-- 判断是否是操作栏 -->
          <template v-else-if="column.type === 'action'">
            <template v-if="record.Show"></template>
            <template v-else>
              <template v-for="(item, idx) in column.actions">
                <!-- 判断是否是下拉操作栏，是否有权限，是否下拉框按钮 -->
                <template
                  v-if="
                    item.type === 'select' &&
                    hasGranted(item.acl) &&
                    !isMenuButtonEmpty(item.buttons, column, record)
                  "
                >
                  <a-dropdown @click.stop :key="idx" placement="bottomLeft" class="btn-guttar">
                    <template #overlay>
                      <a-menu @click="handleActionClick($event.key, record)">
                        <a-menu-item v-if="isMenuButtonEmpty(item.buttons, column, record)">
                          {{ l('Personalized.NoData') }}
                        </a-menu-item>

                        <template v-for="i in item.buttons">
                          <!-- 是否有权限，自定义是否显示 -->
                          <template v-if="i.name === 'Delete'">
                            <a @click.stop>
                              <a-popconfirm
                                placement="top"
                                :ok-text="l('Ok')"
                                :cancel-text="l('Cancel')"
                                @click.stop
                                key="delete"
                                @confirm="handleActionClick(i.name, record)"
                              >
                                <template #title>
                                  {{ l('Unified.texts.ConfirmDeleteWarningMessage') }}</template
                                >
                                <a-menu-item
                                  v-if="hasGranted(i.acl) && formatShowActionBtn(i, column, record)"
                                  key="delete"
                                >
                                  {{ l(i.label) }}
                                </a-menu-item>
                              </a-popconfirm>
                            </a>
                          </template>
                          <template v-else>
                            <a-menu-item
                              v-if="hasGranted(i.acl) && formatShowActionBtn(i, column, record)"
                              :key="i.name"
                            >
                              {{ l(i.label) }}
                            </a-menu-item>
                          </template>
                        </template>
                      </a-menu>
                    </template>
                    <a-button type="primary" class="primary">
                      {{ l(item.label) }}
                      <down-outlined />
                    </a-button>
                  </a-dropdown>
                </template>

                <!-- 不是下拉框，是否有权限，自定义是否显示 -->
                <template
                  v-else-if="
                    item.type !== 'select' &&
                    hasGranted(item.acl) &&
                    formatShowActionBtn(item, column, record)
                  "
                >
                  <div :key="idx" style="display: inline-block" class="btn-guttar">
                    <!-- 判断是否是删除 -->
                    <a-popconfirm
                      v-if="item.name === 'Delete'"
                      placement="top"
                      :ok-text="l('Ok')"
                      :cancel-text="l('Cancel')"
                      @click.stop
                      @confirm="handleActionClick(item.name, record)"
                    >
                      <template #title>{{
                        l('Unified.texts.ConfirmDeleteWarningMessage')
                      }}</template>
                      <a
                        v-bind="{
                          type: 'link',
                          style: {
                            color: !!item.color ? item.color : '@primary-color',
                          },
                        }"
                        class="a-primary-color"
                      >
                        <svg
                          v-if="!!item.icon"
                          class="icon"
                          aria-hidden="true"
                          style="margin-right: 8px"
                        >
                          <use :xlink:href="`#${item.icon}`" />
                        </svg>
                        <span>{{ l(item.label) }}</span>
                      </a>
                    </a-popconfirm>
                    <a
                      v-else
                      v-bind="{
                        type: 'link',
                        style: {
                          color: !!item.color ? item.color : '@primary-color',
                        },
                      }"
                      @click.stop="handleActionClick(item.name, record)"
                    >
                      <svg
                        v-if="!!item.icon"
                        class="icon"
                        aria-hidden="true"
                        style="margin-right: 8px"
                      >
                        <use :xlink:href="`#${item.icon}`" />
                      </svg>
                      <span>{{ l(item.label) }}</span>
                    </a>
                  </div>
                </template>
              </template>
            </template>
          </template>

          <!-- 其他 -->
          <template v-else>
            <span :title="record[column.field]" :style="bgColor(column, record)">
              {{ formatFieldValue(column.field, record) }}
            </span>
          </template>
        </slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageTable from './page-table';

  export default defineComponent({
    name: 'PageTable',
    mixins: [PageTable],
  });
</script>

<style lang="less" scoped>
  @import './page-table.less';
</style>
