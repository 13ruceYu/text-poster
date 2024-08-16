<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

const canvas = ref<HTMLCanvasElement | null>(null)

// Define the types
interface ContentBlockStyle {
  color?: string;
  fontFamily?: string;
  fontSize: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: string;
}

interface ContentBlock {
  name: string;
  content: string;
  style: ContentBlockStyle;
}

const canvasProps = reactive({
  width: '360px',
})

const contentBlocks = reactive<ContentBlock[]>([
  {
    name: 'text',
    content: '大胆去做，不要怕，没有人在乎，就算有人在乎，人又算什么东西。',
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
      marginTop: '16px'
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
      fontSize: '16px',
      textAlign: 'left'
    }
  })
}
</script>

<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-col justify-center p-4">
      <div class="mb-4" v-for="(block, index) in contentBlocks" :key="index">
        <textarea class="border-2 border-gray-300 rounded-md p-2 w-full" rows="5" v-model="block.content"></textarea>
        <div>
          <Button variant="destructive" size="xs" class="mr-2" @click="deleteBlock(index)">delete</Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="xs">style</Button>
            </PopoverTrigger>
            <PopoverContent class="w-80">
              <div class="grid grid-gap-4">
                <div class="space-y-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label>Font Size</Label>
                    <Select v-model="block.style.fontSize">
                      <SelectTrigger class="col-span-2 h-8">
                        <SelectValue :default-value="block.style.fontSize" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="32px">32px</SelectItem>
                        <SelectItem value="48px">48px</SelectItem>
                        <SelectItem value="64px">64px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label>Margin Top</Label>
                    <Select v-model="block.style.marginTop">
                      <SelectTrigger class="col-span-2 h-8">
                        <SelectValue :default-value="block.style.marginTop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">0px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="32px">32px</SelectItem>
                        <SelectItem value="48px">48px</SelectItem>
                        <SelectItem value="64px">64px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <Label>Text Align</Label>
                    <Tabs default-value="left" v-model="block.style.textAlign">
                      <TabsList>
                        <TabsTrigger value="left">
                          left
                        </TabsTrigger>
                        <TabsTrigger value="center">
                          center
                        </TabsTrigger>
                        <TabsTrigger value="right">
                          right
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <Button @click="addBlock">
          Add block
        </Button>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center h-screen">
      <div ref="canvas" :style="{
        width: canvasProps.width
      }" class="canvas bg-gray-200 text-green-700 p-4 font-mingchao">
        <div v-for="(block, index) in contentBlocks" :key="index" :style="{
          fontSize: block.style.fontSize,
          textAlign: block.style.textAlign,
          marginTop: block.style.marginTop || 0
        }">
          <p v-for="(line, index) in block.content.split('\n')" :key="index">{{ line }}</p>
        </div>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" class="mr-4">style</Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid grid-gap-4">
              <div class="space-y-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Width</Label>
                  <Input class="col-span-2 h-8" v-model="canvasProps.width" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button class="mt-4" @click="generateScreenshot">
          Download
        </Button>
      </div>
    </div>
  </div>
</template>