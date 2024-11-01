<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('AbpOpenIddict.texts.NewApplication') : l('Edit') }}
      </div>
    </div>

    <div class="modal-body">
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
          <a-col :span="11">
            <!-- 应用类型 * -->
            <a-form-item :label="l('Unified.texts.ApplicationType')" name="applicationType">
              <f-enum-select
                v-model:value="form.applicationType"
                show-search
                optionFilterProp="label"
                label-field="label"
                value-field="value"
                class="w-full"
                :options="[
                  { label: 'Web', value: 'web' },
                  { label: 'Native', value: 'native' },
                ]"
              />
            </a-form-item>

            <!-- Client Id * -->
            <a-form-item :label="l('AbpOpenIddict.texts.ClientId')" name="clientId">
              <a-input name="clientId" v-model:value="form.clientId" :autocomplete="'off'" />
            </a-form-item>
            <!-- 显示名称 * -->
            <a-form-item :label="l('AbpOpenIddict.texts.DisplayName')" name="displayName">
              <a-input name="displayName" v-model:value="form.displayName" :autocomplete="'off'" />
            </a-form-item>
            <!-- 客户端URL * -->
            <a-form-item :label="l('AbpOpenIddict.texts.ClientUri')" name="clientUri">
              <a-input name="clientUri" v-model:value="form.clientUri" :autocomplete="'off'" />
            </a-form-item>
            <!-- Logo Uri * -->
            <a-form-item :label="l('AbpOpenIddict.texts.LogoUri')" name="logoUri">
              <a-input name="logoUri" v-model:value="form.logoUri" :autocomplete="'off'" />
            </a-form-item>
            <!-- 客户端类型 * -->
            <a-form-item :label="l('Unified.texts.ClientType')" name="clientType">
              <f-enum-select
                v-model:value="form.clientType"
                show-search
                optionFilterProp="label"
                label-field="label"
                value-field="value"
                class="w-full"
                :options="[
                  { label: 'Public client', value: 'public' },
                  { label: 'Confidential client', value: 'confidential' },
                ]"
                @change="clientTypeChange"
              />
            </a-form-item>
            <!-- 客户端机密 -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.ClientSecret')"
              name="clientSecret"
              v-if="form.clientType == 'Confidential'"
            >
              <a-input
                name="clientSecret"
                v-model:value="form.clientSecret"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="2" />
          <a-col :span="11">
            <!-- 允许授权码流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowAuthorizationCodeFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowAuthorizationCodeFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 允许隐式流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowImplicitFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowImplicitFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 允许混合流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowHybridFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowHybridFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 允许密码流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowPasswordFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowPasswordFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 允许客户端凭据流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowClientCredentialsFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowClientCredentialsFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 允许刷新令牌流程 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowRefreshTokenFlow') }}
              </template>
              <a-switch
                v-model:checked="form.allowRefreshTokenFlow"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
                :disabled="isRefreshToken()"
              />
            </a-form-item>

            <!-- 允许设备端点 -->
            <a-form-item>
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowDeviceEndpoint') }}
              </template>
              <a-switch
                v-model:checked="form.allowDeviceEndpoint"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 同意类型 -->
            <a-form-item v-if="isAgree()">
              <template #label>
                {{ l('AbpOpenIddict.texts.ConsentType') }}
              </template>
              <f-enum-select
                v-model:value="form.consentType"
                show-search
                optionFilterProp="label"
                label-field="label"
                value-field="value"
                class="w-full"
                :options="[
                  { label: 'Explicit consent', value: 'explicit' },
                  { label: 'External consent', value: 'external' },
                  { label: 'Implicit consent', value: 'implicit' },
                  { label: 'Systematic consent', value: 'systematic' },
                ]"
              />
            </a-form-item>

            <!-- 扩展授权类型 -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.ExtensionGrantTypes')"
              name="extensionGrantTypes"
            >
              <a-textarea v-model:value="formattedExtensionGrantTypes" :rows="3" />
            </a-form-item>

            <!-- 范围 -->
            <a-form-item :label="l('AbpOpenIddict.texts.Scopes')" name="scopes">
              <f-select
                v-model:value="form.scopes"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="scopesDataSource"
                mode="multiple"
                size="middle"
                style="width: 100%"
              />
            </a-form-item>

            <!-- 重定向 Uris -->
            <a-form-item
              v-if="isAgree()"
              :label="l('AbpOpenIddict.texts.RedirectUris')"
              name="redirectUris"
            >
              <a-textarea v-model:value="formattedRedirectUris" :rows="3" />
            </a-form-item>

            <!-- 允许注销端点 -->
            <a-form-item v-if="isAgree()">
              <template #label>
                {{ l('AbpOpenIddict.texts.AllowLogoutEndpoint') }}
              </template>
              <a-switch
                v-model:checked="form.allowLogoutEndpoint"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>

            <!-- 注销后Url -->
            <a-form-item v-if="form.allowLogoutEndpoint">
              <a-textarea v-model:value="formattedPostLogoutRedirectUris" :rows="3" />
            </a-form-item>

            <!-- Enabled -->
            <a-form-item v-if="id != null">
              <template #label>
                {{ l('Enabled') }}
              </template>
              <a-switch
                v-model:checked="editForm.enabled"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
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
  import CreateOpenIddictModalMixin from './CreateOpenIddictModal';

  export default defineComponent({
    name: 'Scopes',
    mixins: [CreateOpenIddictModalMixin],
  });
</script>

<style scoped lang="less"></style>
