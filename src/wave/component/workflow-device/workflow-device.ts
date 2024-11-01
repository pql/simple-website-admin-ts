import { defineComponent } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import {
  // DeviceControlInput,
  // WorkflowServiceProxy
  FireBytes_Unified_Wave_Workflows_Dtos_DeviceControlInput as DeviceControlInput,
} from '/@/apis';
import { message } from 'ant-design-vue';
export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    value: {
      type: Object as PropType<any>,
    },
  },
  data() {
    return {
      // workflowServiceProxy: new WorkflowServiceProxy(),
      current: 0,
      steps: [
        {
          title: 'Select Device or Device Zone',
          content: 'First-content',
        },
        {
          title: 'Select ',
          content: 'Second-content',
        },
      ],
      selectDeviceOrZone: 'device',
      selectDeviceList: [] as string[],
      selectZoneList: [],
      // entity: {
      //   deviceType: null,
      //   deviceTypeFunction: null
      // }
    };
  },
  watch: {
    'entity.deviceTypeId'(n, l) {
      this.entity.deviceTypeFunctionId = null;
    },
  },
  computed: {
    entity: {
      set(val) {
        this.$emit('update:modelValue', val);
      },
      get() {
        // this.entity = this.value;
        return this.value;
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.entity.deviceOrZone === 'device') {
        (this.$refs.deviceSelect as any).setSelectedRowKeys(this.entity.idList);
        (this.$refs.deviceSelect as any).reload();
      }
    });
  },
  methods: {
    submission() {
      (this.$refs.formRef as any).validate().then(() => {
        const input = {} as DeviceControlInput;
        input.deviceOrZone = this.selectDeviceOrZone;
        input.deviceTypeFunctionId = this.entity.deviceTypeFunction;
        input.deviceTypeId = this.entity.deviceType;
        if (this.selectDeviceOrZone == 'zone') {
          input.idList = this.selectZoneList;
        } else if (this.selectDeviceOrZone == 'device') {
          input.idList = this.selectDeviceList;
        }
        this.$emit('workflowDeviceSubmit', input);
      });
    },
  },
});
