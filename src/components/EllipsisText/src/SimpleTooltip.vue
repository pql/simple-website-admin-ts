<template>
  <a-tooltip :title="fullText" v-if="isOverflow">
    <span class="menu-item">{{ displayText }}</span>
  </a-tooltip>
  <span v-else class="menu-item" ref="textElement">{{ displayText }}</span>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  text: String,
  maxWidth: {
    type: Number,
    default: 150,
  },
});

const isOverflow = ref(false);
const fullText = ref(props.text);
const displayText = ref(props.text);

const checkOverflow = (el: HTMLElement) => {
  const textWidth = getTextWidth(el.innerText, el);
  if (textWidth > props.maxWidth) {
    isOverflow.value = true;
  } else {
    isOverflow.value = false;
  }
};
function getTextWidth(text, element) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return 0;
  }
  context.font = getComputedStyle(element).font;
  return context.measureText(text).width;
}
const textElement = ref<HTMLElement | null>(null);

onMounted(() => {
  nextTick(() => {
    if (textElement.value) {
      checkOverflow(textElement.value);
    }
  });
});
</script>

<style scoped>
.menu-item {
  line-height: 21px;/* 解决英文字母部分电脑显示缺少 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
