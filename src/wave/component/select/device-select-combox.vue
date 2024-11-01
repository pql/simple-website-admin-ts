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
    // DeviceServiceProxy, NdoDto
    DeviceService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'device-select',
    props: {
      placeHolder: {
        type: String,
      },
      name: {
        type: String,
      },
      value: {
        type: [String, Array<string>],
      },
      deviceType: {
        type: String,
      },
      //数据类型：‘’默认为null，Master：Master数据、Slave：Slave数据
      dataType: {
        type: String,
        default: null,
      },
      multiple: {
        type: Boolean,
        defalut: false,
      },
      disabled: {
        type: Boolean,
        defalut: false,
      },
      customData: {
        type: Object,
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
      'customData.buildingFloorId'() {
        this.searchList('');
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
        let params = {
          name: val,
          rdoBaseId: undefined,
          rdoId: undefined,
          ndoId: undefined,
          customData: undefined,
          filter: undefined,
          sorting: 'Id',
          skipCount: 1,
          maxResultCount: 100,
        };
        // val,this.deviceType,JSON.stringify(this.customData),this.dataType
        DeviceService.getApiAppDeviceComboxNdo(params).then((result) => {
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
