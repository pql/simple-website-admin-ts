<template>
  <div>
    <a-select
      :selectList="selectList"
      v-model:value="_value"
      @reload="reload($event)"
      :name="name"
      :disabled="disabled"
      @changeValue="onChange"
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
    // DeviceGroupServiceProxy,
    // NdoDto
    DeviceGroupService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'device-group-select',
    props: {
      sss: {
        type: String,
      },
      name: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
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
      if (this.value != null && this.value != undefined && this.value != '') {
        this._value = this.value;
      }
    },
    methods: {
      reload(val) {
        this.searchList(val);
      },
      searchList(val) {
        DeviceGroupService.getApiAppDeviceGroupNdoList({
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

<style lang="less" scoped>
  html[data-theme='dark'] {
    input {
      background-color: #151515;
    }
  }
</style>
