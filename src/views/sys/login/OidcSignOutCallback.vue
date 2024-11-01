<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { UserStore } from '../../../store/modules/user';

  const userStore = UserStore.useStoreWithOut();

  onMounted(() => {
    userStore.logout(true);
  });
</script>
