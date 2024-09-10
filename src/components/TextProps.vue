<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useEditorStore } from '@/store/editor'
import { fontFamilyOptions } from '@/types'
import { toRefs } from 'vue'

const editorStore = useEditorStore()
const { layerData: activeLayerData } = toRefs(editorStore)
</script>

<template>
  <div v-if="activeLayerData" class="panel-props">
    <div>
      <p class="mb-2">
        Text
      </p>
      <Textarea v-model="activeLayerData.text" class="mb-2" />
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-xs">Align</Label>
        <ToggleGroup v-model="activeLayerData.align" size="sm" type="single" class="justify-normal">
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
        <Label class="text-xs">Size</Label>
        <Input v-model="activeLayerData.size.width" class="h-8" />
        <Input v-model="activeLayerData.size.height" class="h-8" />
      </div>
      <div class="grid grid-cols-[70px_1fr_1fr] items-center gap-2 mb-2">
        <Label class="text-xs">Position</Label>
        <Input v-model="activeLayerData.position.x" class="h-8" />
        <Input v-model="activeLayerData.position.y" class="h-8" />
      </div>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-xs">Rotation</Label>
        <Input v-model="activeLayerData.rotate" class="h-8" />
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
            :style="{ backgroundColor: activeLayerData.fill }"
          />
          <Input v-model="activeLayerData.fill" class="h-8 pl-8" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-[70px_1fr] items-center gap-2">
      <Label class="text-xs">Color</Label>
      <div class="relative">
        <span
          class="h-6 w-6 inline-block absolute left-1 top-1 border border-slate-300 rounded-md"
          :style="{ backgroundColor: activeLayerData.color }"
        />
        <Input v-model="activeLayerData.color" class="h-8 pl-8" />
      </div>
    </div>
    <Separator class="my-4" />
    <div>
      <p>Font</p>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2 mb-2">
        <Label class="text-xs">Family</Label>
        <Select v-model="activeLayerData.fontFamily">
          <SelectTrigger class="h-8">
            <SelectValue :value="activeLayerData.fontFamily" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="fontFamily in fontFamilyOptions" :key="fontFamily" :style="{ fontFamily }" :value="fontFamily">
              {{ fontFamily }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-[70px_1fr] items-center gap-2">
        <Label class="text-xs">Size</Label>
        <Input v-model="activeLayerData.fontSize" class="h-8" />
      </div>
    </div>
  </div>
</template>
