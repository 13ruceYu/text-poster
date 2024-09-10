import html2canvas from 'html2canvas'

export function generateScreenshot(canvas: HTMLElement | null) {
  if (canvas) {
    html2canvas(canvas).then((canvas) => {
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
