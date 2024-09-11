import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'

interface Layer {
  frameId?: string
  id: string
  name: string
  type: 'text' | 'image' | 'shape' | 'frame'
  zIndex: number
  text: string
  size: {
    width: number
    height: number
  }
  position: {
    x: number
    y: number
  }
  border: {
    value: number
    color: string
    left: number
    right: number
    top: number
    bottom: number
  }
  padding: {
    value: number
    left: number
    right: number
    top: number
    bottom: number
  }
  color: string
  fill: string
  fontFamily: string
  fontSize: string
  align: string
  visibility: boolean
  locked: boolean
  rotate: number
}

const newTextLayer: Layer = {
  id: '',
  name: '',
  type: 'text',
  zIndex: 0,
  text: 'new text here',
  size: {
    width: 300,
    height: 32,
  },
  position: {
    x: 30,
    y: 30,
  },
  border: {
    value: 0,
    color: 'black',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  padding: {
    value: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  color: '#000000',
  fill: '',
  fontFamily: 'mingchao',
  fontSize: '16',
  align: 'left',
  visibility: true,
  locked: false,
  rotate: 0,
}

export const useEditorStore = defineStore('editor', {
  persist: true,
  state: () => ({
    editorName: 'text-poster',
    activeLayerId: '',
    frames: [
      {
        id: 'f001',
        name: 'frame-sdc',
        type: 'frame',
        size: {
          width: 360,
          height: 560,
        },
        fill: '#ffffff',
      },
    ],
    layers: [
      {
        id: 'a001',
        name: 'text-sdc',
        type: 'text',
        zIndex: 0,
        text: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
        size: {
          width: 300,
          height: 50,
        },
        position: {
          x: 30,
          y: 299,
        },
        border: {
          value: 0,
          color: 'black',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        padding: {
          value: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        color: '#2FA4E8',
        fill: '#ffffff',
        fontFamily: 'mingchao',
        fontSize: '16',

        align: 'left',
        visibility: true,
        locked: false,
        rotate: 0,
      },
      {
        id: 'a002',
        name: 'text-sdcc',
        type: 'text',
        text: '大胆去做，不要怕，\n没有人在乎，\n就算有人在乎，\n人又算什么东西。',
        size: {
          width: 300,
          height: 197,
        },
        position: {
          x: 30,
          y: 26,
        },
        border: {
          value: 0,
          color: 'black',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        padding: {
          value: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        color: '#2FA4E8',
        fill: '#ffffff',
        fontFamily: 'mingchao',
        fontSize: '32',
        align: 'left',
        visibility: true,
        locked: false,
        rotate: 0,
      },
      {
        id: 'a003',
        name: 'text-sdc9',
        type: 'text',
        text: '/萨特',
        size: {
          width: 300,
          height: -1,
        },
        position: {
          x: 30,
          y: 450,
        },
        border: {
          value: 0,
          color: 'black',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        padding: {
          value: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        color: '#43a3db',
        fill: '#ffffff',
        fontFamily: 'mingchao',
        fontSize: '12',
        align: 'left',
        visibility: true,
        locked: false,
        rotate: 0,
      },
    ],
  }),
  getters: {
    layerData(state) {
      return state.layers.find((item: { id: string }) => item.id === state.activeLayerId)
    },
    frameData(state) {
      return state.frames.find((item: { id: string }) => item.id === state.activeLayerId)
    },
    activeLayerType(state) {
      return [...state.layers, ...state.frames].find((item: { id: string }) => item.id === state.activeLayerId)?.type
    },
  },
  actions: {
    addNewLayer(type: string) {
      const idAndName = {
        id: `m${nanoid()}`,
        name: `text-${nanoid(3)}`,
      }
      switch (type) {
        case 'text':
          this.layers.push({ ...newTextLayer, ...idAndName })
          break
        case 'image':
          break
        case 'shape':
          break
      }
      this.activeLayerId = idAndName.id
    },
    deleteLayer(id: string) {
      const index = this.layers.findIndex(item => item.id === id)
      if (index === -1)
        return
      this.layers.splice(index, 1)
      if (this.activeLayerId === id)
        this.activeLayerId = ''
    },
    moveLayerFront(id: string) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      const index = this.layers.findIndex(item => item.id === id)
      if (index === -1)
        return

      this.layers.splice(index, 1)
      this.layers.unshift(element)
    },
    moveLayerBack(id: string) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      const index = this.layers.findIndex(item => item.id === id)
      if (index === -1)
        return

      this.layers.splice(index, 1)
      this.layers.push(element)
    },
    dragLayer(id: string, x: number, y: number) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      element.position = { ...element.position, x, y }
    },
    resizeLayer(id: string, width: number, height: number) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      element.size = { ...element.size, width, height }
    },
    rotateLayer(id: string, rotate: number) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      element.rotate = rotate
    },
    triggerLayerVisibility(id: string) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      element.visibility = !element.visibility
    },
    triggerLayerLocked(id: string) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return

      element.locked = !element.locked
    },
    modifyLayer(id: string, key: Exclude<keyof Layer, 'frameId'>, value: any) {
      const element = this.layers.find(item => item.id === id)
      if (!element)
        return
      const newEl = { ...element, [key]: value }
      this.layers.splice(this.layers.findIndex(item => item.id === id), 1, newEl)
    },
  },
})
