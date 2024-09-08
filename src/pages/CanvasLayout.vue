<script lang="ts" setup>
import ElText from '@/components/ElText.vue'
import NavbarCanvas from '@/components/NavbarCanvas.vue'
import PanelLayer from '@/components/PanelLayer.vue'
import PanelProps from '@/components/PanelProps.vue'
import { useEditorStore } from '@/store/editor'
import { nextTick, ref, toRefs, watch } from 'vue'
import Moveable from 'vue3-moveable'
import type { Component } from 'vue'
import type { MoveableInterface, OnDrag, OnDragEnd, OnResize, OnResizeEnd, OnRotate } from 'vue3-moveable'

const editorStore = useEditorStore()
const { activeLayerId, activeLayerData } = toRefs(editorStore)

const elComponents: Record<string, Component> = {
  text: ElText,
}

const moveableRef = ref<MoveableInterface | null>(null)
const moveableElClassArr = editorStore.editor.map(item => `.el-${item.id}`)
const moveableTarget = ref<string[]>([])

watch(activeLayerData, () => {
  if (activeLayerData.value) {
    nextTick(() => {
      moveableRef.value?.updateRect()
    })
  }
}, { deep: true })

watch(activeLayerId, () => {
  moveableTarget.value = [`#${activeLayerId.value}`]
})

function handleMouseDown(_: MouseEvent, elId: string) {
  editorStore.activeLayerId = elId
}

function onDrag(e: OnDrag) {
  e.target.style.transform = e.transform
}

function xyFromTransform(transform: string): [number, number] {
  const regTransformXY = /translate\((-?\d+(?:\.\d+)?)px,\s*(-?\d+(?:\.\d+)?)px\)/
  const matchXY = transform.match(regTransformXY) as RegExpMatchArray
  return [Number(matchXY[1]), Number(matchXY[2])]
}

function onDragEnd(e: OnDragEnd) {
  const { transform } = e.lastEvent
  const [x, y] = xyFromTransform(transform)
  editorStore.dragElement(activeLayerId.value, x, y)
}

function onResize(e: OnResize) {
  e.target.style.width = `${e.width}px`
  e.target.style.height = `${e.height}px`
  e.target.style.transform = e.drag.transform
}

function onResizeEnd(e: OnResizeEnd) {
  if (!e.lastEvent)
    return
  const { transform, width, height } = e.lastEvent
  const [x, y] = xyFromTransform(transform)
  editorStore.dragElement(activeLayerId.value, x, y)
  editorStore.resizeElement(activeLayerId.value, width, height)
}

function onRotate(e: OnRotate) {
  e.target.style.transform = e.transform
}
</script>

<template>
  <div class="canvas-layout flex flex-col h-screen ">
    <NavbarCanvas />
    <main class="flex-grow flex">
      <div class="layers p-4 w-64 border-r border-slate-300">
        <div>Layers</div>
        <PanelLayer />
      </div>
      <div class="canvas bg-slate-200 flex-grow flex justify-center items-center overflow-hidden">
        <div class="frame bg-white w-[360px] h-[560px] shadow-sm relative">
          <component
            :is="elComponents[item.type]"
            v-for="item in editorStore.editor"
            :id="item.id"
            :key="item.id"
            :attrs="item" @mousedown="handleMouseDown($event, item.id)"
          />
          <Moveable
            ref="moveableRef"
            :edge="true"
            :target="moveableTarget"
            :draggable="true"
            :resizable="true"
            :round-clickable="false"
            :rotatable="true"
            :snappable="true"
            :element-guidelines="[...moveableElClassArr, '.frame']"
            :snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
            :element-snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
            :max-snap-element-guideline-distance="100"
            :max-snap-element-gap-distance="80"
            @drag="onDrag"
            @drag-end="onDragEnd"
            @resize="onResize"
            @resize-end="onResizeEnd"
            @rotate="onRotate"
          />
        </div>
      </div>
      <div class="props p-4 w-72 border-l border-slate-300">
        <PanelProps />
      </div>
    </main>
  </div>
</template>
