<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('AbpIdentity.texts.NewUser') : l('Unified.texts.Edit') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- tab切换 -->
      <a-tabs defaultActiveKey="1">
        <!-- 用户信息 -->
        <a-tab-pane key="1">
          <template #tab>
            <user-outlined />
            {{ l('AbpIdentity.texts.UserInformations') }}
          </template>
          <a-form
            ref="formRef"
            labelAlign="right"
            layout="vertical"
            :autocomplete="'off'"
            :rules="rules"
            :label-col="{ style: { width: '200px' } }"
            :model="form"
            @submit="handleSubmit"
          >
            <a-row>
              <a-col :span="24">
                <!-- 用户名 -->
                <a-form-item :label="l('AbpIdentity.texts.UserName')" name="userName">
                  <a-input
                    name="userName"
                    v-model:value="form.userName"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <!-- 名称 -->
                <a-form-item :label="l('AbpIdentity.texts.Name')" name="name">
                  <a-input
                    name="name"
                    v-model:value="form.name"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <!-- 姓氏 -->
                <a-form-item :label="l('AbpIdentity.texts.Surname')" name="surname">
                  <a-input
                    name="surname"
                    v-model:value="form.surname"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-if="id == null">
              <a-col :span="24">
                <!-- 密码 -->
                <a-form-item
                  :label="l('AbpIdentity.texts.Password')"
                  name="password"
                  :rules="passwordRules"
                >
                  <a-input-password
                    name="password"
                    v-model:value="form.password"
                    type="password"
                    :autocomplete="'off'"
                  >
                    <template #prefix><LockOutlined class="user-icon" /></template>
                  </a-input-password>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <!-- 电子邮件地址 -->
                <a-form-item :label="l('AbpIdentity.texts.EmailAddress')" name="email">
                  <a-input
                    name="email"
                    v-model:value="form.email"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <!-- 电话号码 -->
                <a-form-item :label="l('AbpIdentity.texts.PhoneNumber')" name="phoneNumber">
                  <a-input
                    name="phoneNumber"
                    v-model:value="form.phoneNumber"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <!-- 启用 -->
                <a-form-item>
                  <template #label>
                    {{ l('AbpIdentity.texts.DisplayName:IsActive') }}
                  </template>
                  <a-switch
                    v-model:checked="form.isActive"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <!-- 账户锁定 -->
                <a-form-item>
                  <template #label>
                    {{ l('AbpIdentity.texts.DisplayName:LockoutEnabled') }}
                    <a-tooltip>
                      <template #title>{{
                        l('AbpIdentity.texts.Description:LockoutEnabled')
                      }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="form.lockoutEnabled"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <!-- 电子邮件已确认 -->
                <a-form-item>
                  <template #label>
                    {{ l('AbpIdentity.texts.EmailConfirmed') }}
                  </template>
                  <a-switch
                    v-model:checked="form.emailConfirmed"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <!-- 电话号码已确认 -->
                <a-form-item>
                  <template #label>
                    {{ l('AbpIdentity.texts.DisplayName:PhoneNumberConfirmed') }}
                  </template>
                  <a-switch
                    v-model:checked="form.phoneNumberConfirmed"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <!-- 强制更改密码 -->
                <a-form-item>
                  <template #label>
                    {{ l('AbpIdentity.texts.DisplayName:ShouldChangePasswordOnNextLogin') }}
                    <a-tooltip>
                      <template #title>{{
                        l('AbpIdentity.texts.Description:ShouldChangePasswordOnNextLogin')
                      }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="form.shouldChangePasswordOnNextLogin"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-tab-pane>
        <!-- 角色 -->
        <a-tab-pane key="2" v-if="isGrantedAny('AbpIdentity.Users.Update.ManageRoles')">
          <template #tab>
            <a-badge :count="checkedRoles.length">
              <medicine-box-outlined />
              {{ l('AbpIdentity.texts.Roles') }}
            </a-badge>
          </template>
          <a-checkbox-group v-model:value="checkedRoles">
            <a-row>
              <a-col v-for="option in roleList" :span="6" :key="option.value">
                <a-tooltip>
                  <template #title>{{ option.label }}</template>
                  <a-checkbox :value="option.value" :disabled="option.disabled">
                    {{ option.label }}
                  </a-checkbox>
                </a-tooltip>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-tab-pane>
        <!-- 组织单元 -->
        <a-tab-pane key="3" v-if="isGrantedAny('AbpIdentity.Users.Update.ManageOU')">
          <template #tab>
            <share-alt-outlined />
            {{ l('AbpIdentity.texts.OrganizationUnits') }}
          </template>
          <f-organization-unit-tree
            :multiple="true"
            :dropDownStyle="{ 'max-height': '500px' }"
            :data="organizationData"
            @selected-unit-change="refreshGoFirstPage"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="saving"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="saving" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CreateOrEditUser from './create-or-edit-user';

  export default defineComponent({
    name: 'CreateOrEditUser',
    mixins: [CreateOrEditUser],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-user.less';
</style>
