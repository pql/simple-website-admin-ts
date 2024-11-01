import { defineComponent } from 'vue';
import { modalCloseProps } from './props';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CloseOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
  },
  props: {
    ...modalCloseProps,
  },
  emits: ['cancel', 'fullscreen'],
  computed: {
    getClass() {
      return [
        'basic-modal-close',
        `basic-modal-close--custom`,
        {
          [`basic-modal-close--can-full`]: this.canFullscreen,
        },
      ];
    },
  },
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handleFullScreen(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      this.$emit('fullscreen');
    },
  },
});
