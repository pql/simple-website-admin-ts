<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.ProfileTab:DateAndTime')" name="dateFormat">
      <f-enum-select
        style="width: 130px"
        allow-clear
        show-search
        optionFilterProp="label"
        label-field="label"
        value-field="value"
        :options="options"
        v-model:value="form.dateFormat"
      />
    </a-form-item>
    <a-form-item :label="l('Unified.texts.ProfileTab:Use12Hours')" name="use12Hours">
      <a-switch v-model:checked="form.use12Hours" checked-children="12" un-checked-children="24" />
    </a-form-item>
    <a-form-item>
      <a-button :type="'primary'" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.common:saveText') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DateAndTime from './dateAndTime';

  export default defineComponent({
    name: 'DateAndTime',
    mixins: [DateAndTime],
  });
</script>

<style lang="less" scoped>
  @import './dateAndTime.less';
</style>
