import { updateColorWeak } from '@/logics/theme/updateColorWeak';
import {
  SiteIconSettingService,
  FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto,
  FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput,
} from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent, createVNode } from 'vue';
import { UserStore } from '@/store/modules/user';
import { useTimezone } from '@/timezones/useTimezone';
import { Modal, Card } from 'ant-design-vue';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
import { FileItem } from '@/components/Upload/src/types/typing';
import { PacsCardHolderService } from '@/apis';
import Icon from '@/components/Icon/Icon.vue';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  components: { Modal, Card, Icon },
  props: {
    pacsCardHolderId: {
      type: String,
      required: true,
    },
    types: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      faceProfile: {
        id: '',
        pacsCardHolderId: '',
        photo: '',
        palmVeinTemplate: '',
        fingerprintTemplate: '',
        leftIrisTemplate: '',
        rightIrisTemplate: '',
      },
      srcPrefix: 'data:image/png;base64,',
      previewVisible: false,
      previewImage: '',
    };
  },
  computed: {},
  methods: {
    getData() {
      PacsCardHolderService.getApiAppPacsCardHolderPacsFaceProfile({
        pacsCardHolderId: this.pacsCardHolderId,
      })
        .then((res) => {
          this.faceProfile.id = res.id as string;
          this.faceProfile.photo = res.photo as string;
          this.faceProfile.palmVeinTemplate = res.palmVeinTemplate as string;
          this.faceProfile.fingerprintTemplate = res.fingerprintTemplate as string;
          this.faceProfile.leftIrisTemplate = res.leftIrisTemplate as string;
          this.faceProfile.rightIrisTemplate = res.rightIrisTemplate as string;

          if (this.types == 'copy')
            this.change();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = this.srcPrefix + this.faceProfile.photo;
      }
      this.previewImage = this.srcPrefix + this.faceProfile.photo;
      this.previewVisible = true;
    },
    beforeUploadPhoto(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.faceProfile.photo = (reader.result as string).split(',')[1];
      };
      this.change();
      return false;
    },
    beforeUploadFingerprintTemplate(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.faceProfile.fingerprintTemplate = (reader.result as string).split(',')[1];
      };
      this.change();
      return false;
    },
    beforeUploadPalmVeinTemplate(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.faceProfile.palmVeinTemplate = (reader.result as string).split(',')[1];
      };
      this.change();
      return false;
    },
    beforeUploadRightIrisTemplate(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.faceProfile.rightIrisTemplate = (reader.result as string).split(',')[1];
      };
      this.change();
      return false;
    },
    beforeUploadLeftIrisTemplate(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.faceProfile.leftIrisTemplate = (reader.result as string).split(',')[1];
      };
      this.change();
      return false;
    },
    change() {
      this.faceProfile.pacsCardHolderId = this.pacsCardHolderId;
      this.$emit('update:faceProfile', this.faceProfile);
      this.$emit('update:faceProfileId', this.faceProfile.id);
    },
    previewPicture(src) {
      this.previewVisible = true;
      this.previewImage = this.srcPrefix + src;
    },
    deletePicture(str) {
      if (str == 'photo') this.faceProfile.photo = '';
      else if (str == 'palmVeinTemplate') this.faceProfile.palmVeinTemplate = '';
      else if (str == 'fingerprintTemplate') this.faceProfile.fingerprintTemplate = '';
      else if (str == 'leftIrisTemplate') this.faceProfile.leftIrisTemplate = '';
      else if (str == 'rightIrisTemplate') this.faceProfile.rightIrisTemplate = '';

      this.change();
    },
    handleSubmit() { },
  },
});
