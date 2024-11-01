<template>
  <div>
    <a-select
      :name="name"
      :selectList="selectList"
      :disabled="disabled"
      :mode="mode"
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
  import { ZoneService } from '/@/apis';

  export default defineComponent({
    name: 'zone-select',
    props: {
      placeHolder: {
        type: String,
      },
      name: {
        type: String,
      },
      disabled: {
        type: Boolean,
        defalut: false,
      },
      mode: {
        type: String,
      },
    },
    components: {},
    mixins: [PageFilterComponentBase],
    data() {
      return {
        selectList: [] as any[],
      };
    },
    created() {
      this.searchList('');
    },
    methods: {
      reload(val) {
        this.searchList(val);
      },
      searchList(val) {
        ZoneService.getApiAppZoneNdoList({
          filter: val,
        }).then((result) => {
          this.selectList = result;
        });
      },
      /* 数据改变事件 */
      onChange(value: any) {
        if (value) {
          this.$emit('update:value', value);
          this.$emit('change', value);
        } else {
          this.$emit('update:value', undefined);
          this.$emit('change', value);
        }
      },
    },
  });
</script>
