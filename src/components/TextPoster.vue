<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'

const canvas = ref<HTMLCanvasElement | null>(null)
const contentBlocks = reactive([
  {
    name: 'text',
    content: '大胆去做, 不要怕, 没有人在乎, 就算有人在乎, 人又算什么东西。',
    style: {
      color: '',
      fontFamily: '',
      fontSize: '',
      textAlign: ''
    }
  },
  {
    name: 'text',
    content: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
    style: {
      color: '',
      fontFamily: '',
      fontSize: '',
      textAlign: ''
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
      fontSize: '',
      textAlign: ''
    }
  })
}

const styleBlock = (index: number) => {
  console.log(index)
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-col justify-center p-4">
      <div class="mb-4" v-for="(block, index) in contentBlocks" :key="index">
        <textarea class="border-2 border-gray-300 rounded-md p-2 w-full" rows="5" v-model="block.content"></textarea>
        <div>
          <button @click="deleteBlock(index)" class="bg-red-500 text-white px-2 py-1 rounded-md">delete</button>
          <button @click="styleBlock(index)" class="bg-green-500 text-white px-2 py-1 rounded-md">style</button>
        </div>
      </div>
      <div>
        <button @click="addBlock" class="bg-blue-500 text-white px-4 py-2 rounded-md">add</button>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center h-screen">
      <div ref="canvas" class="w-[360px] bg-gray-200 text-green-700 p-4 font-mingchao">
        <div v-for="(block, index) in contentBlocks" :key="index">
          <p v-for="(line, index) in block.content.split('\n')" :key="index" class="text-3xl">{{ line }}</p>
        </div>
      </div>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" @click="generateScreenshot">
        下载图片
      </button>
    </div>
  </div>
</template>