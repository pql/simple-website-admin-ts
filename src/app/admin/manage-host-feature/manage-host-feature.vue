<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.Features') }}
      </div>
    </div>

    <div class="modal-body">
      <a-card :title="l('Unified.texts.SettingMenuTitle')" :bordered="false">
        <a-row>
          <a-col :span="8">
            <a-menu
              style="width: 100%"
              mode="inline"
              v-model:selectedKeys="selectedKeys"
              @select="selectChange"
            >
              <a-menu-item key="identifyLabel">
                <template #icon> </template>
                <span>{{ l('AbpAccount.texts.MySecurityLogs:Identity') }}</span>
              </a-menu-item>
              <!-- <a-menu-item key="languageManagement">
                <template #icon> </template>
                <span>{{ l('LanguageManagement.texts.Menu:Languages') }}</span>
              </a-menu-item>
              <a-menu-item key="textModuleManagement">
                <template #icon> </template>
                <span>{{
                  l('TextTemplateManagement.texts.Permission:TextTemplateManagement')
                }}</span>
              </a-menu-item> -->
              <a-menu-item key="auditLog">
                <template #icon> </template>
                <span>{{ l('AbpAuditLogging.texts.Feature:AuditLoggingGroup') }}</span>
              </a-menu-item>
              <a-menu-item key="files">
                <template #icon> </template>
                <span>{{ l('FileManagement.texts.Menu:FileManagement') }}</span>
              </a-menu-item>
            </a-menu>
          </a-col>
          <a-col :span="16">
            <div class="a-col-left">
              <!-- 身份标识 -->
              <div v-if="itemKey == 'identifyLabel'">
                <a-row>
                  <a-col :span="24">
                    <h2>{{ l('AbpAccount.texts.MySecurityLogs:Identity') }}</h2>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <hr class="hrs" />
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    {{ l('AbpIdentity.texts.Feature:TwoFactor') }}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <f-enum-select
                      class="a-property"
                      allow-clear
                      show-search
                      optionFilterProp="displayName"
                      :type="'SettingTwoFactorEnum'"
                      label-field="displayName"
                      value-field="displayName"
                      v-model:value="features.identity.twoFactor"
                    />
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{ l('AbpIdentity.texts.Feature:TwoFactorDescription') }}</h5>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    {{ l('AbpIdentity.texts.Feature:MaximumUserCount') }}
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input-number
                      name="marks"
                      class="a-property"
                      v-model:value="features.identity.maxUserCount"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{ l('AbpIdentity.texts.Feature:MaximumUserCountDescription') }}</h5>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <!-- {{ l('Unified.texts.Setting:MaximumUserNumber') }} -->
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.identity.enableLdapLogin">
                      {{ l('AbpIdentity.texts.Feature:EnableLdapLogin') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.identity.enableOAuthLogin">
                      {{ l('AbpIdentity.texts.Feature:EnableOAuthLogin') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
              </div>
              <!-- 语言管理 -->
              <div v-else-if="itemKey == 'languageManagement'">
                <a-row>
                  <a-col :span="24">
                    <h2>{{ l('LanguageManagement.texts.Menu:Languages') }}</h2>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <hr class="hrs" />
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.languageManagement.enable">
                      {{ l('LanguageManagement.texts.Feature:LanguageManagementEnable') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{
                      l('LanguageManagement.texts.Feature:LanguageManagementEnableDescription')
                    }}</h5>
                  </a-col>
                </a-row>
              </div>
              <!-- 文本模块管理 -->
              <div v-else-if="itemKey == 'textModuleManagement'">
                <a-row>
                  <a-col :span="24">
                    <h2>{{
                      l('TextTemplateManagement.texts.Permission:TextTemplateManagement')
                    }}</h2>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <hr class="hrs" />
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.textModuleManagement.enable">
                      {{ l('TextTemplateManagement.texts.Feature:TextManagementEnable') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{
                      l('TextTemplateManagement.texts.Feature:TextManagementEnableDescription')
                    }}</h5>
                  </a-col>
                </a-row>
              </div>
              <!-- 审计日志 -->
              <div v-else-if="itemKey == 'auditLog'">
                <a-row>
                  <a-col :span="24">
                    <h2>{{ l('AbpAuditLogging.texts.Feature:AuditLoggingGroup') }}</h2>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <hr class="hrs" />
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.auditLog.enable">
                      {{ l('AbpAuditLogging.texts.Feature:AuditLoggingEnable') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{ l('AbpAuditLogging.texts.Feature:AuditLoggingEnableDescription') }}</h5>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.auditLog.settingManagement">
                      {{ l('AbpAuditLogging.texts.Feature:AuditLoggingSettingManagementEnable') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{
                      l(
                        'AbpAuditLogging.texts.Feature:AuditLoggingSettingManagementEnableDescription',
                      )
                    }}</h5>
                  </a-col>
                </a-row>
              </div>
              <!-- 文件管理 -->
              <div v-else-if="itemKey == 'files'">
                <a-row>
                  <a-col :span="24">
                    <h2>{{ l('FileManagement.texts.Menu:FileManagement') }}</h2>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <hr class="hrs" />
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <a-checkbox v-model:checked="features.files.enable">
                      {{ l('FileManagement.texts.Feature:FileManagementEnable') }}
                    </a-checkbox>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{ l('FileManagement.texts.Feature:FileManagementEnableDescription') }}</h5>
                  </a-col>
                </a-row>
                <a-row class="space-between">
                  <a-col :span="24">
                    <h3>{{ l('FileManagement.texts.Feature:FileManagementStorageSize') }}</h3>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-input
                      name="marks"
                      class="a-property"
                      v-model:value="features.files.storageSize"
                      :autocomplete="'off'"
                    />
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <h5>{{
                      l('FileManagement.texts.Feature:FileManagementStorageSizeDescription')
                    }}</h5>
                  </a-col>
                </a-row>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-card>
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
  import ManageHostFeature from './manage-host-feature';

  export default defineComponent({
    name: 'ManageHostFeature',
    mixins: [ManageHostFeature],
  });
</script>

<style lang="less" scoped>
  @import './manage-host-feature.less';
</style>
