<template>
  <a-spin :spinning="loading">
    <div>
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
            <!-- 用户名 * -->
            <a-form-item
              :label="l('AbpIdentity.texts.DisplayName:UserName')"
              name="userName"
              :required="true"
            >
              <a-input
                :disabled="isUserNameUpdateEnabled()"
                name="userName"
                size="large"
                v-model:value="form.userName"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 名称 -->
            <a-row>
              <a-col :span="11">
                <a-form-item :label="l('AbpIdentity.texts.Name')" name="name">
                  <a-input
                    name="name"
                    size="large"
                    v-model:value="form.name"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="2" />
              <!-- 姓氏 -->
              <a-col :span="11">
                <a-form-item :label="l('AbpIdentity.texts.DisplayName:Surname')" name="surname">
                  <a-input
                    name="surname"
                    size="large"
                    v-model:value="form.surname"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <!-- 电子邮件 * -->
            <a-form-item
              :label="l('AbpIdentity.texts.DisplayName:Email')"
              name="email"
              :required="true"
            >
              <a-input-group compact>
                <a-input
                  :disabled="isEmailUpdateEnabled()"
                  name="email"
                  size="large"
                  :style="getEmailStyle"
                  v-model:value="form.email"
                />
                <a-button
                  @click="postSendEmail"
                  size="large"
                  type="primary"
                  style="width: 10%"
                  v-if="
                    !isEmailUpdateEnabled() &&
                    form.email &&
                    form.email === copyForm.email &&
                    sendEmail
                  "
                >
                  <template #icon>
                    <IdcardOutlined />
                  </template>
                  {{ l('AbpAccount.texts.Verify') }}
                </a-button>
              </a-input-group>
            </a-form-item>
            <!-- 电话号码 * -->
            <a-form-item :label="l('AbpIdentity.texts.DisplayName:PhoneNumber')" name="phoneNumber">
              <a-input-group compact>
                <a-input
                  name="phoneNumber"
                  size="large"
                  :style="getPhoneNumberStyle"
                  v-model:value="form.phoneNumber"
                />
                <a-button
                  size="large"
                  type="primary"
                  @click="postSendPhoneNumber"
                  style="width: 10%"
                  v-if="form.phoneNumber && copyForm.phoneNumber === form.phoneNumber"
                >
                  <template #icon>
                    <IdcardOutlined />
                  </template>
                  {{ l('AbpAccount.texts.Verify') }}
                </a-button>
              </a-input-group>
            </a-form-item>
            <!-- 时区 -->
            <!-- <a-form-item
              :label="l('AbpSettingManagement.texts.DisplayName:Timezone')"
              name="timezone"
            >
              <a-select ref="select" v-model:value="form.timezone" style="width: 100%">
                <template v-for="item in timeZoneList" :key="item.value">
                  <a-select-option :value="item.id">{{ item.name }}</a-select-option>
                </template>
              </a-select>
            </a-form-item> -->
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-button :loading="saving" :type="'primary'" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.common:saveText') }}
      </a-button>
    </div>
    <a-modal
      :visible="confirmationPhone"
      :title="l('AbpAccount.texts.Verify')"
      @cancel="confirmationPhoneCancel"
    >
      <a-form
        ref="phoneForm"
        :model="phoneTokenForm"
        labelAlign="right"
        layout="vertical"
        @submit="submitPostSendPhoneNumber"
      >
        <div class="mb-4"> {{ l('Unified.texts.verificationTip') }} </div>
        <a-form-item
          :label="l('Unified.texts.verificationTipContent')"
          name="token"
          :required="true"
        >
          <a-input-number
            size="large"
            :max="999999"
            :precision="0"
            :controls="false"
            v-model:value="phoneTokenForm.token"
            :autocomplete="'off'"
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="close" @click="confirmationPhoneCancel">{{
          l('Unified.texts.Close')
        }}</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="phoneLoading"
          @click="submitPostSendPhoneNumber"
          >{{ l('Unified.texts.Save') }}</a-button
        >
      </template>
    </a-modal>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PersonalInfoMixin from './personalInfo';

  export default defineComponent({
    name: 'Account',
    mixins: [PersonalInfoMixin],
  });
</script>
<style scoped lang="less">
  @import './personalInfo.less';
</style>
