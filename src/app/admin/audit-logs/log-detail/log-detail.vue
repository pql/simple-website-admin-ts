<template>
  <a-spin :spinning="loading">
    <!-- 标题 -->
    <div class="modal-header">
      <div class="modal-title">
        <span v-if="pageDataList">{{ l('AbpAuditLogging.texts.Detail') }}</span>
      </div>
    </div>

    <div class="modal-body">
      <a-tabs v-model:activeKey="currentTab">
        <!-- 请求信息 -->
        <a-tab-pane key="1" :tab="l('AbpAuditLogging.texts.Overall')">
          <!-- httpStatusCode -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.HttpStatusCode') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>
                <a-tag :color="STATUS_COLORS[form.httpStatusCode || 200]">{{
                  form?.httpStatusCode
                }}</a-tag>
              </div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- httpMethod -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.HttpMethod') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>
                <a-tag :color="METHOD_COLORS[form.httpMethod || 'POST']">{{
                  form?.httpMethod
                }}</a-tag>
              </div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- url -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.Url') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.url }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- clientIpAddress -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ClientIpAddress') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.clientIpAddress }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- clientName -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ClientName') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.clientName }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- exceptions -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.Exceptions') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.exceptions }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- userName -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.UserName') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.userName }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- ExecutionTime -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ExecutionTime') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.executionTime }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- ExecutionDuration -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ExecutionDuration') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.executionDuration }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- browserInfo -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.BrowserInfo') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.browserInfo }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- applicationName -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ApplicationName') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.applicationName }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- correlationId -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.CorrelationId') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.correlationId }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- Comments -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.Comments') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.comments }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />

          <!-- ExtraProperties -->
          <a-row :gutter="8">
            <a-col :span="6">
              <div>{{ l('AbpAuditLogging.texts.ExtraProperties') }}:</div>
            </a-col>
            <a-col :span="18">
              <div>{{ form?.extraProperties }}</div>
            </a-col>
          </a-row>

          <a-divider class="new_ant-divider-horizonta" />
        </a-tab-pane>
        <!-- 异常信息 -->
        <a-tab-pane key="2" :tab="l('AbpAuditLogging.texts.Actions')" force-render>
          <a-row v-for="(item, index) in form.actions" :key="item.id" class="a_row">
            <a-space direction="vertical">
              <a-collapse v-model:activeKey="activeKey" collapsible="header">
                <a-collapse-panel :key="index + 1" :header="item.serviceName + ' - ' + item.methodName">
                  <a-row :gutter="8">
                    <a-col :span="6">
                      <div>{{ l('AbpAuditLogging.texts.ExecutionDuration') }}:</div>
                    </a-col>
                    <a-col :span="18">
                      <div>{{ item?.executionDuration }}</div>
                    </a-col>
                  </a-row>
                  <a-divider class="new_ant-divider-horizonta" />
                  <a-row :gutter="8">
                    <a-col :span="6">
                      <div>{{ l('AbpAuditLogging.texts.Parameters') }}:</div>
                    </a-col>
                    <a-col :span="18">
                      <div>{{ item?.parameters }}</div>
                    </a-col>
                  </a-row>
                </a-collapse-panel>
              </a-collapse>
            </a-space>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="modal-footer">
      <a-button :disabled="saving" @click="close()">
        <close-circle-outlined />
        {{ l('Unified.texts.Close') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LogDetail from './log-detail';

export default defineComponent({
  name: 'LogDetail',
  mixins: [LogDetail],
});
</script>

<style lang="less" scoped>
@import './log-detail.less';
</style>
