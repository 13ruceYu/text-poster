<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { ICanvasProps } from '@/types'
import { fontFamilyOptions } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { bgImageList } from '@/assets/bg-image'

const props = defineProps<{
  canvasProps: ICanvasProps
}>()

const colorList = [
  '#3c7e44', // Original color
  '#3c4e7e', // Blue-ish
  '#7e3c44', // Red-ish
  '#7e743c', // Yellow-ish
  '#443c7e', // Purple-ish
  '#3c7e7e', // Cyan-ish
  '#7e3c7e', // Magenta-ish
]
</script>

<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <Popover>
    <PopoverTrigger>
      <Button variant="outline">
        <Icon icon="carbon:settings-adjust" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid grid-gap-4">
        <div class="space-y-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Width</Label>
            <Input v-model="props.canvasProps.width" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Height</Label>
            <Input v-model="props.canvasProps.height" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Padding</Label>
            <Input v-model="props.canvasProps.padding" class="col-span-2 h-8" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Color</Label>
            <Input v-model="props.canvasProps.color" class="col-span-2 h-8" type="color" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Background Color</Label>
            <Input v-model="props.canvasProps.backgroundColor" class="col-span-2 h-8" type="color" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label />
            <div class="color-list col-span-2 h-8 flex items-center">
              <div
                v-for="color in colorList" :key="color"
                class="color-item inline-block w-4 h-4 mr-2 rounded-full cursor-pointer"
                :style="{ backgroundColor: color }"
                @click="props.canvasProps.color = color"
              />
            </div>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Font Family</Label>
            <Select v-model="props.canvasProps.fontFamily">
              <SelectTrigger class="w-[180px]">
                <SelectValue :value="props.canvasProps.fontFamily" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="fontFamily in fontFamilyOptions" :key="fontFamily" :value="fontFamily">
                  {{ fontFamily }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Background Image</Label>
            <div class="col-span-2 grid grid-cols-3 gap-4">
              <div v-for="bgImage in bgImageList" :key="bgImage.name" class="bg-item">
                <div
                  class="bg-thumbnail h-20 bg-cover border border-gray-200 rounded-lg cursor-pointer"
                  :class="[props.canvasProps.backgroundImage === bgImage.url ? ' border-blue-500' : '']"
                  :style="{ backgroundImage: `url(${bgImage.url})` }"
                  @click="props.canvasProps.backgroundImage === bgImage.url ? props.canvasProps.backgroundImage = '' : props.canvasProps.backgroundImage = bgImage.url"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
