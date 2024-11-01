import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, createVNode } from 'vue';
import { OidcClient } from '@/utils/auth/oidc';
import { Image, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    Image,
    Modal,
  },
  mixins: [ModalComponentBase],
  data() {
    return {
      saving: false,
      loading: false,
      radioStyle: {
        display: 'flex',
        height: '30px',
        lineHeight: '30px',
      },
      picture: { fileContent: '', source: '', type: 0 } as any,
      radioValue: 0,
      formData: null as any,
      originalPic: null as any,
      imageContent: '',
    };
  },
  computed: {
    picDisabled() {
      // 条件1：输入文本为空
      console.log(this.picture, 'this.originalPic', this.originalPic);
      if (this.picture.type == 2 && !this.originalPic) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    async getDataList() {
      this.loading = true;
      const id = this.abp.currentUser?.id as string;
      const res = await OidcClient.getApiAccountProfilePicture({ useId: id });
      this.picture = res;

      this.loading = false;
    },
    handleChangeRadio(value) {
      // this.picDisabled = false
      // if (value == 2 && !this.originalPic.url) {
      //   this.saving = false
      //   this.picDisabled = true
      // }
    },
    /**
     * 保存更改
     */
    async handleSubmit() {
      this.saving = true;
      let that = this;
      const messageTypes = {
        0: 'AbpAccount.texts.NoProfilePictureConfirm',
        1: 'AbpAccount.texts.UseGravatarConfirm',
        2: 'AbpAccount.texts.PPUploadConfirm',
      };
      let content = messageTypes[this.picture.type] || '';
      Modal.confirm({
        title: () => `${this.l('AbpAccount.texts.AreYouSure')}`,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => `${this.l(content)}`,
        onOk() {
          that.postApiAccountPicQuery();
        },
        onCancel() {
          that.saving = false;
        },
      });
    },
    async postApiAccountPicQuery() {
      let formData = new FormData();
      formData.append('type', this.picture.type);
      if (this.picture.type == 2) {
        formData.append('ImageContent', this.imageContent);
      }
      try {
        const res = await OidcClient.postApiAccountProfilePicture(formData);
      } catch (error) {
        this.loading = false;
      }
      this.saving = false;
      this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
      this.getDataList();
    },
    beforeUpload(file) {
      // 可以在这里添加文件类型或大小的校验
      // const isImage = file.type.startsWith('image/');
      // if (!isImage) {
      //   return this.notify.error({ message: this.l('You can only upload picture files!') });

      // }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('图片必须小于2MB!');
      // }
      this.imageContent = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 将 Blob URL 添加到 fileList 中
        this.originalPic = { url: reader.result, name: file.name };
      };
    },
  },
});
