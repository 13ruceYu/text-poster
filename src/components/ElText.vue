<script lang="ts" setup>
const props = defineProps<{
  attrs: any
}>()
</script>

<template>
  <p
    class="text-wrap whitespace-pre-wrap select-none absolute"
    :style="{
      fontFamily: props.attrs.fontFamily.value,
      color: props.attrs.color,
      fontSize: props.attrs.fontSize,
      lineHeight: props.attrs.lineHeight,
      padding: props.attrs.padding,
      textAlign: props.attrs.align,
      width: `${props.attrs.size.width}px`,
      height: `${props.attrs.size.height}px`,
      transform: `translate(${props.attrs.position.x}px, ${props.attrs.position.y}px)`,
    }"
  >
    {{ props.attrs.text }}
  </p>
</template>
