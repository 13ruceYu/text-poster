<script lang="ts" setup>
import type { Component } from 'vue'
import { computed, reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import NavbarCanvas from '@/components/NavbarCanvas.vue'
import ElText from '@/components/ElText.vue'
import { Separator } from '@/components/ui/separator'

const elComponents: Record<string, Component> = {
  text: ElText,
}

const mockData = reactive([
  {
    id: 'el-wedgd',
    type: 'text',
    text: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
    size: { width: 360, height: 'auto' },
    position: { x: 0, y: 0 },
    border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
    padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
    color: '#2FA4E8',
    fill: '',
    fontFamily: { value: 'mingchao' },
    fontSize: { value: 32 },
    lineHeight: { value: 1.2 },
    spacing: { value: 4 },
    align: { value: 'left' },
  },
])

const activeElement = ref<HTMLElement | null>(null)
const activeElementId = ref<string | null>(null)
const activeElementData = computed(() => {
  return mockData.find(item => item.id === activeElementId.value)
})

function handleClick(e: Event, elId: string) {
  activeElement.value = e.target as HTMLElement
  activeElementId.value = elId
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
      <div class="canvas bg-slate-200 flex-grow flex justify-center items-center">
        <div class="frame bg-white w-[360px] h-[560px] border shadow-sm">
          <component :is="elComponents[item.type]" v-for="item in mockData" :key="item.id" :attrs="item" class="hover:outline outline-blue-300 cursor-pointer" :class="[activeElementId === item.id ? 'outline outline-blue-500' : '']" @click="handleClick($event, item.id)" />
        </div>
      </div>
      <div class="props p-4 w-72 border-l border-slate-300">
        <div v-if="activeElementData">
          <div>
            <p class="mb-2">
              Text
            </p>
            <Textarea v-model="activeElementData.text" />
          </div>
          <Separator class="my-4" />
          <div>
            <p class="mb-2">
              Layout
            </p>
            <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2 mb-2">
              <Label class="text-sm">size</Label>
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

<style scoped>
.children-border {
  & > * {
    border: 2px solid green;
  }
}
</style>
