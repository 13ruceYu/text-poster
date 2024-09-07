import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
  persist: true,
  state: () => ({
    activeElId: '',
    editor: [
      {
        id: 'a001',
        type: 'text',
        text: 'Be bold and don\'t be afraid. No one cares, even if someone cares, people are nothing.',
        size: {
          width: '300',
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
        lineHeight: {
          value: 1.2,
        },
        spacing: {
          value: 4,
        },
        align: 'left',
      },
      {
        id: 'a002',
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
        lineHeight: {
          value: 1.2,
        },
        spacing: {
          value: 4,
        },
        align: 'left',
      },
      {
        id: 'a003',
        type: 'text',
        text: '/萨特',
        size: {
          width: '300',
          height: 'auto',
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
        lineHeight: {
          value: 1.2,
        },
        spacing: {
          value: 4,
        },
        align: 'left',
      },
    ],
  }),
  getters: {
    activeElData(state) {
      return state.editor.find((item: { id: string }) => item.id === state.activeElId)
    },
  },
  actions: {
    dragElement(id: string, x: number, y: number) {
      const element = this.editor.find(item => item.id === id)
      if (!element)
        return

      element.position = { ...element.position, x, y }
    },
    adjustElementPosition(id: string, xOffset: number, yOffset: number) {
      const element = this.editor.find(item => item.id === id)
      if (!element)
        return

      element.position.x += xOffset
      element.position.y += yOffset
    },
    resizeElement(id: string, width: number, height: number) {
      const element = this.editor.find(item => item.id === id)
      if (!element)
        return

      element.size = { ...element.size, width, height }
    },
  },
})
