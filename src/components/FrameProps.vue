<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useEditorStore } from '@/store/editor'
import { toRefs } from 'vue'

const editorStore = useEditorStore()
const { frameData } = toRefs(editorStore)
</script>

<template>
  <div v-if="frameData" class="panel-props">
    <div>
      <p class="mb-2">
        Layout
      </p>
      <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2 mb-2">
        <Label class="text-xs">Size</Label>
        <Input v-model="frameData.size.width" class="h-8" />
        <Input v-model="frameData.size.height" class="h-8" />
      </div>
    </div>
    <Separator class="my-4" />
    <div>
      <p>Color</p>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2 mb-2">
        <Label class="text-xs">Fill</Label>
        <div class="relative">
          <span
            class="h-6 w-6 inline-block absolute left-1 top-1 border border-slate-300 rounded-md"
            :style="{ backgroundColor: frameData.fill }"
          />
          <Input v-model="frameData.fill" class="h-8 pl-8" />
        </div>
      </div>
    </div>
    <Separator class="my-4" />
  </div>
</template>
