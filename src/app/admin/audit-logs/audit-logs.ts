import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent, ref } from 'vue';
import Logs from './logs/logs.vue';
import Entities from './entities/entities.vue';

export default defineComponent({
  components: {
    Logs,
    Entities,
  },
  mixins: [AppComponentBase],
  data() {
    return {
      activeKey: ref('1'),
    };
  },
});
