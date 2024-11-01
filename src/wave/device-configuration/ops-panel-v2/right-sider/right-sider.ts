import { defineComponent } from 'vue';
import DeviceTabs from '../device-tabs/device-tabs.vue';
import AlertList from '../alert-list/alert-list.vue';

export default defineComponent({
  components: {
    DeviceTabs,
    AlertList,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getDeviceTabsRef() {
      return this.$refs.deviceTabsRef;
    },
  },
});
