import { PropType, defineComponent } from 'vue';
import draggable from 'vuedraggable';
import { UnorderedListOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import idHelper from '@/utils/helper/id-helper';
import { FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto } from '@/apis';

export default defineComponent({
  name: 'create-or-edit-pacs-access-schedule-items',
  mixins: [AppComponentBase],
  components: {
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    draggable,
  },
  props: {
    groupId: {
      type: String,
    },
    items: {
      type: Object as PropType<
        FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto[]
      >,
      default: [],
    },
    types: {
      type: String,
    },
  },
  emits: ['update-items'],
  watch: {
    items(
      val: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto[],
    ) {
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
      if (this.types == 'general') {
        if (field == 'time') return 6;
        else return 8;
      } else if (this.types == 'special') {
        if (field == 'date') return 5;
        else if (field == 'time') return 3;
        else return 6;
      }
    },
    getEnum() {
      if (this.types == 'general') return 'DayOfAccessScheduleEnum';
      else if (this.types == 'special') return 'DayOfAccessScheduleHolidayEnum';
    },
    addItem() {
      const newDto: any = {};
      newDto.id = null;
      newDto.startTime = null;
      newDto.endTime = null;
      newDto.startDate = null;
      newDto.endDate = null;
      newDto.dayOfAccessSchedule = '';

      this.innerVal.push(newDto);
      this.$emit('update-items', this.innerVal);
    },
    removeItem(index: number) {
      this.innerVal.splice(index, 1);
      this.$emit('update-items', this.innerVal);
    },
  },
});
