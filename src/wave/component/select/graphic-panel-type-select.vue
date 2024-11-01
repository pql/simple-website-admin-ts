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
    // GraphicPanelTypeServiceProxy, NdoDto
    GraphicPanelTypeService,
    FireBytes_Unified_Shared_NdoDto as NdoDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'graphic-panel-type-select',
    props: {
      value: {
        type: String,
      },
      //是否默认选中一个值
      isDefalut: {
        type: Boolean,
      },
    },
    components: {},
    mixins: [PageFilterComponentBase],
    data() {
      return {
        placeHolder: 'placeHolder',
        name: 'name',
        disabled: false,
        selectList: [] as NdoDto,
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
        GraphicPanelTypeService.getApiAppGraphicPanelTypeNdoList({
          filter: val,
        }).then((result) => {
          //默认选中一个
          // if(this.isDefalut&&this.value==null&&result.length>0){
          this.onChange(result[0].id);
          // }
          this.selectList = result as NdoDto;
        });
      },
      /* 数据改变事件 */
      onChange(value: string) {
        if (value) {
          for (const element of this.selectList as any) {
            if (element.id == value) {
              this.$emit('update:type', element.name);
            }
          }

          this.$emit('update:value', value);
        } else {
          this.$emit('update:value', undefined);
        }
      },
    },
  });
</script>
