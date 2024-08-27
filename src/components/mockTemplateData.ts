import type { ICanvasProps, IContentBlock } from '@/types'
import GreenDot from '@/assets/bg-image/green-dot.png'
import ImageBeBold from '@/assets/templates/be-bold.png'
import ImageBeProtected from '@/assets/templates/be-protected.jpeg'

interface Template {
  name: string
  content: IContentBlock[]
  canvasProps: ICanvasProps
  thumbnail: string
  id: number
}

const canvasProps1: ICanvasProps = {
  width: '360px',
  height: '',
  padding: '16px',
  color: '#3c7e44',
  backgroundColor: '#e5e7eb',
  fontFamily: 'mingchao',
  backgroundImage: GreenDot,
}

const canvasProps2: ICanvasProps = {
  width: '360px',
  height: '',
  padding: '16px',
  color: '#000',
  backgroundColor: '#c2bab4',
  fontFamily: 'mingchao',
}

const mockContentBlocks: IContentBlock[] = [
  {
    name: 'text',
    content: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
    style: {
      color: '',
      fontSize: '32px',
      textAlign: 'left',
    },
  },
  {
    name: 'text',
    content: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '16px',
    },
  },
  {
    name: 'text',
    content: '/威廉·萨默塞特·毛姆',
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'left',
      marginTop: '64px',
    },
  },
]

const mockContentBlocks2: IContentBlock[] = [
  {
    name: 'text',
    content: `你被什么保护，
就被什么限制。
能给你遮风挡雨的，
同样能你不见天日。`,
    style: {
      color: '',
      fontSize: '32px',
      textAlign: 'left',
    },
  },
  {
    name: 'text',
    content: `——《没有白走的路》`,
    style: {
      color: '',
      fontSize: '16px',
      textAlign: 'right',
      marginTop: '96px',
    },
  },
]

export const templateList: Template[] = [
  {
    name: 'be-bold',
    content: mockContentBlocks,
    canvasProps: canvasProps1,
    thumbnail: ImageBeBold,
    id: 1,
  },
  {
    name: 'be-protected',
    content: mockContentBlocks2,
    canvasProps: canvasProps2,
    thumbnail: ImageBeProtected,
    id: 2,
  },
]
