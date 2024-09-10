<script lang="ts" setup>
import ElText from '@/components/ElText.vue'
import NavbarCanvas from '@/components/NavbarCanvas.vue'
import PanelLayer from '@/components/PanelLayer.vue'
import PanelProps from '@/components/PanelProps.vue'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/store/editor'
import { generateScreenshot } from '@/utils'
import { nextTick, ref, toRefs, watch } from 'vue'
import Moveable from 'vue3-moveable'
import type { Component } from 'vue'
import type { MoveableInterface, OnDrag, OnDragEnd, OnResize, OnResizeEnd, OnRotate, OnRotateEnd } from 'vue3-moveable'

const editorStore = useEditorStore()
const { activeLayerId, layerData: activeLayerData, layers: editor } = toRefs(editorStore)

const elComponents: Record<string, Component> = {
  text: ElText,
}

const moveableRef = ref<MoveableInterface | null>(null)
const moveableElClassArr = editorStore.layers.map(item => `.el-${item.id}`)
const moveableTarget = ref<string[]>([])
const frame = ref<HTMLDivElement | null>(null)

watch(activeLayerData, () => {
  if (activeLayerData.value) {
    nextTick(() => {
      moveableRef.value?.updateRect()
    })
  }
}, { deep: true })

watch(activeLayerId, () => {
  if (activeLayerId.value) {
    moveableTarget.value = [`#${activeLayerId.value}`]
  }
  else {
    moveableTarget.value = []
  }
})

function handleMouseDown(_: MouseEvent, elId: string, type: string) {
  editorStore.activeLayerId = elId
  editorStore.activeLayerType = type
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
  if (!e.lastEvent)
    return
  const { transform } = e.lastEvent
  const [x, y] = xyFromTransform(transform)
  editorStore.dragLayer(activeLayerId.value, x, y)
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
  editorStore.dragLayer(activeLayerId.value, x, y)
  editorStore.resizeLayer(activeLayerId.value, width, height)
}

function onRotate(e: OnRotate) {
  e.target.style.transform = e.transform
}

function onRotateEnd(e: OnRotateEnd) {
  if (!e.lastEvent)
    return
  const { rotate } = e.lastEvent
  editorStore.rotateLayer(activeLayerId.value, rotate)
}

function downloadImg() {
  generateScreenshot(frame.value)
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
        <div
          ref="frame"
          :style="{ width: `${editorStore.frames[0].size.width}px`, height: `${editorStore.frames[0].size.height}px`, backgroundColor: editorStore.frames[0].fill }"
          class="frame bg-white w-[360px] h-[560px] shadow-sm relative"
        >
          <component
            :is="elComponents[item.type]"
            v-for="item in [...editor].reverse()"
            :id="item.id"
            :key="item.id"
            :attrs="item"
            @mousedown="handleMouseDown($event, item.id, item.type)"
          />
          <Moveable
            ref="moveableRef"
            :edge="true"
            :target="moveableTarget"
            :draggable="true"
            :resizable="true"
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
            @rotate-end="onRotateEnd"
          />
          <div class="absolute top-0 right-0 -translate-y-8">
            <Button variant="ghost" size="xs" class="hover:bg-slate-100/80" @click="downloadImg">
              <Icon class="text-slate-500 size-4" icon="carbon:download" />
            </Button>
          </div>
        </div>
      </div>
      <div class="props p-4 w-72 border-l border-slate-300">
        <PanelProps />
      </div>
    </main>
  </div>
</template>
