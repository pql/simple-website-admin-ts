<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <div class="modal-body modal-body-extra">
      <!-- 表单 -->
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
        <a-tabs v-model:activeKey="tabsActiveKey">
          <!-- Basic Infomation -->
          <a-tab-pane key="BasicInfomation" :forceRender="forceRender">
            <template #tab>
              {{ l('Unified.texts.BasicInfomation') }}
            </template>
            <a-row :gutter="24">
              <a-col :span="8">
                <!-- Name -->
                <a-form-item :label="l('Unified.texts.Name')" name="name">
                  <a-input name="name" v-model:value="form.name" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- FirstName -->
                <a-form-item :label="l('Unified.texts.FirstName')" name="firstName">
                  <a-input name="firstName" v-model:value="form.firstName" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- LastName -->
                <a-form-item :label="l('Unified.texts.LastName')" name="lastName">
                  <a-input name="lastName" v-model:value="form.lastName" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Joined Date -->
                <a-form-item :label="l('Unified.texts.JoinedDate')" name="joinedDate">
                  <f-date-picker class="w-full" name="joinedDate" v-model:value="form.joinedDate" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Position -->
                <a-form-item :label="l('Unified.texts.Position')" name="position">
                  <f-select
                    name="position"
                    mode="multiple"
                    v-model:value="form.position"
                    allow-clear
                    show-search
                    optionFilterProp="key"
                    :show-arrow="true"
                    :dataSource="positionDataSource"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Department -->
                <a-form-item :label="l('Unified.texts.Department')" name="department">
                  <f-select
                    name="department"
                    mode="multiple"
                    v-model:value="form.department"
                    allow-clear
                    show-search
                    optionFilterProp="key"
                    :show-arrow="true"
                    :dataSource="departmentDataSource"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Date Of Birth -->
                <a-form-item :label="l('Unified.texts.DateOfBirth')" name="dateOfBirth">
                  <f-date-picker
                    class="w-full"
                    name="dateOfBirth"
                    v-model:value="form.dateOfBirth"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- PacsEmailAddress -->
                <a-form-item :label="l('Unified.texts.PacsEmailAddress')" name="emailAddress">
                  <a-input v-model:value="form.emailAddress" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- MobileNo -->
                <a-form-item :label="l('Unified.texts.MobileNo')" name="mobileNo">
                  <a-input name="mobileNo" v-model:value="form.mobileNo" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Gender -->
                <a-form-item :label="l('Unified.texts.Gender')" name="gender">
                  <f-enum-select
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    type="PacsCardHolderGenderEnum"
                    label-field="displayName"
                    value-field="value"
                    v-model:value="form.gender"
                  />
                </a-form-item>
              </a-col>
              <!-- CardholderData -->
              <a-col :span="24" class="mb-2">
                <a-collapse accordion v-model:activeKey="activeKey">
                  <a-collapse-panel key="1" :header="l('Unified.texts.CardholderData')">
                    <a-row :gutter="24">
                      <a-col :span="8">
                        <!-- userType -->
                        <a-form-item :label="l('Unified.texts.CardHolderType')" name="userType">
                          <f-select
                            name="userType"
                            v-model:value="form.userType"
                            mode="multiple"
                            allow-clear
                            show-search
                            optionFilterProp="key"
                            :show-arrow="true"
                            :dataSource="userTypeDataSource"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <!-- CardHolder Number -->
                        <a-form-item
                          :label="l('Unified.texts.CardHolderNumber')"
                          name="cardHolderNumber"
                        >
                          <a-input
                            name="cardHolderNumber"
                            v-model:value="form.cardHolderNumber"
                            :autocomplete="'off'"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <!-- CardHolderStatus -->
                        <a-form-item :label="l('Unified.texts.CardHolderStatus')" name="statusId">
                          <f-select
                            v-model:value="form.statusId"
                            allow-clear
                            show-search
                            optionFilterProp="name"
                            :show-arrow="true"
                            :dataSource="statusDataSource"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <!-- Mobileld -->
                        <a-form-item :label="l('Unified.texts.Mobileld')" name="mobileld">
                          <a-input
                            disabled="true"
                            type="mobileld"
                            name="displayOrder"
                            v-model:value="form.mobileld"
                            :autocomplete="'off'"
                            aria-disabled="true"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <!-- pinNumber -->
                        <a-form-item :label="l('Unified.texts.PINNumber')" name="pinNumber">
                          <a-input
                            name="pinNumber"
                            v-model:value="form.pinNumber"
                            :autocomplete="'off'"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4">
                        <!-- MobileAccess -->
                        <a-form-item :label="l('Unified.texts.MobileAccess')" name="MobileAccess">
                          <a-switch v-model:checked="form.mobileAccessEnabled" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="4">
                        <!-- Blacklisted -->
                        <a-form-item :label="l('Unified.texts.Blacklisted')" name="blacklisted">
                          <a-switch name="blacklisted" v-model:checked="form.blacklisted" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- Additional Information -->
          <a-tab-pane key="additionalInformation" :forceRender="forceRender">
            <template #tab>
              {{ l('Unified.texts.AdditionalInformation') }}
            </template>
            <a-row>
              <!-- Phone List -->
              <a-col :span="24" class="mb-2">
                <a-collapse accordion v-model:activeKey="activeKeyPhone">
                  <a-collapse-panel key="1" :header="l('Unified.texts.PhoneList')">
                    <div class="autoPanel">
                      <a-row :gutter="16" :key="index" v-for="(field, index) in form.phoneList">
                        <a-col :span="8">
                          <a-form-item
                            :label="l('Unified.texts.PhoneType')"
                            :name="['phoneList', index, 'phoneType']"
                            :rules="{
                              required: true,
                              trigger: 'change',
                              message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                            }"
                          >
                            <f-select
                              v-model:value="field.phoneType"
                              allow-clear
                              show-search
                              optionFilterProp="name"
                              :show-arrow="true"
                              :dataSource="phoneDataSource"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="15">
                          <a-form-item
                            :label="l('Unified.texts.EmergencyContactPerson')"
                            :name="['phoneList', index, 'phoneNumber']"
                            :rules="{
                              required: true,
                              message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                            }"
                          >
                            <a-input v-model:value="field.phoneNumber" />
                          </a-form-item>
                        </a-col>
                        <a-col :span="1">
                          <CloseOutlined style="margin-top: 38px" @click="removePhoneItem(index)" />
                        </a-col>
                      </a-row>
                    </div>
                    <a-form-item class="mb-0">
                      <a-button type="dashed" block @click="addPhones">
                        <PlusOutlined />
                        {{ l('Unified.texts.AddAnotherPhoneNumber') }}
                      </a-button>
                    </a-form-item>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>

              <!-- email List -->
              <a-col :span="24" class="mb-2">
                <a-collapse accordion v-model:activeKey="activeKeyEmail">
                  <a-collapse-panel key="1" :header="l('Unified.texts.EmailList')">
                    <div class="autoPanel">
                      <a-row :gutter="16" :key="index" v-for="(field, index) in form.emailList">
                        <a-col :span="8">
                          <a-form-item
                            :label="l('Unified.texts.EmailType')"
                            :name="['emailList', index, 'emailType']"
                            :rules="{
                              required: true,
                              message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                            }"
                          >
                            <f-enum-select
                              allow-clear
                              show-search
                              optionFilterProp="displayName"
                              type="PacsCardHolderEmailTypeEnum"
                              label-field="displayName"
                              value-field="value"
                              v-model:value="field.emailType"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="15">
                          <a-form-item
                            :label="l('Unified.texts.PacsEmailAddress')"
                            :name="['emailList', index, 'emailAddress']"
                            :rules="{
                              required: true,
                              message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                            }"
                          >
                            <a-input v-model:value="field.emailAddress" />
                          </a-form-item>
                        </a-col>
                        <a-col :span="1">
                          <CloseOutlined
                            style="margin-top: 38px"
                            @click="removeEmailsItem(index)"
                          />
                        </a-col>
                      </a-row>
                    </div>
                    <a-form-item class="mb-0">
                      <a-button type="dashed" block @click="addEmails">
                        <PlusOutlined />
                        {{ l('Unified.texts.AddAnotherEmailAddress') }}
                      </a-button>
                    </a-form-item>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>

              <!-- custom fields List -->
              <a-col :span="24" class="mb-2">
                <a-collapse accordion v-model:activeKey="activeKeyCustom">
                  <a-collapse-panel key="1" :header="l('Unified.texts.CustomFields')">
                    <a-row :gutter="24" :key="index" v-for="(field, index) in form.customList">
                      <a-col :span="24" v-if="field.fieldType == 'input'">
                        <a-form-item
                          :label="field.fieldName"
                          :name="['customList', index, 'fieldName']"
                          :rules="{
                            required: false,
                            message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                          }"
                        >
                          <a-input
                            v-model:value="field.fieldValue"
                            :placeholder="field.fieldPlaceholder"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="24" v-if="field.fieldType == 'textarea'">
                        <a-form-item
                          :label="field.fieldName"
                          :name="['customList', index, 'fieldName']"
                          :rules="{
                            required: false,
                            message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                          }"
                        >
                          <a-textarea
                            v-model:value="field.fieldValue"
                            :placeholder="field.fieldPlaceholder"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>

              <!-- Company -->
              <a-col :span="24" class="mb-2">
                <a-collapse accordion v-model:activeKey="activeKeyCompany">
                  <a-collapse-panel key="1" :header="l('Unified.texts.Company')">
                    <pacsCompanyTable
                      ref="company"
                      :pacsCardHolderId="_types == 'copy' ? copyId : form.id"
                      :list="pacsCardHolderCards"
                      :idList="form.companyList"
                      v-model:idLists="form.companyList"
                    />
                  </a-collapse-panel>
                </a-collapse>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- FaceProfile -->
          <a-tab-pane key="FaceProfile" :forceRender="forceRender">
            <template #tab>
              {{ l('Unified.texts.Biometrics') }}
            </template>
            <pacsFaceProfileTable
              ref="company"
              :pacsCardHolderId="_types == 'copy' ? copyId : form.id"
              :types="_types"
              v-model:faceProfileId="form.faceProfileId"
              v-model:faceProfile="form.faceProfile"
            />
          </a-tab-pane>

          <!-- Card -->
          <a-tab-pane key="Card" :forceRender="forceRender">
            <template #tab>
              {{ l('Unified.texts.Cards') }}
            </template>
            <pacsCardTable
              ref="cards"
              :pacsCardHolderId="form.id"
              :list="pacsCardHolderCards"
              :cardListDto="form.cardList"
              v-model:cardLists="form.cardList"
            />
          </a-tab-pane>

          <!-- Device -->
          <a-tab-pane key="Device" :forceRender="forceRender">
            <template #tab>
              {{ l('Unified.texts.TempAccess') }}
            </template>
            <pacsDeviceTable
              ref="device"
              :idList="form.deviceIdList"
              :pacsCardHolderId="form.id"
              v-model:deviceList="form.deviceList"
            />
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <!-- <a-button :loading="saving" v-show="showNextStepButton" :type="'primary'" @click="handleSubmit(false)">
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button> -->
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
  import CreateoOrEditCardHolder from './create-or-edit-card-holder';

  export default defineComponent({
    name: 'CreateoOrEditCardHolder',
    mixins: [CreateoOrEditCardHolder],
  });
</script>

<style lang="less" scoped>
  .autoPanel {
    max-height: 210px;
    overflow: hidden auto;
  }
</style>
