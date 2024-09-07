import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', {
  state: () => ({
    activeElId: '',
    editor: [
      {
        id: '001',
        type: 'text',
        text: `Be bold.`,
        size: { width: 150, height: 50 },
        position: { x: 100, y: 100 },
        border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
        padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
        color: '#2FA4E8',
        fill: '',
        fontFamily: { value: 'mingchao' },
        fontSize: { value: 32 },
        lineHeight: { value: 1.2 },
        spacing: { value: 4 },
        align: 'left',
      },
      {
        id: '002',
        type: 'text',
        text: `大胆去做，不要怕，
没有人在乎，
就算有人在乎，
人又算什么东西。`,
        size: { width: 200, height: 50 },
        position: { x: 0, y: 0 },
        border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
        padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
        color: '#2FA4E8',
        fill: '',
        fontFamily: { value: 'mingchao' },
        fontSize: { value: 32 },
        lineHeight: { value: 1.2 },
        spacing: { value: 4 },
        align: 'right',
      },
      {
        id: '003',
        type: 'text',
        text: `/萨特`,
        size: { width: 150, height: 'auto' },
        position: { x: 200, y: 300 },
        border: { value: 0, color: 'black', left: 0, right: 0, top: 0, bottom: 0 },
        padding: { value: 0, left: 0, right: 0, top: 0, bottom: 0 },
        color: '#2FA4E8',
        fill: '',
        fontFamily: { value: 'mingchao' },
        fontSize: { value: 32 },
        lineHeight: { value: 1.2 },
        spacing: { value: 4 },
        align: 'left',
      },
    ],
  }),
  getters: {
    activeElData(state) {
      return state.editor.find(item => item.id === state.activeElId)
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
