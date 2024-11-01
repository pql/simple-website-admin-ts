import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsCardService,
  FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput,
} from '@/apis';

export default defineComponent({
  components: {},
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array<string>,
      required: true,
      default: () => [],
    },
    _types: {
      type: String,
      required: true,
    },
    _titleName: {
      type: String,
      required: true,
    },
  },
  data() {
    const databases: FireBytes_Unified_Wave_PacsCards_Dtos_UpdatePacsCardValidTillDateInput = {
      ids: [],
    };

    return {
      id: '',
      form: databases,
      rules: {},
    };
  },
  mounted() {
    console.log(this.pageDataList);
    // this.getPageData(this.pageDataList[0]);
    this.getPageData();
  },
  methods: {
    getPageData() {
      // this.id = id;
      this.initData();
    },
    initData() {
      // this.init();
      this.rules = this.rulesInit();
    },
    init() {
      // this.getEditdata();
    },
    rulesInit() {
      return {
        validTillDate: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
      };
    },
    // getEditdata() {
    //   if (!this.id) return;
    //   this.loading = true;
    //   PacsCardService.getApiAppPacsCardForEdit({ input: this.id })
    //     .then((res) => {
    //       this.form = res?.pacsCard;
    //     })
    //     .catch((err) => {
    //       this.notify.error({ message: this.l(err.body.error.code) });
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsCardService.postApiAppPacsCardBatchUpdateValidTillDate({
          requestBody: { ids: this.pageDataList},
        })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.handleSubmitAfter(closeFlag);
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
  },
});
