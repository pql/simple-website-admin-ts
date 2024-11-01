<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpAccount.texts.AuthorityDelegation') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-tabs v-model:activeKey="tabsActionKey" @change="disposePort()">
        <!-- 委托用户 -->
        <a-tab-pane key="delegatedUser">
          <template #tab>
            {{ l('AbpAccount.texts.DelegatedUsers') }}
          </template>
          <f-dynamic-table
            ref="table"
            type="delegated-user"
            class="table"
            :fetch="fetchDataList"
            :showActionBtn="showActionBtn"
            :showFilter="false"
            :extra-height="242"
            @action-click="handleActionClick"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'state'">
                <!-- 未来 -->
                <a-tag v-if="new Date() < new Date(record.startTime)" :color="'#4fbf67'">{{
                  l('AbpIdentity.texts.StatusFuture')
                }}</a-tag>
                <!-- 已过期 -->
                <a-tag v-else-if="new Date() > new Date(record.endTime)" :color="'#c00d49'">{{
                  l('AbpIdentity.texts.StatusExpired')
                }}</a-tag>
                <!-- 有效 -->
                <a-tag v-else :color="'#4fbf67'">{{ l('AbpIdentity.texts.StatusActive') }}</a-tag>
              </template>
            </template>
          </f-dynamic-table>
        </a-tab-pane>
        <!-- 我的委托用户 -->
        <a-tab-pane key="mydelegatedUser">
          <template #tab>
            {{ l('AbpAccount.texts.MyDelegatedUsers') }}
          </template>
          <f-dynamic-table
            ref="tableMy"
            type="my-delegated-user"
            class="table"
            :fetch="myFetchDataList"
            :showActionBtn="showActionBtn"
            :showToolbar="false"
            :showFilter="false"
            :extra-height="242"
            @action-click="handleActionClick"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'state'">
                <!-- 未来 -->
                <a-tag v-if="new Date() < new Date(record.startTime)" :color="'#4fbf67'">{{
                  l('Unified.texts.Future')
                }}</a-tag>
                <!-- 已过期 -->
                <a-tag v-else-if="new Date() > new Date(record.endTime)" :color="'#c00d49'">{{
                  l('Unified.texts.PastDue')
                }}</a-tag>
                <!-- 有效 -->
                <a-tag v-else :color="'#4fbf67'">{{
                  l('Unified.texts.Valid')
                }}</a-tag>
              </template>
            </template>
          </f-dynamic-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DelegatedUser from './delegated-user';

  export default defineComponent({
    name: 'DelegatedUser',
    mixins: [DelegatedUser],
  });
</script>

<style lang="less" scoped></style>
