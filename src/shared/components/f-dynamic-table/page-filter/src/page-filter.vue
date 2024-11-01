<template>
  <div class="search-layout" v-if="showFilters && showFilters.length">
    <!-- 左侧表单 -->
    <div class="search-container">
      <a-form ref="searchFormRef" :model="filterValues" autocomplete="off" :layout="layout" v-bind="formLayout">
        <!-- 过滤条件 -->
        <a-row :gutter="[12, 12]">
          <!-- 搜索按钮区固定在搜索区的最右侧，默认占8个位置，网格布局总共24个位置 -->

          <!-- 过滤器总filterWidth之和 小于等于 (网格布局位置总数 - 按钮区占位数)  -->
          <template v-if="getBasicFiltersTotalFilterWidth <= defaultGridCount - filterButtonsGridCount">
            <!-- 过滤 -->
            <a-col v-for="(item, index) in basicFilters" :key="index" :span="item.filterWidth">
              <a-form-item v-if="item.ifShow" :label="l(item.filterTitle ?? '')" :name="item.field">
                <component :ref="`${item?.field}`" :is="item.componentName"
                  v-model:value="filterValues[item?.field as string]" v-bind="item.args" style="width: 100%"
                  :placeholder="item.args?.placeholder" @on-ready="handleReady(item)"
                  @change="handleChange(filterValues[item?.field as string], item)" @keydown.enter="handleSearch()" />
              </a-form-item>
            </a-col>
            <!-- 按钮区 -->
            <a-col class="flex items-end justify-end" :span="filterButtonsGridCount"
              :offset="defaultGridCount - filterButtonsGridCount - getBasicFiltersTotalFilterWidth">
              <!-- 右侧按钮 -->
              <div class="search-aside text-right flex items-center  justify-end">
                <!-- 展开/折叠 -->
                <a class="advanced-button" v-if="advancedFilters.length > 0" @click="handleAdvanceFilter()">
                  <i class="iconfont icon-f-screen" :class="showAdvancedFilter ? 'rotate-no' : 'rotate-yes'"></i>
                </a>
                <!-- 重置 -->
                <a-button type="primary" v-if="showFilters && showFilters.length" @click="handleResetForm"
                  :style="{ borderRadius: '4px', marginRight: '8px' }">
                  <template #icon>
                    <Icon icon="icon-f-refresh" class="mr-[6px]"></Icon>
                  </template>
                  <span>{{ l('Unified.texts.Reset') }}</span>
                </a-button>
                <!-- 搜索 -->
                <a-button type="primary" v-if="showFilters && showFilters.length" @click="handleSearch()"
                  :style="{ borderRadius: '4px', marginRight: 0 }">
                  <template #icon>

                    <Icon icon="icon-f-search2" class="mr-[6px]"></Icon>

                  </template>
                  <span>{{ l('Unified.texts.Personalized:Search') }}</span>
                </a-button>
              </div>
            </a-col>
          </template>

          <!-- 过滤器总filterWidth之和 大于 (网格布局位置总数 - 按钮区占位数)  -->
          <template v-else>
            <!-- 前置过滤-->
            <a-col v-for="(item, index) in getPrefixBasicFilters" :key="index" :span="item.filterWidth">
              <a-form-item v-if="item.ifShow" :label="l(item.filterTitle ?? '')" :name="item.field">
                <component :ref="`${item?.field}`" :is="item.componentName"
                  v-model:value="filterValues[item?.field as string]" v-bind="item.args" style="width: 100%"
                  :placeholder="item.args?.placeholder" @on-ready="handleReady(item)"
                  @change="handleChange(filterValues[item?.field as string], item)" @keydown.enter="handleSearch()" />
              </a-form-item>
            </a-col>
            <!-- 按钮区 -->
            <a-col class="flex items-end justify-end" :span="filterButtonsGridCount" :offset="defaultGridCount - filterButtonsGridCount - getPrefixBasicFiltersTotalFilterWidth
              ">
              <!-- 右侧按钮 -->
              <div class="search-aside text-right  flex items-center justify-end">
                <!-- 展开/折叠 -->
                <a class="advanced-button" v-if="advancedFilters.length > 0" @click="handleAdvanceFilter()">
                  <!-- {{
                    showAdvancedFilter
                      ? l('Unified.texts.PersonalizedPackUp')
                      : l('Unified.texts.PersonalizedUnfold')
                  }} -->
                  <!-- <down-outlined :class="showAdvancedFilter ? 'rotate-no' : 'rotate-yes'" /> -->
                  <i class="iconfont icon-f-screen" :class="showAdvancedFilter ? 'rotate-no' : 'rotate-yes'"></i>

                </a>
                <!-- 重置 -->
                <a-button type="primary" v-if="showFilters && showFilters.length" @click="handleResetForm"
                  :style="{ borderRadius: '4px', marginRight: '8px' }">
                  <template #icon>

                    <Icon icon="icon-f-refresh" class="mr-[6px]"></Icon>

                  </template>
                  <span>{{ l('Unified.texts.Reset') }}</span>
                </a-button>
                <!-- 搜索 -->
                <a-button type="primary" v-if="showFilters && showFilters.length" @click="handleSearch()"
                  :style="{ borderRadius: '4px', marginRight: 0 }">
                  <template #icon>
                    <Icon icon="icon-f-search2" class="mr-[6px]"></Icon>

                  </template>
                  <span>{{ l('Unified.texts.Personalized:Search') }}</span>
                </a-button>
              </div>
            </a-col>
            <!-- 后置过滤 -->
            <a-col v-for="(item, index) in basicFilters.slice(getPrefixBasicFilters.length)" :key="index"
              :span="item.filterWidth">
              <a-form-item v-if="item.ifShow" :label="l(item.filterTitle ?? '')" :name="item.field">
                <component :ref="`${item?.field}`" :is="item.componentName"
                  v-model:value="filterValues[item?.field as string]" v-bind="item.args" style="width: 100%"
                  :placeholder="item.args?.placeholder" @on-ready="handleReady(item)"
                  @change="handleChange(filterValues[item?.field as string], item)" @keydown.enter="handleSearch()" />
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <!-- 高级过滤条件 -->
        <a-row class="mt-12" v-show="showAdvancedFilter" :gutter="[12, 12]">
          <a-col v-for="(item, index) in advancedFilters" :key="index" :span="item.filterWidth">
            <a-form-item v-if="item.ifShow" :label="l(item.filterTitle as string)" :name="item.field">
              <component :ref="`${item?.field}`" :is="item.componentName"
                v-model:value="filterValues[item?.field as string]" v-bind="item.args" style="width: 100%"
                :placeholder="item.args?.placeholder" @on-ready="handleReady(item)"
                @change="handleChange(filterValues[item?.field as string], item)" @keydown.enter="handleSearch()" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageFilter from './page-filter';

export default defineComponent({
  name: 'PageFilter',
  mixins: [PageFilter],
});
</script>

<style lang="less" scoped>
@import './page-filter.less';
</style>
