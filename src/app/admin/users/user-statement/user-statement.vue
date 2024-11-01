<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpIdentity.texts.Claims') }}
      </div>
    </div>
    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="templateData"
        @submit="handleAdd"
        :rules="rules"
      >
        <a-row>
          <a-col :span="11">
            <!-- 类型 -->
            <a-form-item :label="l('AbpIdentity.texts.Type')" name="type" required>
              <f-select
                show-search
                optionFilterProp="name"
                ref="select"
                v-model:value="templateData.type"
                allow-clear
                :dataSource="typeDataSource"
                @select-list-change="handleTypeSelectListChange"
                @change="handleTypeChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="2" />
          <a-col :span="11">
            <!-- 声明值 -->
            <a-form-item :label="l('AbpIdentity.texts.ClaimValue')" name="value">
              <a-input name="value" v-model:value="templateData.value" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-button :block="true" type="primary" @click="handleAdd()">{{
              l('AbpIdentity.texts.AddClaim')
            }}</a-button>
          </a-col>
        </a-row>
      </a-form>

      <a-table
        :showHeader="false"
        :dataSource="dataList"
        :columns="columns"
        :pagination="false"
        style="margin-top: 15px"
        :scroll="{ x: '100%', y: '360px' }"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'claimValue'">
            <a-input
              v-model:value="dataList[index].claimValue"
              @change="handleInputChange($event, index)"
              style="width: 100%"
            />
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="removeRow(index)">
              {{ l('AbpIdentity.texts.Permission:Delete') }}
            </a-button>
          </template>
        </template>
      </a-table>
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
  import UserStatement from './user-statement';

  export default defineComponent({
    name: 'UserStatement',
    mixins: [UserStatement],
  });
</script>

<style lang="less" scoped>
  @import './user-statement.less';
</style>
