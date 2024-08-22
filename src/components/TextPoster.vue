<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@iconify/vue'
import { Card } from '@/components/ui/card'
import CanvasSetting from './CanvasSetting.vue'
import BlockSetting from './BlockSetting.vue'
import { ICanvasProps, IContentBlock } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const canvas = ref<HTMLCanvasElement | null>(null)

const defaultCanvasProps: ICanvasProps = {
  width: '360px',
  height: '',
  padding: '16px',
  color: '#3c7e44',
  backgroundColor: '#e5e7eb',
  fontFamily: 'mingchao'
}

const canvasProps2: ICanvasProps = {
  width: '360px',
  height: '',
  padding: '16px',
  color: '#7e3c44',
  backgroundColor: '#e5e7eb',
  fontFamily: 'arial'
}

const canvasProps = reactive<ICanvasProps>(defaultCanvasProps)

interface Template {
  name: string
  content: IContentBlock[]
  canvasProps: ICanvasProps
  thumbnail: string
}

const mockContentBlocks: IContentBlock[] = [
  {
    name: 'text',
    content: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
    style: {
      color: "",
      fontSize: "32px",
      textAlign: "left"
    }
  },
  {
    name: 'text',
    content: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '16px'
    }
  },
  {
    name: 'text',
    content: '/威廉·萨默塞特·毛姆',
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '64px'
    }
  }
]

const mockContentBlocks2: IContentBlock[] = [
  {
    name: 'text',
    content: `先做个垃圾出来`,
    style: {
      color: "",
      fontSize: "32px",
      textAlign: "left"
    }
  },
  {
    name: 'text',
    content: `不制作垃圾
你就只有
焦虑拖延的机会`,
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '16px'
    }
  },
  {
    name: 'text',
    content: `有垃圾
就有
变废为宝的机会`,
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '64px'
    }
  }
]


const contentBlocks = reactive<IContentBlock[]>(mockContentBlocks)


const templateList = reactive<Template[]>([
  {
    name: 'default',
    content: contentBlocks,
    canvasProps: canvasProps,
    thumbnail: 'https://dummyimage.com/200x300'
  },
  {
    name: 'default-2',
    content: mockContentBlocks2,
    canvasProps: canvasProps2,
    thumbnail: 'https://dummyimage.com/300x300'
  },
  {
    name: 'default-3',
    content: contentBlocks,
    canvasProps: canvasProps2,
    thumbnail: 'https://dummyimage.com/400x300'
  },
  {
    name: 'default-4',
    content: contentBlocks,
    canvasProps: canvasProps2,
    thumbnail: 'https://dummyimage.com/300x500'
  },
  {
    name: 'default-5',
    content: contentBlocks,
    canvasProps: canvasProps2,
    thumbnail: 'https://dummyimage.com/400x300'
  },
  {
    name: 'default-6',
    content: contentBlocks,
    canvasProps: canvasProps2,
    thumbnail: 'https://dummyimage.com/400x400'
  },
])

const isTemplatePopoverOpen = ref(false)

// use html2canvas to generate a screenshot
const generateScreenshot = () => {
  if (canvas.value) {
    html2canvas(canvas.value).then(canvas => {
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

const deleteBlock = (index: number) => {
  contentBlocks.splice(index, 1)
}

const addBlock = () => {
  contentBlocks.push({
    name: 'text',
    content: '',
    style: {
      color: '',
      fontFamily: '',
      fontSize: '16px',
      textAlign: 'left'
    }
  })
}

function applyTemplate(template: Template) {
  isTemplatePopoverOpen.value = false

  contentBlocks.splice(0, contentBlocks.length, ...template.content)
  canvasProps.width = template.canvasProps.width
  canvasProps.height = template.canvasProps.height
  canvasProps.padding = template.canvasProps.padding
  canvasProps.color = template.canvasProps.color
  canvasProps.backgroundColor = template.canvasProps.backgroundColor
  canvasProps.fontFamily = template.canvasProps.fontFamily
}
</script>

<template>
  <div class="logo fixed top-0 left-0 flex items-center justify-center text-theme">
    <img src="@/assets/logo.svg" alt="logo" />
    <div class="text-2xl font-bold ml-2">Text Poster</div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-lg mx-auto">
    <div class="flex flex-col justify-center p-4 order-2 md:order-1">
      <div class="mb-4" v-for="(block, index) in contentBlocks" :key="index">
        <Textarea v-model="block.content"></Textarea>
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
        <div ref="canvas" :style="{
          width: canvasProps.width,
          height: canvasProps.height || 'auto',
          padding: canvasProps.padding,
          color: canvasProps.color,
          backgroundColor: canvasProps.backgroundColor,
          fontFamily: canvasProps.fontFamily
        }" class="canvas">
          <div v-for="(block, index) in contentBlocks" :key="index" :style="{
            fontSize: block.style.fontSize,
            textAlign: block.style.textAlign,
            marginTop: block.style.marginTop || 0
          }">
            <p v-for="(line, index) in block.content.split('\n')" :key="index">{{ line }}</p>
          </div>
        </div>
      </Card>
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
                <img :src="template.thumbnail" :alt="template.name"
                  class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  @click="applyTemplate(template)" />
                <p class="mt-2 text-sm text-center">{{ template.name }}</p>
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