<template>
  <ProvinceCityArea @change="selectedChange" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ProvinceCityArea } from '@/shared/components/f-province-city-area';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';

  export default defineComponent({
    name: 'FAddressPicker',
    components: {
      ProvinceCityArea,
    },
    mixins: [PageFilterComponentBase],
    emits: ['change'],
    data() {},
    methods: {
      selectedChange(value) {
        this.$emit('change', value);
      },
    },
  });
</script>
