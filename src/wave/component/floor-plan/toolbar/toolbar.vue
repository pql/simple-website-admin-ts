<template>
  <div style="position: relative">
    <div class="toolbar">
      <a-tooltip>
        <template #title>{{ l('View Fit') }}</template>
        <div class="box ruler-btn" @click="handleClickRuler">
          <Icon icon="icon-f-measurement" style="font-size: 20px" />
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ l('Toggle 2D/3D') }}</template>
        <div class="box threeD-btn" @click="handleClick3D">
          <Icon icon="icon-f-square" style="font-size: 20px" />
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ l('Full Screen') }}</template>
        <div v-if="!isDesign" class="box screen-btn" @click="handleClickScreen">
          <Icon icon="icon-f-ullscreen" style="font-size: 20px" />
        </div>
      </a-tooltip>

      <a-tooltip>
        <template #title>{{ l('Collect') }}</template>
        <div v-if="!isDesign" class="box collect-btn" @click="handleClickCollect">
          <Icon icon="icon-f-collect" style="font-size: 20px" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import AppComponentBase from '/@/shared/component-base/app-component-base';
  import { createLocalStorage } from '@/utils/cache';
  import { PAGE_FLOOR_PLAN_KEY } from '@/enums/cacheEnum';
  import { useRouter } from 'vue-router';
  import mittEvent from '@/utils/eventBus';

  const ls = createLocalStorage();
  export default defineComponent({
    mixins: [AppComponentBase],
    // inject: ['opsPaneFullScreen'],
    props: {
      isDesign: {
        type: Boolean,
        default: false,
      },

      tablePanelInfo: {
        type: Object,
        default: {},
      },
    },

    data() {
      return {
        isFullscreen: false,
        isCollect: false,
        routerName: '',
        collectItem: {} as any,
      };
    },
    created() {},
    mounted() {
      const router = useRouter();
      const { currentRoute } = router;
      if (currentRoute) this.routerName = currentRoute.value.name as string;
      this.collectItem = ls.get(`${PAGE_FLOOR_PLAN_KEY}${this.routerName}`);
    },
    methods: {
      handleClick3D() {
        (document.getElementsByClassName('xeokit-threeD')[0] as any).click();
      },
      handleClickRuler() {
        (document.getElementsByClassName('xeokit-fit')[0] as any).click();
      },
      handleClickScreen() {
        this.isFullscreen = !this.isFullscreen;
        // this.opsPaneFullScreen(this.isFullscreen);
        mittEvent.emit('opsPane:FullScreen', this.isFullscreen);
      },
      handleClickCollect() {
        const { id, type } = this.tablePanelInfo;
        let pam = {
          nodeId: id,
          type,
        } as any;
        if (this.collectItem && this.collectItem.nodeId == id) {
          pam = {};
          this.collectItem = {};
        }
        ls.set(`${PAGE_FLOOR_PLAN_KEY}${this.routerName}`, pam);
      },
    },
  });
</script>

<style lang="less" scoped>
  .toolbar {
    display: flex;
    position: absolute;
    z-index: 2;
    bottom: 4.5vh;
    left: 50%;
    align-items: center;
    justify-content: space-around;
    height: 45px;
    padding: 0 15px;
    transform: translate(-50%, 0);
    border-radius: 50px;
    background-color: #02020280;

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      margin: 0 10px;
      border: 1px solid transparent;
      border-radius: 8px;
      color: #fff !important;
      cursor: pointer;

      &:hover {
        transform: scale(0.8);
        border: 1px solid #888;
        background-color: #888;
      }
    }

    // .active-btn {
    //   background-color: @primary-color !important;
    // }
  }
</style>
