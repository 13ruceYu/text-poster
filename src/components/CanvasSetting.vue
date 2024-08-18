<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import { CanvasProps } from '@/types'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
const colorList = [
  '#3c7e44', // Original color
  '#3c4e7e', // Blue-ish
  '#7e3c44', // Red-ish
  '#7e743c', // Yellow-ish
  '#443c7e', // Purple-ish
  '#3c7e7e', // Cyan-ish
  '#7e3c7e', // Magenta-ish
]
const fontFamilies = ['mingchao', 'helvetica', 'arial', 'simhei', 'simsong']

const props = defineProps<{
  canvasProps: CanvasProps
}>()
</script>

<template>
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
            <Input class="col-span-2 h-8" v-model="props.canvasProps.width" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Height</Label>
            <Input class="col-span-2 h-8" v-model="props.canvasProps.height" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Padding</Label>
            <Input class="col-span-2 h-8" v-model="props.canvasProps.padding" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Color</Label>
            <Input class="col-span-2 h-8" type="color" v-model="props.canvasProps.color" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Background Color</Label>
            <Input class="col-span-2 h-8" type="color" v-model="props.canvasProps.backgroundColor" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label></Label>
            <div class="color-list col-span-2 h-8 flex items-center">
              <div class="color-item inline-block w-4 h-4 mr-2 rounded-full cursor-pointer" v-for="color in colorList"
                :key="color" :style="{ backgroundColor: color }" @click="props.canvasProps.color = color"></div>
            </div>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Font Family</Label>
            <Select v-model="props.canvasProps.fontFamily">
              <SelectTrigger class="w-[180px]">
                <SelectValue :value="props.canvasProps.fontFamily" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="fontFamily in fontFamilies" :key="fontFamily" :value="fontFamily">{{ fontFamily }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>