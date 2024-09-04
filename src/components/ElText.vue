<script lang="ts" setup>
const props = defineProps<{
  attrs: any
}>()
</script>

<template>
  <p
    class="text-wrap whitespace-pre-wrap"
    :style="{
      fontFamily: props.attrs.fontFamily.value,
      color: props.attrs.color,
      fontSize: props.attrs.fontSize,
      lineHeight: props.attrs.lineHeight,
      padding: props.attrs.padding,
      textAlign: props.attrs.align,
    }"
  >
    {{ props.attrs.text }}
  </p>
</template>
