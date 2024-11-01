<template>
  <a-select
    v-model:value="selectedRoleVal"
    mode="multiple"
    :placeholder="l('FilterByRole')"
    @change="selectedChange($event)"
    allowClear
    class="w-full"
    :maxTagCount="3"
  >
    <a-select-option :key="index" :value="role.id" v-for="(role, index) of roles">
      {{ role.name }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
  import { UserService, Volo_Abp_Identity_IdentityRoleLookupDto } from '@/apis';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FLookupRolePicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
    },
    data() {
      return {
        roles: new Array<Volo_Abp_Identity_IdentityRoleLookupDto>(),
      };
    },
    computed: {
      selectedRoleVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('update:value', val);
        },
      },
    },
    mounted() {
      UserService.getApiIdentityUsersLookupRoles().then((result) => {
        this.roles = result;
      });
    },
    methods: {
      selectedChange(selectKey) {
        this.selectedRoleVal = selectKey;
        this.$emit('change', selectKey);
      },
    },
  });
</script>

<style lang="less" scoped></style>
