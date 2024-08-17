<script lang="ts" setup>
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Icon } from '@iconify/vue'
import { Card } from '@/components/ui/card'
import { confetti } from '@tsparticles/confetti'

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
  height: '',
  padding: '16px',
  color: '#3c7e44',
  backgroundColor: '#e5e7eb'
})

const colorList = [
  '#3c7e44', // Original color
  '#3c4e7e', // Blue-ish
  '#7e3c44', // Red-ish
  '#7e743c', // Yellow-ish
  '#443c7e', // Purple-ish
  '#3c7e7e', // Cyan-ish
  '#7e3c7e', // Magenta-ish

]

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
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" size="xs">
                <Icon icon="carbon:color-palette" />
              </Button>
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
                        <SelectItem value="128px">128px</SelectItem>
                        <SelectItem value="192px">192px</SelectItem>
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
      <div class="mt-4 flex items-center justify-center">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" class="mr-4">
              <Icon icon="carbon:settings-adjust" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <div class="grid grid-gap-4">
              <div class="space-y-2">
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Width</Label>
                  <Input class="col-span-2 h-8" v-model="canvasProps.width" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Height</Label>
                  <Input class="col-span-2 h-8" v-model="canvasProps.height" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Padding</Label>
                  <Input class="col-span-2 h-8" v-model="canvasProps.padding" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Color</Label>
                  <Input class="col-span-2 h-8" type="color" v-model="canvasProps.color" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label>Background Color</Label>
                  <Input class="col-span-2 h-8" type="color" v-model="canvasProps.backgroundColor" />
                </div>
                <div class="grid grid-cols-3 items-center gap-4">
                  <Label></Label>
                  <div class="color-list col-span-2 h-8 flex items-center">
                    <div class="color-item inline-block w-4 h-4 mr-2 rounded-full cursor-pointer"
                      v-for="color in colorList" :key="color" :style="{ backgroundColor: color }"
                      @click="canvasProps.color = color"></div>
                  </div>
                </div>
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