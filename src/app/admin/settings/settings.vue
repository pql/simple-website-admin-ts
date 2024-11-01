<template>
  <a-spin :spinning="loading">
    <a-card :title="l('Unified.texts.SettingMenuTitle')" class="card-div">
      <a-row>
        <a-col :span="8">
          <a-menu
            mode="inline"
            class="w-full"
            v-model:selectedKeys="selectedKeys"
            @select="selectChange"
          >
            <a-menu-item key="functionManagement" v-if="isFeatureManagement">
              <template #icon> </template>
              <span>{{ l('AbpFeatureManagement.texts.Menu:FeatureManagement') }}</span>
            </a-menu-item>
            <a-menu-item key="auditLog" v-if="isAuditLog">
              <template #icon> </template>
              <span>{{ l('AbpAuditLogging.texts.AuditLogs') }}</span>
            </a-menu-item>
            <a-menu-item key="account">
              <template #icon> </template>
              <span>{{ l('AbpAccount.texts.Permission:Account') }}</span>
            </a-menu-item>
            <a-menu-item key="identityManagement">
              <template #icon> </template>
              <span>{{ l('AbpIdentity.texts.Menu:IdentityManagement') }}</span>
            </a-menu-item>
            <a-menu-item key="eMail">
              <template #icon> </template>
              <span>{{ l('AbpSettingManagement.texts.Menu:Emailing') }}</span>
            </a-menu-item>
          </a-menu>
        </a-col>
        <a-col :span="16">
          <div class="a-col-left my-5">
            <!-- 功能管理 -->
            <div v-if="itemKey == 'functionManagement'">
              <a-row>
                <a-col :span="24">
                  {{ l('AbpFeatureManagement.texts.ManageHostFeaturesText') }}</a-col
                >
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-button
                    :loading="saving"
                    class="mt-2"
                    :type="'primary'"
                    @click="managementHostFunction"
                  >
                    <save-outlined />
                    {{ l('AbpFeatureManagement.texts.ManageHostFeatures') }}
                  </a-button>
                </a-col>
              </a-row>
            </div>
            <!-- 审计日志 -->
            <div v-if="itemKey == 'auditLog'">
              <a-row>
                <a-col :span="24">
                  <a-tabs v-model:activeKey="tabsAuditLogActionKey" @change="disposePort()">
                    <!-- Global -->
                    <a-tab-pane key="global">
                      <template #tab>
                        {{ l('AbpAuditLogging.texts.AuditLogSettingsGlobal') }}
                      </template>
                      <div>
                        <a-row class="my-2">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="auditLogSetting.isPeriodicDeleterEnabled">
                              {{ l('AbpAuditLogging.texts.DisplayName:IsPeriodicDeleterEnabled') }}
                            </a-checkbox>
                            <h5>
                              {{
                                l('AbpAuditLogging.texts.Description:IsPeriodicDeleterEnabled')
                              }}</h5
                            >
                          </a-col>
                        </a-row>
                        <a-row class="my-2" v-if="auditLogSetting.isPeriodicDeleterEnabled">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="auditLogSetting.isExpiredDeleterEnabled">
                              {{
                                l('AbpAuditLogging.texts.DisplayName:GlobalIsExpiredDeleterEnabled')
                              }}
                            </a-checkbox>
                            <h5>
                              {{
                                l('AbpAuditLogging.texts.Description:GlobalIsExpiredDeleterEnabled')
                              }}</h5
                            >
                          </a-col>
                        </a-row>
                        <a-row
                          class="my-2"
                          v-if="
                            auditLogSetting.isExpiredDeleterEnabled &&
                            auditLogSetting.isPeriodicDeleterEnabled
                          "
                        >
                          <a-col :span="24">
                            {{ l('AbpAuditLogging.texts.DisplayName:ExpiredDeleterPeriod') }}
                            <a-input
                              type="number"
                              class="w-6/12"
                              v-model:value="auditLogSetting.expiredDeleterPeriod"
                              :autocomplete="'off'"
                            />
                            {{ l('AbpAuditLogging.texts.ExpiredDeleterPeriodUnit') }}
                            <h5> {{ l('AbpAuditLogging.texts.AuditLogsBeforeXWillBeDeleted') }}</h5>
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                    <!-- General -->
                    <a-tab-pane key="general">
                      <template #tab>
                        {{ l('AbpAuditLogging.texts.AuditLogSettingsGeneral') }}
                      </template>
                      <div>
                        <a-row class="my-2">
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="auditLogGeneralSetting.isExpiredDeleterEnabled"
                            >
                              {{ l('AbpAuditLogging.texts.DisplayName:IsExpiredDeleterEnabled') }}
                            </a-checkbox>
                            <h5>
                              {{
                                l('AbpAuditLogging.texts.Description:IsExpiredDeleterEnabled')
                              }}</h5
                            >
                          </a-col>
                        </a-row>
                        <a-row class="my-2" v-if="auditLogGeneralSetting.isExpiredDeleterEnabled">
                          <a-col :span="24">
                            {{ l('AbpAuditLogging.texts.DisplayName:ExpiredDeleterPeriod') }}
                            <a-input
                              type="number"
                              class="w-6/12"
                              v-model:value="auditLogGeneralSetting.expiredDeleterPeriod"
                              :autocomplete="'off'"
                            />
                            {{ l('AbpAuditLogging.texts.ExpiredDeleterPeriodUnit') }}
                            <h5> {{ l('AbpAuditLogging.texts.AuditLogsBeforeXWillBeDeleted') }}</h5>
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>
            </div>
            <!-- 账户 -->
            <div v-else-if="itemKey == 'account'">
              <a-row>
                <a-col :span="24">
                  <a-tabs v-model:activeKey="tabsAccountActionKey" @change="disposePort()">
                    <!-- 通用 -->
                    <a-tab-pane key="general">
                      <template #tab>
                        {{ l('AbpAccount.texts.AccountSettingsGeneral') }}
                      </template>
                      <div>
                        <a-row>
                          <a-col :span="24">
                            <h2> {{ l('AbpAccount.texts.AccountSettingsGeneral') }}</h2>
                          </a-col>
                        </a-row>
                        <a-row class="my-2">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="accountSetting.isSelfRegistrationEnabled">
                              {{ l('AbpAccount.texts.DisplayName:IsSelfRegistrationEnabled') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="my-2">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="accountSetting.enableLocalLogin">
                              {{ l('AbpAccount.texts.DisplayName:EnableLocalLogin') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="my-2">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="accountSetting.preventEmailEnumeration">
                              {{ l('AbpAccount.texts.DisplayName:PreventEmailEnumeration') }}
                            </a-checkbox>
                            <h5>{{ l('AbpAccount.texts.Description:PreventEmailEnumeration') }}</h5>
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                    <!-- 双因素 -->
                    <a-tab-pane v-if="isTwoFactor" key="twoFactor">
                      <template #tab>
                        {{ l('AbpAccount.texts.AccountSettingsTwoFactor') }}
                      </template>
                      <div>
                        <a-row>
                          <a-col :span="24">
                            <h2> {{ l('AbpAccount.texts.TwoFactorAuthentication') }}</h2>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            {{ l('AbpIdentity.texts.Feature:TwoFactor') }}
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <f-enum-select
                              class="w-6/12"
                              allow-clear
                              show-search
                              optionFilterProp="displayName"
                              :type="'SettingTwoFactorEnum'"
                              label-field="displayName"
                              value-field="key"
                              v-model:value="accountTwoFactorSetting.twoFactorBehaviour"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="my-3" v-if="accountTwoFactorSetting.twoFactorBehaviour == 0">
                          <a-col :span="24">
                            <a-checkbox v-model:checked="accountTwoFactorSetting.usersCanChange">
                              {{ l('Unified.texts.DisplayName:Abp:Identity:UsersCanChange') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="my-3">
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="accountTwoFactorSetting.isRememberBrowserEnabled"
                            >
                              {{ l('AbpAccount.texts.RememberBrowser') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                    <!-- 验证码 -->
                    <a-tab-pane key="verificationCode">
                      <template #tab>
                        {{ l('AbpAccount.texts.Captcha') }}
                      </template>
                      <div>
                        <a-row>
                          <a-col :span="24">
                            <h2> {{ l('AbpAccount.texts.Captcha') }}</h2>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-checkbox v-model:checked="accountRecaptchaSetting.useCaptchaOnLogin">
                              {{ l('AbpAccount.texts.DisplayName:UseCaptchaOnLogin') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="my-3">
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="accountRecaptchaSetting.useCaptchaOnRegistration"
                            >
                              {{ l('AbpAccount.texts.DisplayName:UseCaptchaOnRegistration') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('AbpAccount.texts.DisplayName:VerificationUrl') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountRecaptchaSetting.verifyBaseUrl"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('AbpAccount.texts.DisplayName:Version') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <f-enum-select
                              class="w-6/12"
                              allow-clear
                              show-search
                              optionFilterProp="key"
                              :type="'SettingVersionEnum'"
                              label-field="key"
                              value-field="key"
                              v-model:value="accountRecaptchaSetting.version"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('AbpAccount.texts.DisplayName:SiteKey') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountRecaptchaSetting.siteKey"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <h5> {{ l('AbpAccount.texts.SetNullWillUseGlobalSettings') }}</h5>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('AbpAccount.texts.DisplayName:SiteSecret') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountRecaptchaSetting.siteSecret"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <h5> {{ l('AbpAccount.texts.SetNullWillUseGlobalSettings') }}</h5>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('AbpAccount.texts.DisplayName:Score') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              name="marks"
                              class="w-6/12"
                              type="number"
                              v-model:value="accountRecaptchaSetting.score"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                    <!-- 外部供应商 -->
                    <a-tab-pane key="externalSupplier">
                      <template #tab>
                        {{ l('AbpAccount.texts.AccountExternalProviderSettings') }}
                      </template>
                      <div>
                        <a-row>
                          <a-col :span="24">
                            <h2> {{ l('Unified.texts.ExternalProvider:Google') }}</h2>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="accountExternalProviderSettingDto.google.enabled"
                            >
                              {{ l('AbpAccount.texts.ExternalProviderEnabled') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.ClientId') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountExternalProviderSettingDto.google.clientId"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.ClientSecret') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input-password
                              class="w-6/12"
                              v-model:value="accountExternalProviderSettingDto.google.clientSecret"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="space-between30">
                          <a-col :span="24">
                            <h3> {{ l('Unified.texts.ExternalProvider:Microsoft') }}</h3>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="accountExternalProviderSettingDto.microsoft.enabled"
                            >
                              {{ l('AbpAccount.texts.ExternalProviderEnabled') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.ClientId') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountExternalProviderSettingDto.microsoft.clientId"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.ClientSecret') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input-password
                              class="w-6/12"
                              v-model:value="
                                accountExternalProviderSettingDto.microsoft.clientSecret
                              "
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="space-between30">
                          <a-col :span="24">
                            <h3> {{ l('Unified.texts.ExternalProvider:Twitter') }}</h3>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-checkbox
                              v-model:checked="accountExternalProviderSettingDto.twitter.enabled"
                            >
                              {{ l('AbpAccount.texts.ExternalProviderEnabled') }}
                            </a-checkbox>
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.Setting:ConsumerKey') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input
                              class="w-6/12"
                              v-model:value="accountExternalProviderSettingDto.twitter.consumerKey"
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                        <a-row class="mt-5">
                          <a-col :span="24">
                            <h4>{{ l('Unified.texts.Setting:ConsumerSecret') }}</h4>
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col :span="24">
                            <a-input-password
                              class="w-6/12"
                              v-model:value="
                                accountExternalProviderSettingDto.twitter.consumerSecret
                              "
                              :autocomplete="'off'"
                            />
                          </a-col>
                        </a-row>
                      </div>
                    </a-tab-pane>
                  </a-tabs>
                </a-col>
              </a-row>
            </div>
            <!-- 身份管理 -->
            <div v-else-if="itemKey == 'identityManagement'">
              <a-tabs v-model:activeKey="tabsIdentityActionKey" @change="disposePort()">
                <!-- 通用 -->
                <a-tab-pane key="general">
                  <template #tab>
                    {{ l('AbpIdentity.texts.IdentitySettingsGeneral') }}
                  </template>
                  <div>
                    <a-row>
                      <a-col :span="24">
                        <h2> {{ l('AbpIdentity.texts.PasswordSettings') }}</h2>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>
                          {{
                            l('Unified.texts.DisplayName:Abp:Identity:Password:RequiredLength')
                          }}</h4
                        >
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          type="number"
                          v-model:value="identitySetting!.password!.requiredLength"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l('Unified.texts.Description:Abp:Identity:Password:RequiredLength')
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>
                          {{
                            l('Unified.texts.DisplayName:Abp:Identity:Password:RequiredUniqueChars')
                          }}</h4
                        >
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          type="number"
                          v-model:value="identitySetting!.password!.requiredUniqueChars"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l('Unified.texts.Description:Abp:Identity:Password:RequiredUniqueChars')
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="identitySetting!.password!.requireNonAlphanumeric"
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Password:RequireNonAlphanumeric',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l(
                              'Unified.texts.Description:Abp:Identity:Password:RequireNonAlphanumeric',
                            )
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identitySetting!.password!.requireLowercase">
                          {{
                            l('Unified.texts.DisplayName:Abp:Identity:Password:RequireLowercase')
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:Password:RequireLowercase')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identitySetting!.password!.requireUppercase">
                          {{
                            l('Unified.texts.DisplayName:Abp:Identity:Password:RequireUppercase')
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:Password:RequireUppercase')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identitySetting!.password!.requireDigit">
                          {{ l('Unified.texts.DisplayName:Abp:Identity:Password:RequireDigit') }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:Password:RequireDigit')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <hr class="hrs" />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h2> {{ l('AbpIdentity.texts.PasswordRenewingSettings') }}</h2>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="
                            identitySetting!.password!.forceUsersToPeriodicallyChangePassword
                          "
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Password:ForceUsersToPeriodicallyChangePassword',
                            )
                          }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l(
                              'Unified.texts.Description:Abp:Identity:Password:ForceUsersToPeriodicallyChangePassword',
                            )
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Password:PasswordChangePeriodDays',
                            )
                          }}</h4
                        >
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          type="number"
                          v-model:value="identitySetting!.password!.passwordChangePeriodDays"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l(
                              'Unified.texts.Description:Abp:Identity:Password:PasswordChangePeriodDays',
                            )
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <hr class="hrs" />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h2> {{ l('AbpIdentity.texts.LockoutSettings') }}</h2>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identitySetting!.lockout!.allowedForNewUsers">
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:Lockout:AllowedForNewUsers',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:Lockout:AllowedForNewUsers')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:Lockout:LockoutDuration',
                            )
                          }}</h4
                        >
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          type="number"
                          v-model:value="identitySetting!.lockout!.lockoutDuration"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l('Unified.texts.Description:Abp:Identity:Lockout:LockoutDuration')
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:Lockout:MaxFailedAccessAttempts',
                            )
                          }}</h4
                        >
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          type="number"
                          v-model:value="identitySetting!.lockout!.maxFailedAccessAttempts"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <h5>
                          {{
                            l(
                              'Unified.texts.Description:Abp:Identity:Lockout:MaxFailedAccessAttempts',
                            )
                          }}</h5
                        >
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <hr class="hrs" />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h2> {{ l('AbpIdentity.texts.SignInSettings') }}</h2>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="identitySetting!.signIn!.requireConfirmedEmail"
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:SignIn:RequireConfirmedEmail',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:SignIn:RequireConfirmedEmail')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="identitySetting!.signIn!.enablePhoneNumberConfirmation"
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:SignIn:EnablePhoneNumberConfirmation',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l(
                              'Unified.texts.Description:Abp:Identity:SignIn:EnablePhoneNumberConfirmation',
                            )
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="identitySetting!.signIn!.requireConfirmedPhoneNumber"
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:SignIn:RequireConfirmedPhoneNumber',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l(
                              'Unified.texts.Description:Abp:Identity:SignIn:RequireConfirmedPhoneNumber',
                            )
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <hr class="hrs" />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h2> {{ l('AbpIdentity.texts.UserSettings') }}</h2>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox
                          v-model:checked="identitySetting!.user!.isUserNameUpdateEnabled"
                        >
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:User:IsEmailUpdateEnabled',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:User:IsEmailUpdateEnabled')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identitySetting!.user!.isEmailUpdateEnabled">
                          {{
                            l(
                              'Unified.texts.DisplayName:Abp:Identity:Lockout:User:IsUserNameUpdateEnabled',
                            )
                          }}
                        </a-checkbox>
                        <span class="spen-left">
                          <h5>{{
                            l('Unified.texts.Description:Abp:Identity:User:IsUserNameUpdateEnabled')
                          }}</h5>
                        </span>
                      </a-col>
                    </a-row>
                  </div>
                </a-tab-pane>
                <!-- 会话 -->
                <a-tab-pane key="session">
                  <template #tab>
                    {{ l('AbpIdentity.texts.IdentitySettingsSessions') }}
                  </template>
                  <div>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>{{
                          l('Unified.texts.DisplayName:Abp:Identity:PreventConcurrentLogin')
                        }}</h4>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <f-enum-select
                          class="w-6/12"
                          allow-clear
                          show-search
                          optionFilterProp="displayName"
                          :type="'SettingSessionEnum'"
                          label-field="displayName"
                          value-field="key"
                          v-model:value="sessionSetting.preventConcurrentLogin"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h3>
                          {{
                            l('Unified.texts.Description:Abp:Identity:PreventConcurrentLogin')
                          }}</h3
                        >
                      </a-col>
                    </a-row>

                    <div class="alert alert-danger">
                      <!-- <div> {{ l('Unified.texts.PersonalData:Prompt') }}</div> -->
                      <a-row>
                        <a-col :span="24">
                          <h3>
                            {{
                              l(
                                'Unified.texts.Enum:IdentityProPreventConcurrentLoginBehaviour:Disabled',
                              )
                            }}</h3
                          >
                          <h4>
                            {{
                              l(
                                'Unified.texts.Description:IdentityProPreventConcurrentLoginBehaviour:Disabled',
                              )
                            }}</h4
                          >
                          <hr class="hrs" />
                        </a-col>
                      </a-row>
                      <a-row class="mt-5">
                        <a-col :span="24">
                          <h3>
                            {{
                              l(
                                'Unified.texts.Enum:IdentityProPreventConcurrentLoginBehaviour:LogoutFromSameTypeDevices',
                              )
                            }}</h3
                          >
                          <h4>
                            {{
                              l(
                                'Unified.texts.Description:IdentityProPreventConcurrentLoginBehaviour:LogoutFromSameTypeDevices',
                              )
                            }}</h4
                          >
                          <hr class="hrs" />
                        </a-col>
                      </a-row>
                      <a-row class="mt-5">
                        <a-col :span="24">
                          <h3>
                            {{
                              l(
                                'Unified.texts.Enum:IdentityProPreventConcurrentLoginBehaviour:LogoutFromAllDevices',
                              )
                            }}</h3
                          >
                          <h4>
                            {{
                              l(
                                'Unified.texts.Description:IdentityProPreventConcurrentLoginBehaviour:LogoutFromAllDevices',
                              )
                            }}</h4
                          >
                          <hr class="hrs" />
                        </a-col>
                      </a-row>
                    </div>
                  </div>
                </a-tab-pane>
                <!-- ldap -->
                <a-tab-pane v-if="isLdap" key="ldap">
                  <template #tab>
                    {{ l('AbpIdentity.texts.IdentitySettingsLdap') }}
                  </template>
                  <div>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>{{ l('AbpIdentity.texts.LdapLoginSettings') }}</h4>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityLdapSetting.enableLdapLogin">
                          {{ l('AbpIdentity.texts.Feature:EnableLdapLogin') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityLdapSetting.ldaps">
                          {{ l('Unified.texts.DisplayName:Abp:Ldap:Ldaps') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:ServerHost') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityLdapSetting.ldapServerHost"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:ServerPort') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityLdapSetting.ldapServerPort"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:BaseDc') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityLdapSetting.ldapBaseDc"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:Domain') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityLdapSetting.ldapDomain"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:UserName') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityLdapSetting.ldapUserName"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Ldap:Password') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input-password
                          class="w-6/12"
                          name="adminPassword"
                          v-model:value="identityLdapSetting.ldapPassword"
                          type="password"
                          :autocomplete="'off'"
                        >
                          <template #prefix>
                            <LockOutlined class="user-icon" />
                          </template>
                        </a-input-password>
                      </a-col>
                    </a-row>
                  </div>
                </a-tab-pane>
                <!-- oauth -->
                <a-tab-pane v-if="isOAuth" key="oauth">
                  <template #tab>
                    {{ l('AbpIdentity.texts.IdentitySettingsOAuth') }}
                  </template>
                  <div>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <h4>{{ l('AbpIdentity.texts.OAuthLoginSettings') }}</h4>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityOAuthSetting.enableOAuthLogin">
                          {{ l('Unified.texts.Feature:EnableOAuthLogin') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.ClientId') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityOAuthSetting.clientId"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.ClientSecret') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityOAuthSetting.clientSecret"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Identity:Authority') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityOAuthSetting.authority"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        {{ l('Unified.texts.DisplayName:Abp:Identity:Scope') }}
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-input
                          class="w-6/12"
                          v-model:value="identityOAuthSetting.scope"
                          :autocomplete="'off'"
                        />
                      </a-col>
                    </a-row>
                    <a-row class="mt-5">
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityOAuthSetting.requireHttpsMetadata">
                          {{ l('Unified.texts.DisplayName:Abp:Identity:RequireHttpsMetadata') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityOAuthSetting.validateEndpoints">
                          {{ l('Unified.texts.DisplayName:Abp:Identity:ValidateEndpoints') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="24">
                        <a-checkbox v-model:checked="identityOAuthSetting.validateIssuerName">
                          {{ l('Unified.texts.DisplayName:Abp:Identity:ValidateIssuerName') }}
                        </a-checkbox>
                      </a-col>
                    </a-row>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
            <!-- 邮件 -->
            <div v-else-if="itemKey == 'eMail'">
              <div>
                <a-row>
                  <a-col :span="24">
                    <h4>{{ l('AbpSettingManagement.texts.DefaultFromDisplayName') }} *</h4>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input
                      class="w-6/12"
                      v-model:value="emailSetting.defaultFromDisplayName"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row class="mt-5">
                  <a-col :span="24">
                    <h4>{{ l('AbpSettingManagement.texts.DefaultFromAddress') }} *</h4>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input
                      class="w-6/12"
                      v-model:value="emailSetting.defaultFromAddress"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row class="mt-5">
                  <a-col :span="24">
                    <h4>{{ l('Unified.texts.DisplayName:Abp:Mailing:Smtp:Host') }}</h4>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input
                      class="w-6/12"
                      v-model:value="emailSetting.smtpHost"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row class="mt-5">
                  <a-col :span="24">
                    <h4>{{ l('Unified.texts.DisplayName:Abp:Mailing:Smtp:Port') }} *</h4>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input
                      type="number"
                      class="w-6/12"
                      v-model:value="emailSetting.smtpPort"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row class="mt-5">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="emailSetting.smtpEnableSsl">
                      {{ l('Unified.texts.EnableSSL') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-checkbox v-model:checked="emailSetting.smtpUseDefaultCredentials">
                      {{ l('Unified.texts.DisplayName:Abp:Mailing:Smtp:UseDefaultCredentials') }}
                    </a-checkbox>
                  </a-col>
                </a-row>

                <div v-if="!emailSetting.smtpUseDefaultCredentials">
                  <a-row class="mt-5">
                    <a-col :span="24">
                      <h4>{{ l('Unified.texts.DisplayName:Abp:Mailing:Smtp:Domain') }}</h4>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="24">
                      <a-input
                        class="w-6/12"
                        v-model:value="emailSetting.smtpDomain"
                        :autocomplete="'off'"
                      />
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :span="24">
                      <h4>{{ l('Unified.texts.UserName') }}</h4>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="24">
                      <a-input
                        class="w-6/12"
                        v-model:value="emailSetting.smtpUserName"
                        :autocomplete="'off'"
                      />
                    </a-col>
                  </a-row>
                  <a-row class="mt-5">
                    <a-col :span="24">
                      <h4>{{ l('Unified.texts.DisplayName:Abp:Mailing:Smtp:Password') }}</h4>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="24">
                      <a-input-password
                        type="number"
                        class="w-6/12"
                        v-model:value="emailSetting.smtpPassword"
                        :autocomplete="'off'"
                      />
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
          </div>

          <div class="a-col-left" v-if="itemKey != 'functionManagement' && itemKey != ''">
            <a-button :loading="saving" :type="'primary'" @click="handleSubmit()">
              <save-outlined />
              {{ l('Unified.texts.Save') }}
            </a-button>

            <a-button
              v-if="itemKey == 'eMail'"
              style="margin-left: 20px"
              :loading="saving"
              :type="'primary'"
              @click="sendTestEmail()"
            >
              <MailOutlined />
              {{ l('Unified.texts.SendTestEmail') }}
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Settings from './settings';

  export default defineComponent({
    name: 'Settings',
    mixins: [Settings],
  });
</script>

<style lang="less" scoped>
  @import './settings.less';
</style>
