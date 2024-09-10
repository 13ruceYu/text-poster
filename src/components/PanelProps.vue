<script lang="ts" setup>
import { useEditorStore } from '@/store/editor'
import { toRefs } from 'vue'
import FrameProps from './FrameProps.vue'
import TextProps from './TextProps.vue'

const editorStore = useEditorStore()
const { activeLayerType } = toRefs(editorStore)

const propsMap = {
  text: TextProps,
  frame: FrameProps,
}
</script>

<template>
  <component :is="propsMap[activeLayerType as keyof typeof propsMap]" />
</template>
