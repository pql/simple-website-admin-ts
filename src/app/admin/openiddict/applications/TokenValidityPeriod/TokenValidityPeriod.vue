<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpOpenIddict.texts.TokenLifetime') }}
      </div>
    </div>

    <div class="modal-body">
      <div class="token-desc">
        <p>{{ l('AbpOpenIddict.texts.TokenLifetimeHit') }}</p>
      </div>
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="22">
            <!--  AccessToken Lifetime-->
            <a-form-item
              :label="l('AbpOpenIddict.texts.AccessTokenLifetime')"
              name="accessTokenLifetime"
            >
              <a-input
                name="accessTokenLifetime"
                v-model:value="form.accessTokenLifetime"
                :autocomplete="'off'"
                type="number"
              />
            </a-form-item>
            <!-- AuthorizationCode * -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.AuthorizationCodeLifetime')"
              name="authorizationCodeLifetime"
            >
              <a-input
                name="authorizationCodeLifetime"
                v-model:value="form.authorizationCodeLifetime"
                :autocomplete="'off'"
                type="number"
              />
            </a-form-item>
            <!-- DeviceCode * -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.DeviceCodeLifetime')"
              name="deviceCodeLifetime"
            >
              <a-input
                name="deviceCodeLifetime"
                v-model:value="form.deviceCodeLifetime"
                :autocomplete="'off'"
                type="number"
              />
            </a-form-item>
            <!-- IdentityToken  -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.IdentityTokenLifetime')"
              name="identityTokenLifetime"
            >
              <a-input
                name="identityTokenLifetime"
                v-model:value="form.identityTokenLifetime"
                :autocomplete="'off'"
                type="number"
              />
            </a-form-item>
            <!-- RefreshToken   -->
            <a-form-item
              :label="l('AbpOpenIddict.texts.RefreshTokenLifetime')"
              name="refreshTokenLifetime"
            >
              <a-input
                name="refreshTokenLifetime"
                v-model:value="form.refreshTokenLifetime"
                :autocomplete="'off'"
                type="number"
              />
            </a-form-item>
            <!-- UserCode   -->
            <a-form-item :label="l('AbpOpenIddict.texts.UserCodeLifetime')" name="userCodeLifetime">
              <a-input
                name="userCodeLifetime"
                v-model:value="form.userCodeLifetime"
                :autocomplete="'off'"
                type="number"
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
  import TokenValidityPeriodMixin from './TokenValidityPeriod';

  export default defineComponent({
    name: 'TokenValidityPeriod',
    mixins: [TokenValidityPeriodMixin],
  });
</script>

<style scoped lang="less">
  .token-desc {
    margin: 15px 0;
  }
</style>
