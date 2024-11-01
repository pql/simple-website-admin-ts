<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.roleId')" name="roleId">
      <f-select
        ref="roleId"
        v-model:value="form.roleId"
        allow-clear
        :form-model="form"
        :parent-instance="vm"
        style="width: 200px"
        :placeholder="l('Unified.texts.Placeholder')"
        :dataSource="dataSource1"
      />
    </a-form-item>

    <a-form-item :label="l('Unified.texts.organizationUnitId')" name="organizationUnitId">
      <f-select
        ref="organizationUnitId"
        v-model:value="form.organizationUnitId"
        allow-clear
        :form-model="form"
        :parent-instance="vm"
        style="width: 200px"
        :placeholder="l('Unified.texts.Placeholder')"
        :dataSource="dataSource2"
      />
    </a-form-item>
    <a-form-item :label="l('Unified.texts.userId')" name="userId">
      <f-select
        ref="userId"
        v-model:value="form.userId"
        allow-clear
        style="width: 200px"
        :placeholder="l('Unified.texts.Placeholder')"
        :dataSource="dataSource3"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.submit') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, ref, getCurrentInstance } from 'vue';
  import { l } from '@/shared/i18n';

  export default defineComponent({
    setup() {
      const vm = getCurrentInstance();
      const entity = ref({
        deviceTypeId: '123',
      });
      const params1 = ref({
        customData: entity.value,
      });
      return {
        params1,
        entity,
        vm,
      };
    },
    data() {
      return {
        l,
        form: {
          roleId: undefined,
          organizationUnitId: undefined,
          userId: undefined,
        },
        rules: {
          roleId: [{ required: true, message: '请选择', trigger: 'change' }],
          organizationUnitId: [{ required: true, message: '请选择', trigger: 'change' }],
          userId: [{ required: true, message: '请选择', trigger: 'change' }],
        },
        dataSource1: {
          service: 'UserService.getApiIdentityUsersLookupRoles',
          labelField: 'name',
          valueField: 'id',
          valueChange: ['organizationUnitId'],
          params: this.params1,
        },
        dataSource2: {
          service: 'UserService.getApiIdentityUsersLookupOrganizationUnits',
          labelField: 'displayName',
          valueField: 'id',
          valueChange: ['roleId'],
          params: {
            name: 'lisi',
          },
        },
        dataSource3: {
          service: 'UserService.getApiIdentityUsersLookupOrganizationUnits',
          labelField: 'displayName',
          valueField: 'id',
          valueChange: ['organizationUnitId'],
          params: {
            name: 'wangwu',
          },
        },
      };
    },

    mounted() {
      this.entity.deviceTypeId = 'test';
    },
    methods: {
      handleSubmit() {
        (this.$refs as any).formRef.validate().then((res) => {
          console.log('form：', res);
        });
      },
    },
  });
</script>
