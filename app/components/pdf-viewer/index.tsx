import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { getFilePlugin } from '@react-pdf-viewer/get-file'
import { RenderDownloadProps } from '@react-pdf-viewer/get-file'
import { IconDownload } from '@tabler/icons-react'

export function PDFViewer({ id }: { id: string }) {
  const getFilePluginInstance = getFilePlugin()
  const { Download } = getFilePluginInstance

  return (
    <div className="relative max-h-full overflow-y-auto">
      <div className="flex justify-end dark:bg-dark-background bg-light-background">
        <Download>
          {(props: RenderDownloadProps) => (
            <button
              className="flex items-center gap-2 px-4 py-2 font-medium"
              onClick={props.onClick}
            >
              <IconDownload stroke={2} />
              <span>Download</span>
            </button>
          )}
        </Download>
      </div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          plugins={[getFilePluginInstance]}
          fileUrl={`/assets/pdf/${id}.pdf`}
        />
      </Worker>
    </div>
  )
}
