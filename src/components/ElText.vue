<script lang="ts" setup>
import { useEditorStore } from '@/store/editor'

const props = defineProps<{
  attrs: any
}>()
const editorStore = useEditorStore()

function handleChange(e: Event) {
  const target = e.target as HTMLElement
  editorStore.modifyLayer(props.attrs.id, 'text', target.textContent)
}
</script>

<template>
  <p
    contenteditable="true"
    class="text-wrap whitespace-pre-wrap select-none absolute"
    :style="{
      fontFamily: props.attrs.fontFamily,
      color: props.attrs.color,
      backgroundColor: props.attrs.fill,
      fontSize: `${props.attrs.fontSize}px`,
      lineHeight: props.attrs.lineHeight,
      padding: props.attrs.padding,
      textAlign: props.attrs.align,
      width: `${props.attrs.size.width}px`,
      height: `${props.attrs.size.height}px`,
      transform: `translate(${props.attrs.position.x}px, ${props.attrs.position.y}px) rotate(${props.attrs.rotate}deg)`,
      visibility: props.attrs.visibility ? 'visible' : 'hidden',
    }"
    @input="handleChange"
  >
    {{ props.attrs.text }}
  </p>
</template>
