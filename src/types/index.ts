export interface CanvasProps {
  width: string;
  height: string;
  padding: string;
  color: string;
  backgroundColor: string;
}

interface ContentBlockStyle {
  color?: string;
  fontFamily?: string;
  fontSize: string;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: string;
}

export interface ContentBlock {
  name: string;
  content: string;
  style: ContentBlockStyle;
}