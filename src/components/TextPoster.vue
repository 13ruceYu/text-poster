<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@iconify/vue'
import { Card } from '@/components/ui/card'
import { confetti } from '@tsparticles/confetti'
import CanvasSetting from './CanvasSetting.vue'
import BlockSetting from './BlockSetting.vue'
import { CanvasProps, ContentBlock } from '@/types'

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasProps = reactive<CanvasProps>({
  width: '360px',
  height: '',
  padding: '16px',
  color: '#3c7e44',
  backgroundColor: '#e5e7eb'
})



const contentBlocks = reactive<ContentBlock[]>([
  {
    name: 'text',
    content: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
    style: {
      color: "",
      fontFamily: "",
      fontSize: "32px",
      textAlign: "left"
    }
  },
  {
    name: 'text',
    content: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
    style: {
      color: '',
      fontFamily: '',
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
      fontFamily: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '64px'
    }
  }
])

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
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6, x: 0.5 },
      });
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
</script>

<template>
  <div :style="{ color: canvasProps.color }" class="logo fixed top-0 left-0 flex items-center justify-center">
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
          backgroundColor: canvasProps.backgroundColor
        }" class="canvas font-mingchao">
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
        <Button variant="outline">
          <Icon icon="carbon:stacked-scrolling-1" />
        </Button>
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