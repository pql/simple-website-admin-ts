<template>
  <div>
    <a-select
      :name="name"
      :selectList="selectList"
      :disabled="disabled"
      v-model:value="innerValue"
      @reload="reload($event)"
      @change="onChange"
    >
      <a-select-option v-for="(item, index) of selectList" :key="index" :value="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import {
    //  DeviceCredentialProfileServiceProxy, NdoDto
    DeviceCredentialProfileService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';

  export default defineComponent({
    name: 'credential-profile-select',
    props: {
      placeHolder: {
        type: String,
      },
      name: {
        type: String,
      },
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    components: {},
    mixins: [PageFilterComponentBase],
    data() {
      return {
        selectList: {} as NdoDto,
        _value: null as any,
      };
    },
    watch: {
      value(val) {
        if (val) {
          this._value = val;
        } else {
          this._value = undefined;
        }
      },
    },
    created() {
      this.searchList('');
    },
    methods: {
      reload(val) {
        this.searchList(val);
      },
      searchList(val) {
        DeviceCredentialProfileService.getApiAppDeviceCredentialProfileNdoList({
          filter: val,
        }).then((result) => {
          this.selectList = result as NdoDto;
        });
      },
      /* 数据改变事件 */
      onChange(value: string) {
        if (value) {
          this.$emit('update:value', value);
        } else {
          this.$emit('update:value', undefined);
        }
      },
    },
  });
</script>
