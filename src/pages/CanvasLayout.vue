<script lang="ts" setup>
import type { Component } from 'vue'
import { computed, reactive, ref, watch } from 'vue'
import type { OnDrag, OnResize, OnRotate } from 'vue3-moveable'
import Moveable from 'vue3-moveable'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import NavbarCanvas from '@/components/NavbarCanvas.vue'
import ElText from '@/components/ElText.vue'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const elComponents: Record<string, Component> = {
  text: ElText,
}

const mockData = reactive([
  {
    id: 'el-wedgg',
    type: 'text',
    text: `Be bold.`,
    size: { width: 150, height: 'auto' },
    position: { x: 0, y: 0 },
    border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
    padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
    color: '#2FA4E8',
    fill: '',
    fontFamily: { value: 'mingchao' },
    fontSize: { value: 32 },
    lineHeight: { value: 1.2 },
    spacing: { value: 4 },
    align: 'left',
  },
  {
    id: 'el-wedgd',
    type: 'text',
    text: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
    size: { width: 200, height: 'auto' },
    position: { x: 0, y: 0 },
    border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
    padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
    color: '#2FA4E8',
    fill: '',
    fontFamily: { value: 'mingchao' },
    fontSize: { value: 32 },
    lineHeight: { value: 1.2 },
    spacing: { value: 4 },
    align: 'right',
  },

  {
    id: 'el-wedgge',
    type: 'text',
    text: `/萨特`,
    size: { width: 150, height: 'auto' },
    position: { x: 0, y: 0 },
    border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
    padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
    color: '#2FA4E8',
    fill: '',
    fontFamily: { value: 'mingchao' },
    fontSize: { value: 32 },
    lineHeight: { value: 1.2 },
    spacing: { value: 4 },
    align: 'left',
  },
])
const moveableElClassArr = mockData.map(item => `.el-${item.id}`)
const activeElement = ref<HTMLElement | null>(null)
const activeElementId = ref<string | null>(null)
const activeElementData = computed(() => {
  return mockData.find(item => item.id === activeElementId.value)
})
const moveableRef = ref(null)

watch(activeElementId, (newVal) => {
  if (!newVal) {
    activeElement.value = null
  }
})

function handleMouseDown(mouse: MouseEvent, elId: string) {
  activeElement.value = mouse.currentTarget as HTMLElement
  activeElementId.value = elId
}

function onDrag(e: OnDrag) {
  if (!activeElement.value)
    return
  activeElement.value.style.transform = e.transform
}
function onResize(e: OnResize) {
  if (!activeElement.value)
    return

  activeElement.value.style.width = `${e.width}px`
  activeElement.value.style.height = `${e.height}px`
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
          class="frame bg-white w-[360px] h-[560px] border shadow-sm relative"
        >
          <component
            :is="elComponents[item.type]"
            v-for="item in mockData"
            :key="item.id"
            :class="[`el-${item.id}`]"
            :attrs="item"
            @mousedown="handleMouseDown($event, item.id)"
          />
          <Moveable
            ref="moveableRef"
            :target="activeElement"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :snappable="true"
            :element-guidelines="moveableElClassArr"
            :snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
            :element-snap-directions="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
            :max-snap-element-guideline-distance="100"
            :max-snap-element-gap-distance="80"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"
          />
        </div>
      </div>
      <div class="props p-4 w-72 border-l border-slate-300">
        <div v-if="activeElementData">
          <div>
            <p class="mb-2">
              Text
            </p>
            <Textarea v-model="activeElementData.text" class="mb-2" />
            <div class="grid grid-cols-[70px_1fr] items-center gap-2">
              <Label class="text-xs">Align</Label>
              <ToggleGroup v-model="activeElementData.align" size="sm" type="single" class="justify-normal">
                <ToggleGroupItem value="left">
                  <Icon class="size-5" icon="carbon:text-align-left" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center">
                  <Icon class="size-5" icon="carbon:text-align-center" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right">
                  <Icon class="size-5" icon="carbon:text-align-right" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <Separator class="my-4" />
          <div>
            <p class="mb-2">
              Layout
            </p>
            <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2 mb-2">
              <Label class="text-sm">Size</Label>
              <Input v-model="activeElementData.size.width" class="h-8" />
              <Input v-model="activeElementData.size.height" class="h-8" />
            </div>
            <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2">
              <Label class="text-sm">Position</Label>
              <Input v-model="activeElementData.position.x" class="h-8" />
              <Input v-model="activeElementData.position.y" class="h-8" />
            </div>
          </div>
          <Separator class="my-4" />
          <div>
            <p>Color</p>
            <div class="grid grid-cols-[70px_1fr] items-center gap-2">
              <Label class="text-sm">Fill</Label>
              <Input v-model="activeElementData.fill" type="color" class="h-8" />
            </div>
            <div class="grid grid-cols-[70px_1fr] items-center gap-2">
              <Label class="text-sm">Color</Label>
              <Input v-model="activeElementData.color" type="color" class="h-8" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
