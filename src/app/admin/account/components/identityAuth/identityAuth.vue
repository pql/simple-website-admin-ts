<template>
  <a-spin :spinning="loading">
    <a-radio-group
      v-model:value="stepIndex"
      button-style="solid"
      class="step-btn"
      @change="handleChange"
    >
      <a-radio-button
        :value="item.id"
        v-for="item in tabList"
        :key="item.id"
        :disabled="item.disabled"
      >
        {{ l('AbpAccount.texts.Step') }}{{ item.id }}
        <div class="btn-label-desc">{{ l(item.description) }}</div>
      </a-radio-button>
    </a-radio-group>
    <a-row v-if="stepIndex == 1">
      <a-col :span="24" style="margin-bottom: 15px">
        <h3 class="title-h3"> Authenticator</h3>
        <div>{{ l('AbpAccount.texts.UseTwoFactorAuthenticatorApp_Information') }}</div>
      </a-col>
      <a-col :span="11">
        <a-card style="width: 100%; height: 360px">
          <div>
            <span>{{ l('AbpAccount.texts.UseQrCode') }}</span>
            <div style="text-align: center; margin-top: 20px">
              <Image
                class="current-profile-picture"
                :width="250"
                :src="qrImg"
                fallback="data:image/png;base64,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"
              />
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="2">
        <div class="disCenter">Or</div>
      </a-col>
      <a-col :span="11">
        <a-card style="width: 100%; height: 360px">
          <div>
            <span>{{ l('AbpAccount.texts.ManuallyEnterCode') }}</span>
            <div style="margin-top: 20px">
              <a-textarea
                class="centered-text"
                v-model:value="qrCode"
                :readonly="true"
                :auto-size="{ minRows: 2, maxRows: 3 }"
              />
              <a-button type="primary" @click="copy('qrCode')">{{
                l('AbpAccount.texts.CopyToClipboard')
              }}</a-button>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row v-if="stepIndex == 2">
      <a-col :span="24" style="margin-bottom: 15px">
        <h3 class="title-h3">{{ l('AbpAccount.texts.VerifyTheAuthenticator') }}</h3>
        <div>{{ l('AbpAccount.texts.UseTwoFactorAuthenticatorApp_Code') }}</div>
      </a-col>
      <a-col :span="24">
        <div>{{ l('AbpAccount.texts.Code') }}</div>
        <a-input-group compact>
          <a-input v-model:value="verificationCode" style="width: 50%" />
          <a-button
            type="primary"
            style="width: 10%"
            :loading="saveloading"
            @click="verification"
            >{{ l('AbpAccount.texts.Verify') }}</a-button
          >
        </a-input-group>
      </a-col>
    </a-row>
    <a-row v-if="stepIndex == 3">
      <a-col :span="24" style="margin-bottom: 15px">
        <h3 class="title-h3">{{ l('Unified.texts.Account:IdentityAuth:RecoveryCode') }}</h3>
        <div>{{ l('Unified.texts.Account:IdentityAuth:RecoveryCodeDesc') }}</div>
      </a-col>
      <a-col :span="24">
        <a-card style="width: 100%; height: 260px">
          <a-row style="margin-bottom: 20px">
            <a-col :span="24" style="text-align: right">
              <a-button type="primary" @click="copy">{{ l('Unified.texts.Copy') }}</a-button>
            </a-col>
          </a-row>
          <div>
            <a-input
              v-model:value="verificationCode"
              size="large"
              :readonly="true"
              style="width: 100%"
            />
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row style="margin-top: 20px">
      <a-col :span="24" style="text-align: right">
        <a-button
          v-if="stepIndex === 3"
          ype="primary"
          size="large"
          :disabled="true"
          @click="nextClick"
        >
          {{ l('Unified.texts.Account:IdentityAuth:Completed') }}
        </a-button>
        <a-button v-else type="primary" size="large" :disabled="nextDisabled" @click="nextClick">
          {{ l('AbpAccount.texts.NextStep') }}
          <ArrowRightOutlined />
        </a-button>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import IdentityAuthMixin from './identityAuth';
  export default defineComponent({
    name: 'Account',
    mixins: [IdentityAuthMixin],
  });
</script>
<style scoped lang="less">
  @import './identityAuth.less';
</style>
