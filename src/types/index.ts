export const fontFamilyOptions = ['mingchao', 'helvetica', 'arial', 'simhei', 'simsong'] as const

export type FontFamily = typeof fontFamilyOptions[number]

export interface ICanvasProps {
  width: string
  height: string
  padding: string
  color: string
  backgroundColor: string
  fontFamily: FontFamily
  backgroundImage?: string
}

interface IContentBlockStyle {
  color?: string
  fontFamily?: string
  fontSize: string
  textAlign?: 'left' | 'center' | 'right'
  marginTop?: string
}

export interface IContentBlock {
  name: string
  content: string
  style: IContentBlockStyle
}
