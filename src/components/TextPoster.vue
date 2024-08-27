<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { Icon } from '@iconify/vue'
import CanvasSetting from './CanvasSetting.vue'
import BlockSetting from './BlockSetting.vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import type { ICanvasProps, IContentBlock } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { templateList } from '@/components/mockTemplateData'

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasKey = ref(0)

interface Template {
  name: string
  content: IContentBlock[]
  canvasProps: ICanvasProps
  thumbnail: string
}
const canvasProps = reactive<ICanvasProps>({ ...templateList[0].canvasProps })

const contentBlocks = reactive<IContentBlock[]>([...templateList[0].content])

const isTemplatePopoverOpen = ref(false)

// use html2canvas to generate a screenshot
function generateScreenshot() {
  if (canvas.value) {
    html2canvas(canvas.value).then((canvas) => {
      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/png')

      // Create a link element and trigger download
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'screenshot.png'
      link.click()
    })
  }
}

function deleteBlock(index: number) {
  contentBlocks.splice(index, 1)
}

function addBlock() {
  contentBlocks.push({
    name: 'text',
    content: '',
    style: {
      color: '',
      fontFamily: '',
      fontSize: '16px',
      textAlign: 'left',
    },
  })
}

function applyTemplate(template: Template) {
  isTemplatePopoverOpen.value = false
  canvasKey.value += 1

  contentBlocks.splice(0, contentBlocks.length, ...template.content)
  canvasProps.width = template.canvasProps.width
  canvasProps.height = template.canvasProps.height
  canvasProps.padding = template.canvasProps.padding
  canvasProps.color = template.canvasProps.color
  canvasProps.backgroundColor = template.canvasProps.backgroundColor
  canvasProps.fontFamily = template.canvasProps.fontFamily
  canvasProps.backgroundImage = template.canvasProps.backgroundImage
}
</script>

<template>
  <nav class="max-w-screen-lg mx-auto border border-border px-2 shadow-sm h-12 flex items-center justify-between rounded-sm mt-2">
    <div class="logo flex items-center justify-center text-theme">
      <img src="@/assets/logo.svg" alt="logo">
      <div class="text-2xl font-bold ml-2">
        Text Poster
      </div>
    </div>
    <div>
      <Icon class="size-7 p-1 rounded-sm cursor-pointer hover:bg-slate-100" icon="carbon:light" />
    </div>
  </nav>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col justify-center p-4 order-2 md:order-1">
      <div v-for="(block, index) in contentBlocks" :key="index" class="mb-4">
        <Textarea v-model="block.content" />
        <div class="mt-2">
          <Button variant="outline" size="xs" class="mr-2" @click="deleteBlock(index)">
            <Icon icon="carbon:trash-can" />
          </Button>
          <BlockSetting :block="block" />
        </div>
      </div>
      <div>
        <Button variant="outline" @click="addBlock">
          <Icon icon="carbon:add-large" /> Add Block
        </Button>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center md:min-h-screen md:pt-0 pt-10 order-1 md:order-2">
      <Card class="p-2">
        <div
          ref="canvas" :key="canvasKey" :style="{
            width: canvasProps.width,
            height: canvasProps.height || 'auto',
            padding: canvasProps.padding,
            color: canvasProps.color,
            backgroundColor: canvasProps.backgroundColor,
            fontFamily: canvasProps.fontFamily,
            backgroundImage: `url(${canvasProps.backgroundImage})`,
          }" class="canvas"
        >
          <div
            v-for="(block, index) in contentBlocks" :key="index" :style="{
              fontSize: block.style.fontSize,
              textAlign: block.style.textAlign,
              marginTop: block.style.marginTop || 0,
            }"
          >
            <p v-for="(line, idx) in block.content.split('\n')" :key="idx">
              {{ line }}
            </p>
          </div>
        </div>
      </Card>
      <div>{{ }}</div>
      <div class="mt-4 flex items-center justify-center gap-2">
        <CanvasSetting :canvas-props="canvasProps" />
        <!-- <Button variant="outline">
          <Icon icon="carbon:save-series" />
        </Button> -->
        <Popover v-model:open="isTemplatePopoverOpen">
          <PopoverTrigger as-child>
            <Button variant="outline">
              <Icon icon="carbon:stacked-scrolling-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-96">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div v-for="template in templateList" :key="template.name" class="template-item">
                <img
                  :src="template.thumbnail" :alt="template.name"
                  class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  @click="applyTemplate(template)"
                >
                <p class="mt-2 text-sm text-center">
                  {{ template.name }}
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="outline" @click="generateScreenshot">
          Download
          <Icon class="ml-1" icon="carbon:image" />
        </Button>
      </div>
    </div>
  </div>
  <div class="text-center text-sm text-gray-500">
    Made with ❤️ by Bruce
  </div>
</template>
