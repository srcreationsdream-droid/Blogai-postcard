import html2canvas from 'html2canvas-pro';

export interface ExportOptions {
  format?: 'png' | 'jpg';
  filename?: string;
  quality?: number;
}

export async function exportElementAsImage(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<boolean> {
  const {
    format = 'png',
    filename = `blogai-postcard-${Date.now()}`,
    quality = 0.95
  } = options;

  try {
    // Clone or capture with high device scale for true HD quality
    const canvas = await html2canvas(element, {
      scale: 2.5, // High DPI HD rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      onclone: (clonedDoc) => {
        // Ensure fonts and elements inside cloned document render properly
        const clonedElement = clonedDoc.getElementById(element.id);
        if (clonedElement) {
          clonedElement.style.boxShadow = 'none'; // Clean edges for export
          clonedElement.style.transform = 'none';
        }
      }
    });

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, quality);

    // Create a temporary link to download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${filename}.${format === 'jpg' ? 'jpg' : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Failed to export postcard image:', error);
    return false;
  }
}
