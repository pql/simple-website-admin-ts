<template>
  <a-select
    v-model:value="innerValue"
    :dropdownStyle="{}"
    :placeholder="l('Unified.texts.HttpStatusCode')"
    @change="innerValueChange"
    allowClear
    style="width: 100%"
    :maxTagCount="3"
  >
    <a-select-option value="">{{ l('All') }}</a-select-option>
    <a-select-option value="100">{{ l('100') }}</a-select-option>
    <a-select-option value="101">{{ l('101') }}</a-select-option>
    <a-select-option value="102">{{ l('102') }}</a-select-option>
    <a-select-option value="103">{{ l('103') }}</a-select-option>
    <a-select-option value="200">{{ l('200') }}</a-select-option>
    <a-select-option value="201">{{ l('201') }}</a-select-option>
    <a-select-option value="202">{{ l('202') }}</a-select-option>
    <a-select-option value="203">{{ l('203') }}</a-select-option>
    <a-select-option value="204">{{ l('204') }}</a-select-option>
    <a-select-option value="205">{{ l('205') }}</a-select-option>
    <a-select-option value="206">{{ l('206') }}</a-select-option>
    <a-select-option value="207">{{ l('207') }}</a-select-option>
    <a-select-option value="208">{{ l('208') }}</a-select-option>
    <a-select-option value="226">{{ l('226') }}</a-select-option>
    <a-select-option value="300">{{ l('300') }}</a-select-option>
    <a-select-option value="301">{{ l('301') }}</a-select-option>
    <a-select-option value="302">{{ l('302') }}</a-select-option>
    <a-select-option value="303">{{ l('303') }}</a-select-option>
    <a-select-option value="304">{{ l('304') }}</a-select-option>
    <a-select-option value="305">{{ l('305') }}</a-select-option>
    <a-select-option value="306">{{ l('306') }}</a-select-option>
    <a-select-option value="307">{{ l('307') }}</a-select-option>
    <a-select-option value="308">{{ l('308') }}</a-select-option>
    <a-select-option value="400">{{ l('400') }}</a-select-option>
    <a-select-option value="401">{{ l('401') }}</a-select-option>
    <a-select-option value="402">{{ l('402') }}</a-select-option>
    <a-select-option value="403">{{ l('403') }}</a-select-option>
    <a-select-option value="404">{{ l('404') }}</a-select-option>
    <a-select-option value="405">{{ l('405') }}</a-select-option>
    <a-select-option value="406">{{ l('406') }}</a-select-option>
    <a-select-option value="407">{{ l('407') }}</a-select-option>
    <a-select-option value="408">{{ l('408') }}</a-select-option>
    <a-select-option value="409">{{ l('409') }}</a-select-option>
    <a-select-option value="410">{{ l('410') }}</a-select-option>
    <a-select-option value="411">{{ l('411') }}</a-select-option>
    <a-select-option value="412">{{ l('412') }}</a-select-option>
    <a-select-option value="413">{{ l('413') }}</a-select-option>
    <a-select-option value="414">{{ l('414') }}</a-select-option>
    <a-select-option value="415">{{ l('415') }}</a-select-option>
    <a-select-option value="416">{{ l('416') }}</a-select-option>
    <a-select-option value="417">{{ l('417') }}</a-select-option>
    <a-select-option value="421">{{ l('421') }}</a-select-option>
    <a-select-option value="423">{{ l('423') }}</a-select-option>
    <a-select-option value="424">{{ l('424') }}</a-select-option>
    <a-select-option value="425">{{ l('425') }}</a-select-option>
    <a-select-option value="426">{{ l('426') }}</a-select-option>
    <a-select-option value="428">{{ l('428') }}</a-select-option>
    <a-select-option value="429">{{ l('429') }}</a-select-option>
    <a-select-option value="431">{{ l('431') }}</a-select-option>
    <a-select-option value="451">{{ l('451') }}</a-select-option>
    <a-select-option value="500">{{ l('500') }}</a-select-option>
    <a-select-option value="501">{{ l('501') }}</a-select-option>
    <a-select-option value="502">{{ l('502') }}</a-select-option>
    <a-select-option value="503">{{ l('503') }}</a-select-option>
    <a-select-option value="504">{{ l('504') }}</a-select-option>
    <a-select-option value="505">{{ l('505') }}</a-select-option>
    <a-select-option value="506">{{ l('506') }}</a-select-option>
    <a-select-option value="507">{{ l('507') }}</a-select-option>
    <a-select-option value="508">{{ l('508') }}</a-select-option>
    <a-select-option value="510">{{ l('510') }}</a-select-option>
    <a-select-option value="511">{{ l('511') }}</a-select-option>
  </a-select>
</template>

<script lang="ts">
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FHttpStatusCodePicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
    },
  });
</script>
