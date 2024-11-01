import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw, unref } from 'vue';
import { LanguageTextsService } from '@/apis';
export default defineComponent({
  name: 'EditLanguageTexts',
  mixins: [ModalComponentBase],

  props: {
    pageDataList: {
      type: Object,
      required: true,
    },
    _parents: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedUpdateValue: {
      get() {
        return this.form.value?.join('\n');
      },
      set(newValue: string) {
        this.form.value = this.getLines(newValue);
      },
    },

    formattedBaseValue: {
      get() {
        return this.form.baseValue?.join('\n');
      },
      set(newValue: string) {
        this.form.baseValue = this.getLines(newValue);
      },
    },
  },
  data() {
    return {
      form: {
        resourceName: null,
        cultureName: null,
        name: null,
        value: [],
        baseValue: [],
      } as any,
      current: 0 as number,
      tableList: [] as any[],
    };
  },

  mounted() {
    let { resourceName, cultureName, name, baseValue, value } = unref(this.pageDataList);
    this.form = { resourceName, cultureName, name, baseValue: [baseValue], value: [value] };
    this.getDataSource();
  },

  methods: {
    async restoreDefaultValue() {
      let { resourceName, cultureName, name } = unref(this.form);
      const res = await LanguageTextsService.putApiLanguageManagementLanguageTextsRestore({
        resourceName,
        cultureName,
        name: `${name}`,
      });
      this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
      this.handleSubmitAfter();
    },
    /*   提交 */
    async handleSubmit(closeFlag = true) {
      this.loading = true; // 设置加载状态为 true
      try {
        // 等待表单验证完成
        await (this.$refs.formRef as any).validate();
        const { resourceName, cultureName, name, value } = unref(this.form);
        const res = await LanguageTextsService.putApiLanguageManagementLanguageTexts({
          resourceName,
          cultureName,
          name,
          value: value?.join('\n'),
        });
        this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        this.handleSubmitAfter(closeFlag);
      } catch (err) {
        this.notify.error({ message: this.l(err.body.error.code) });
      } finally {
        this.loading = false;
      }
    },
    /* 获取列表数据 */
    getDataSource() {
      const { items } = this._parents.getTabDataSource().tableData;
      if (items.length) {
        const index = items.findIndex((item) => item.name === this.form.name);
        this.current = index > -1 ? index : 0;
      }
      this.tableList = items;
    },
    /* 提交并继续 */
    async handleSubmitAndNext() {
      await this.handleSubmit(false); //提交表单
      const tabLh = this.tableList.length;
      try {
        if (this.current >= tabLh - 1) {
          // 如果是最后一条数据，关闭弹窗
          this.handleSubmitAfter();
        } else {
          // 不是最后一条数据，直接编辑下一条
          this.current += 1;
          let { resourceName, cultureName, name, baseValue, value } = unref(
            this.tableList[this.current],
          );
          this.form = { resourceName, cultureName, name, baseValue: [baseValue], value: [value] };
        }
      } catch (error) {}
    },
    /* 提交并 closeFlag 关闭 */
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
    getLines(textArea) {
      if (typeof textArea === 'string') {
        return textArea
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line !== '');
      }
      return toRaw(textArea);
    },
  },
});
