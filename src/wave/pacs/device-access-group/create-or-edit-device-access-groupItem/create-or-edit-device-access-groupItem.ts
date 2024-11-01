import { PropType, defineComponent } from 'vue';
import draggable from 'vuedraggable';
import { UnorderedListOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import idHelper from '@/utils/helper/id-helper';
import { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto } from '@/apis';
import PacsDeviceAccessGroupSelect from '@/wave/component/select/pacs-device-access-group-select.vue';
import DeviceSelect from '@/wave/component/select/device-new-select.vue';

export default defineComponent({
  name: 'create-or-edit-pacs-access-schedule-items',
  mixins: [AppComponentBase],
  components: {
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    draggable,
    PacsDeviceAccessGroupSelect,
    DeviceSelect,
  },
  props: {
    groupId: {
      type: String,
    },
    items: {
      type: Object as PropType<any[]>,
      default: [],
    },
    types: {
      type: String,
    },
  },
  emits: ['update-items'],
  watch: {
    items(val: any[]) {
      this.innerVal = val;
    },
  },
  data() {
    return {
      innerVal: [...this.items],
    };
  },
  methods: {
    getSpan(field) {
      return 8;
    },
    addItem() {
      const newDto: any = {};
      newDto.id = null;
      newDto.deviceId = null;
      newDto.pacsDeviceAccessScheduleGroupId = null;
      newDto.description = null;

      this.innerVal.push(newDto);
      this.$emit('update-items', this.innerVal);
    },
    removeItem(index: number) {
      this.innerVal.splice(index, 1);
      this.$emit('update-items', this.innerVal);
    },
  },
});
