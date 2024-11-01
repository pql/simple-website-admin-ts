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
    // DeviceCategoryServiceProxy
    // , NdoDto
    DeviceCategoryService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'device-category-select',
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
      customQuery: {
        type: Object,
        default: {
          deviceTypeId: '',
          filter: '',
        },
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
      customQuery() {
        this.searchList(this.customQuery);
      },
    },
    created() {
      this.searchList(this.customQuery);
    },
    methods: {
      reload(obj) {
        this.searchList(obj);
      },
      searchList(obj) {
        if (obj.deviceTypeId == null || obj.deviceTypeId == '') {
          return;
        }
        DeviceCategoryService.getApiAppDeviceCategoryNdoList({
          deviceTypeId: obj.deviceTypeId,
          filter: obj.filter,
        }).then((result) => {
          // console.log(this.value)
          // this._value = this.value
          // var index = result.filter(o=>o.id==this._value).length;
          // if(index==0){
          //     this._value=null
          // }

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
