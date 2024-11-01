<template>
  <div class="modal-header">
    <div class="modal-title">
      {{ l('Unified.texts.CardHoldersDetail') }}
    </div>
  </div>
  <div class="modal-body">
    <a-form
      ref="formRef"
      labelAlign="right"
      layout="vertical"
      :autocomplete="'off'"
      :label-col="{ style: { width: '200px' } }"
      :model="form"
    >
      <a-row :gutter="24">
        <a-col :span="6" v-if="cardholderId">
          <Image
            v-show="form.faceProfile.photo"
            :width="160"
            :src="'data:image/png;base64,' + form.faceProfile.photo"
            fallback="data:image/png;base64,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"
          />
        </a-col>
        <a-col :span="18">
          <a-row :gutter="24">
            <a-col :span="12">
              <!-- FirstName -->
              <a-form-item :label="l('Unified.texts.FirstName')">
                <a-input
                  v-model:value="form.firstName"
                  :autocomplete="'off'"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <!-- LastName -->
              <a-form-item :label="l('Unified.texts.LastName')">
                <a-input v-model:value="form.lastName" :autocomplete="'off'" :disabled="disabled" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <!-- Email -->
              <a-form-item :label="l('Unified.texts.PacsEmailAddress')">
                <a-input
                  v-model:value="form.emailAddress"
                  :autocomplete="'off'"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="cardholderId">
              <!-- userType -->
              <a-form-item :label="l('Unified.texts.CardHolderType')" name="userType">
                <f-select
                  name="userType"
                  v-model:value="form.userType"
                  mode="multiple"
                  allow-clear
                  show-search
                  :show-arrow="true"
                  :dataSource="userTypeDataSource"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-item :label="l('Unified.texts.ValidTillDate')">
                <f-date-picker class="w-full" v-model:value="form.validTillDate" :disabled="disabled" />
              </a-form-item>
            </a-col> -->
            <a-col :span="12">
              <!-- User Id -->
              <a-form-item :label="l('Unified.texts.UserId')">
                <a-input v-model:value="form.userId" :autocomplete="'off'" :disabled="disabled" />
              </a-form-item>
            </a-col>

            <a-col :span="12" v-if="cardholderId">
              <!-- Department -->
              <a-form-item :label="l('Unified.texts.Department')" name="department">
                <f-select
                  name="department"
                  mode="multiple"
                  v-model:value="form.department"
                  allow-clear
                  show-search
                  :show-arrow="true"
                  :disabled="disabled"
                  :dataSource="departmentDataSource"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="cardholderId">
              <!-- Position -->
              <a-form-item :label="l('Unified.texts.Position')" name="position">
                <f-select
                  name="position"
                  mode="multiple"
                  v-model:value="form.position"
                  allow-clear
                  show-search
                  :show-arrow="true"
                  :disabled="disabled"
                  :dataSource="positionDataSource"
                />
              </a-form-item>
            </a-col>

            <a-col :span="12" v-if="cardholderId">
              <!-- Date Of Birth -->
              <a-form-item :label="l('Unified.texts.DateOfBirth')" name="dateOfBirth">
                <f-date-picker
                  class="w-full"
                  name="dateOfBirth"
                  v-model:value="form.dateOfBirth"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-if="cardholderId">
              <!-- Joined Date -->
              <a-form-item :label="l('Unified.texts.JoinedDate')" name="joinedDate">
                <f-date-picker
                  class="w-full"
                  name="joinedDate"
                  v-model:value="form.joinedDate"
                  :disabled="disabled"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import { PacsCardHolderService } from '@/apis';
  import { Image } from 'ant-design-vue';
  import { getFileUrlById } from '@/shared/components/f-upload/src/helper';

  function getComponent() {
    return cardHoldersInfor;
  }

  const cardHoldersInfor = defineComponent({
    name: 'CardHoldersInfor',
    components: { Image },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        id: '',
        creatorId:null as any,
        cardholderId:null as any,
        form: { faceProfile: {} } as any,
        disabled: true,
        userTypeDataSource: {
          service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsCardHolderTypeList', //接口名，
          labelField: 'key', //下拉框标题
          valueField: 'value', //下拉框值
        },
        departmentDataSource: {
          service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsDepartmentList', //接口名，
          labelField: 'key', //下拉框标题
          valueField: 'value', //下拉框值
        },
        positionDataSource: {
          service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsPositionList', //接口名，
          labelField: 'key', //下拉框标题
          valueField: 'value', //下拉框值
        },
        statusDataSource: {
          service: 'PacsCardHolderStatusService.getApiAppPacsCardHolderStatusNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
        },
      };
    },
    computed: {},
    mounted() {
      console.log('pageDataList', this.pageDataList);
      this.creatorId = this.pageDataList[0].creatorId;
      this.cardholderId = this.pageDataList[0].cardholderId;
      if(this.cardholderId!=null&&this.cardholderId!=undefined)
      {
        this.getPageData(this.cardholderId);
      }else{
        this.getSystemData(this.creatorId);
      }
    },
    methods: {
      /**
       * 获取数据
       */

      getPageData(id) {
        this.id = id;
        if (!this.id) return;
        this.loading = true;
        PacsCardHolderService.getApiAppPacsCardHolderForUserEdit({ userId: this.id })
          .then((res) => {
            this.form = res?.pacsCardHolder;
            if (!this.form.userId) this.form.userId = this.id;
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      getSystemData(id) {
        this.id = id;
        if (!this.id) return;
        this.loading = true;
        PacsCardHolderService.getApiAppPacsCardHolderForSystemUser({ userId: this.id })
          .then((res) => {
            this.form = res?.pacsCardHolder;
            if (!this.form.userId) this.form.userId = this.id;
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
  });
  export default cardHoldersInfor;
</script>

<style lang="less" scoped></style>
