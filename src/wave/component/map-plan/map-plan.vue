<template>
  <div class="map" :style="{ height: scrollerHeight }" :id="'by_map' + id">
    <a-button
      class="map_save_outline_button"
      type="primary"
      :style="{ display: isDesign ? 'block' : 'none' }"
      @click="saveOutline"
      >Save Outline</a-button
    >
    <div
      class="context-menu"
      v-show="isMenuVisible"
      :style="{ top: `${top}px`, left: `${left}px` }"
    >
      <ul>
        <li v-for="item in menuItems" :key="item.id" @click="handleMenuItemClick(item)"
          >{{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './map-plan';
  export default defineComponent({
    name: 'map-plan',
    mixins: [ComponentMixin],
  });
</script>

<style lang="less" scoped>
  @import './map-plan.less';
</style>
