<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item
      :label="l('Unified.texts.Components:modal:showCancelButton')"
      name="showCancelButton"
    >
      <a-switch
        v-model:checked="form.showCancelButton"
        checked-children="open"
        un-checked-children="closed"
      />
    </a-form-item>
    <a-form-item
      :label="l('Unified.texts.Components:modal:showNextStepButton')"
      name="showNextStepButton"
    >
      <a-switch
        v-model:checked="form.showNextStepButton"
        checked-children="open"
        un-checked-children="closed"
      />
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
  import ComponentSetting from './componentSetting';

  export default defineComponent({
    name: 'ComponentSetting',
    mixins: [ComponentSetting],
  });
</script>

<style lang="less" scoped>
  @import './componentSetting.less';
</style>
