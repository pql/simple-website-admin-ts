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
    // BuildingFloorModelServiceProxy, NdoDto
    FireBytes_Unified_Shared_NdoDto as NdoDto,
    BuildingFloorModelService,
  } from '/@/apis';

  export default defineComponent({
    name: 'building-floor-model-select',
    props: {
      value: {
        type: String,
      },
      type: {
        type: Number,
      },
    },
    components: {},
    mixins: [PageFilterComponentBase],
    data() {
      return {
        placeHolder: 'placeHolder',
        name: 'name',
        disabled: false,
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
      deviceTypeId(val) {
        this.searchList('');
      },
    },
    created() {
      this._value = this.value;

      this.searchList('');
    },
    methods: {
      reload(val) {
        this.searchList(val);
      },
      searchList(val) {
        BuildingFloorModelService.getApiAppBuildingFloorModelNdoList({
          filter: val,
          type: this.type ?? 0,
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
