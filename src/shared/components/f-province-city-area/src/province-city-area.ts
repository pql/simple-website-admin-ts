import { defineComponent } from 'vue';
import { provinceCityAreaProps } from './props';
import provinceCityOptions from '/@/shared/utils/province-city-area.service';

export default defineComponent({
  props: {
    ...provinceCityAreaProps,
  },
  emits: ['update:value', 'change'],
  data() {
    return {
      /** 位置 省市区数组 [provinceCode,cityCode,areaCode]*/
      location: this.value,
      /** 省市区选项 */
      options: provinceCityOptions,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.location = val;
      },
      immediate: true,
    },
  },
  methods: {
    /** 省、市、区值改变事件 */
    selectedChange() {
      this.$emit('change', this.location);
      this.$emit('update:value', this.location);
    },
  },
});
