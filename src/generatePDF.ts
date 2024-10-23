import satori from 'satori'
import * as fs from 'fs'
import PDFKit from 'pdfkit'
import SVGtoPDF from 'svg-to-pdfkit'
import { fileURLToPath } from 'url'
import path from 'path'

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)
const fontPath = path.join(_dirname, './fonts/NotoSansJP-Regular.ttf')

const options = {
  width: 100, height: 100,
  fonts: [
    {
      name: 'NoteSansJP',
      data: fs.readFileSync(fontPath)
    }
  ]
}

async function generatePDF() {
  const outputPath = path.join(_dirname, '../output.pdf')
  const output = fs.createWriteStream(outputPath)

  const svg = await satori("hello world", options)

  const doc = new PDFKit(
    {
      layout: 'landscape',
      size: [100, 100],
    }
  )

  SVGtoPDF(doc, svg)

  doc.pipe(output);
  doc.end();
}

generatePDF()
