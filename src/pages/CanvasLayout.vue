<script lang="ts" setup>
import type { Component } from 'vue'
import { nextTick, ref, toRefs, watch } from 'vue'
import type { MoveableInterface, OnDrag, OnDragEnd, OnResize, OnResizeEnd, OnRotate } from 'vue3-moveable'
import Moveable from 'vue3-moveable'
import { Button } from '@/components/ui/button'
import PanelProps from '@/components/PanelProps.vue'
import NavbarCanvas from '@/components/NavbarCanvas.vue'
import ElText from '@/components/ElText.vue'
import { useEditorStore } from '@/store/editor'

const editorStore = useEditorStore()
const { activeElId, activeElData } = toRefs(editorStore)

const elComponents: Record<string, Component> = {
  text: ElText,
}

const activeElement = ref<HTMLElement | null>(null)
const moveableRef = ref<MoveableInterface | null>(null)
const moveableElClassArr = editorStore.editor.map(item => `.el-${item.id}`)

watch(activeElData, () => {
  if (activeElData.value) {
    nextTick(() => {
      moveableRef.value?.updateRect()
    })
  }
}, { deep: true })

function handleMouseDown(mouse: MouseEvent, elId: string) {
  activeElement.value = mouse.currentTarget as HTMLElement
  editorStore.activeElId = elId
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
  editorStore.dragElement(activeElId.value, x, y)
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
  editorStore.dragElement(activeElId.value, x, y)
  editorStore.resizeElement(activeElId.value, width, height)
}

function onRotate(e: OnRotate) {
  if (!activeElement.value)
    return
  activeElement.value.style.transform = e.transform
}
</script>

<template>
  <div class="canvas-layout flex flex-col h-screen ">
    <NavbarCanvas />
    <main class="flex-grow flex">
      <div class="layers p-4 w-64 border-r border-slate-300">
        <div>Layers</div>
        <ul>
          <li class="flex items-center gap-2 justify-between hover:bg-slate-200 p-2 rounded-sm">
            <div class="flex items-center gap-2">
              <Icon icon="carbon:square-outline" class="size-5" /><span>frame</span>
            </div>
            <div>
              <Button size="xs" variant="ghost">
                <Icon icon="carbon:view" />
              </Button>
              <Button size="xs" variant="ghost">
                <Icon icon="carbon:unlocked" />
              </Button>
            </div>
          </li>
          <li class="flex items-center gap-2 justify-between hover:bg-slate-200 p-2 rounded-sm">
            <div class="flex items-center gap-2">
              <Icon icon="carbon:image" class="size-5" /><span>image-layer</span>
            </div>
            <div>
              <Button size="xs" variant="ghost">
                <Icon icon="carbon:view" />
              </Button>
              <Button size="xs" variant="ghost">
                <Icon icon="carbon:unlocked" />
              </Button>
            </div>
          </li>
        </ul>
      </div>
      <div class="canvas bg-slate-200 flex-grow flex justify-center items-center overflow-hidden">
        <div
          class="frame bg-white w-[360px] h-[560px] shadow-sm relative"
        >
          <component
            :is="elComponents[item.type]"
            v-for="item in editorStore.editor"
            :key="item.id"
            :class="[`el-${item.id}`]"
            :attrs="item"
            @mousedown="handleMouseDown($event, item.id)"
          />
          <Moveable
            ref="moveableRef"
            :edge="true"
            :target="activeElement"
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
