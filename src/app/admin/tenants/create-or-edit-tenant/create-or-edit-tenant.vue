<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(titleName.toString()) }}
      </div>
    </div>
    <div class="modal-body">
      <!-- 表单 -->
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :rules="rules"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        scrollToFirstError="{true}"
        @on-finish-failed="onFinishFailed"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="24">
            <a-tabs class="content-container" v-model:activeKey="tabtActionKey">
              <!-- 基本信息 -->
              <a-tab-pane
                v-if="types == 'Create' || types == 'Edit'"
                :tab="l('Saas.texts.TenantBaseInfo')"
                key="info"
              >
                <!-- 租户名称 -->
                <a-form-item :label="l('Saas.texts.TenantName')" name="name" ref="name">
                  <a-input name="name" v-model:value="form.name" :autocomplete="'off'" />
                </a-form-item>
                <!-- 版本 -->
                <a-form-item :label="l('Saas.texts.Edition')" name="editionId">
                  <f-select
                    ref="roleId"
                    v-model:value="form.editionId"
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    :show-arrow="true"
                    :dataSource="editionDataSource"
                    @change="selectEditionChange"
                  />
                </a-form-item>
                <!--租户管理员的电子邮件地址 * -->
                <a-form-item
                  v-if="types == 'Create'"
                  :label="l('Saas.texts.DisplayName:AdminEmailAddress')"
                  name="adminEmailAddress"
                >
                  <a-input
                    name="adminEmailAddress"
                    v-model:value="form.adminEmailAddress"
                    required
                    :autocomplete="'off'"
                  />
                </a-form-item>
                <!-- 租户管理员密码 * * -->
                <a-form-item
                  v-if="types == 'Create'"
                  :label="l('Saas.texts.DisplayName:AdminPassword')"
                  name="adminPassword"
                >
                  <a-input-password
                    name="adminPassword"
                    v-model:value="form.adminPassword"
                    type="password"
                    required
                    :autocomplete="'off'"
                  >
                    <template #prefix>
                      <LockOutlined class="user-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
                <!-- 租户激活状态 * -->
                <a-form-item
                  :label="l('Saas.texts.DisplayName:ActivationState')"
                  name="activationState"
                >
                  <f-enum-select
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    :type="'TenantActivationStateEnum'"
                    label-field="displayName"
                    value-field="key"
                    v-model:value="form.activationState"
                  />
                </a-form-item>
                <!-- 租户激活结束日期 * -->
                <a-form-item
                  v-if="form.activationState == 1"
                  :label="l('Saas.texts.DisplayName:ActivationEndDate')"
                  name="activationEndDate"
                >
                  <f-date-picker
                    endOfDay
                    name="activationEndDate"
                    style="width: 100%"
                    v-model:value="form.activationEndDate"
                  />
                </a-form-item>
              </a-tab-pane>
              <!-- 连接字符串 -->
              <a-tab-pane
                v-if="types == 'Create' || types == 'ConnectionString'"
                :tab="l('Saas.texts.ConnectionStrings')"
                key="link"
              >
                <a-checkbox v-model:checked="isDatabases">
                  {{ l('Saas.texts.DisplayName:UseSharedDatabase') }}
                </a-checkbox>
                <a-form-item
                  style="margin-top: 20px"
                  v-if="!isDatabases && types == 'Create'"
                  :label="l('Saas.texts.DisplayName:Default')"
                  name="default"
                >
                  <a-input
                    name="default"
                    v-model:value="form.connectionStrings.default"
                    :autocomplete="'off'"
                  />
                  <a-button
                    style="margin-top: 20px"
                    :loading="saving"
                    :type="'primary'"
                    @click="testConnect(form.connectionStrings.default)"
                  >
                    {{ l('Saas.texts.CheckConnectionString') }}
                  </a-button>
                </a-form-item>
                <a-form-item
                  style="width: 100%; margin-top: 20px"
                  v-if="!isDatabases && types == 'ConnectionString'"
                  :label="l('Saas.texts.DisplayName:Default')"
                  name="default"
                >
                  <a-input name="default" v-model:value="form.default" :autocomplete="'off'" />
                  <a-button
                    style="margin-top: 20px"
                    :loading="saving"
                    :type="'primary'"
                    @click="testConnect(form.default)"
                  >
                    {{ l('	Unified.texts.Tenant:Test') }}
                  </a-button>
                </a-form-item>
              </a-tab-pane>
              <!-- 设置密码 -->
              <a-tab-pane
                v-if="types == 'SetPassword'"
                :tab="l('Saas.texts.SetPassword')"
                key="setPassword"
              >
                <!--用户名 * -->
                <a-form-item
                  v-if="types == 'SetPassword'"
                  :label="l('Saas.texts.UserName')"
                  name="username"
                >
                  <a-input name="username" v-model:value="form.username" :autocomplete="'off'" />
                </a-form-item>
                <!-- 密码 -->
                <a-form-item
                  v-if="types == 'SetPassword'"
                  :label="l('Saas.texts.Password')"
                  name="password"
                >
                  <a-input-password
                    name="password"
                    v-model:value="form.password"
                    type="password"
                    :autocomplete="'off'"
                  >
                    <template #prefix>
                      <LockOutlined class="user-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-tab-pane>
              <!-- 此用户登录 -->
              <a-tab-pane v-if="types == 'UseLogIn'" key="useLogIn">
                <!--用户名 * -->
                <a-form-item :label="l('Saas.texts.UserName')" name="username">
                  <a-input name="username" v-model:value="form.username" :autocomplete="'off'" />
                </a-form-item>
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          v-if="types != 'UseLogIn'"
          v-show="showNextStepButton"
          :loading="saving"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="saving" :type="'primary'" htmlType="submit" @click="handleSubmit()">
          <save-outlined />
          <span v-if="types == 'UseLogIn'"> {{ l('Unified.texts.Tenant:LogIn') }} </span>
          <span v-else> {{ l('Unified.texts.Save') }} </span>
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CreateOrEditTenant from './create-or-edit-tenant';

  export default defineComponent({
    name: 'CreateOrEditTenant',
    mixins: [CreateOrEditTenant],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-tenant.less';
</style>
