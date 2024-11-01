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
    // DeviceTypeFunctionServiceProxy, NdoDto
    DeviceTypeFunctionService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'device-type-function-select',
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
      deviceType: {
        type: String,
      },
    },
    components: {},
    mixins: [PageFilterComponentBase],
    data() {
      return {
        selectList: {} as NdoDto,
      };
    },
    watch: {
      deviceType(value) {
        this.searchList('');
      },
    },
    computed: {
      _value: {
        set(val) {
          this.$emit('update:modelValue', val);
        },
        get() {
          return this.value || undefined;
        },
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
        DeviceTypeFunctionService.getApiAppDeviceTypeFunctionNdoList({
          deviceTypeId: val,
          filter: this.deviceType,
        }).then((result) => {
          this.selectList = result as NdoDto;
        });
      },
      /* 数据改变事件 */
      onChange(value: string) {
        if (value) {
          this.$emit('update:value', value);
          this.$emit('change', value);
        } else {
          this.$emit('update:value', undefined);
          this.$emit('change', undefined);
        }
      },
    },
  });
</script>
