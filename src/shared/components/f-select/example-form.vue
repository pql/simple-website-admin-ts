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
        @change="handleSelectChange(form.userId, dataSource3)"
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

<script lang="ts" setup>
  import { IFilterValuesLink } from '@/shared/components/f-dynamic-table/page-filter/interfaces';
  import { DataSource } from '@/shared/components/f-select/src/props';
  import { l } from '@/shared/i18n';
  import { ref, nextTick, defineEmits, getCurrentInstance } from 'vue';

  const form = ref({
    roleId: undefined,
    organizationUnitId: undefined,
    userId: undefined,
  });

  const formRef = ref('formRef');

  const emit = defineEmits(['update:value', 'change']);

  const rules = {
    roleId: [{ required: true, message: '请选择', trigger: 'change' }],
    organizationUnitId: [{ required: true, message: '请选择', trigger: 'change' }],
    userId: [{ required: true, message: '请选择', trigger: 'change' }],
  };

  const person = ref({
    name: 'zhangsan',
  });

  const dataSource1 = ref<DataSource>({
    service: 'UserService.getApiIdentityUsersLookupRoles',
    labelField: 'name',
    valueField: 'id',
    valueChange: ['organizationUnitId'],
    params: person.value,
  });

  const dataSource2 = ref<DataSource>({
    service: 'UserService.getApiIdentityUsersLookupOrganizationUnits',
    labelField: 'displayName',
    valueField: 'id',
    valueChange: ['roleId'],
    params: {
      name: 'lisi',
    },
  });

  const dataSource3 = ref<DataSource>({
    service: 'UserService.getApiIdentityUsersLookupOrganizationUnits',
    labelField: 'displayName',
    valueField: 'id',
    valueChange: ['organizationUnitId'],
    params: {
      name: 'wangwu',
    },
  });

  /**
   * 监听 f-select 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
   * <f-select @change="handleEnumSelectChange" />
   */
  const handleSelectChange = (val: any, filterItem: any) => {
    // 触发修改
    const filterValues = form.value;

    nextTick(() => {
      // 联动
      const data: IFilterValuesLink = {
        filterValues: filterValues,
        currentValue: val,
      };

      handleExternalTrigger(filterItem.valueChange ?? [], data);

      // 更新value
      emit('update:value', filterValues);
      emit('change', filterValues);
    });
  };

  const vm = getCurrentInstance();
  /** 通知 */
  const handleExternalTrigger = (subList: string[], data?: any) => {
    const subs = subList.filter((s) => s);
    for (let i = 0, l = subs.length; i < l; i++) {
      const sub = subs[i];
      let instance: any = null;
      if (Array.isArray(vm!.refs[sub])) {
        instance = vm!.refs[sub][0];
      } else {
        instance = vm!.refs[sub] as any;
      }
      if (instance?.handleExternalTriggerChangeEvent) {
        instance.handleExternalTriggerChangeEvent(data);
      }
    }
  };

  const handleSubmit = () => {
    (formRef.value as any).validate().then((res) => {
      console.log('form：', res);
    });
  };
</script>
