import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

export function readData<T>(file: string, fallback: T): T {
  const filePath = path.join(DATA_DIR, file)
  if (!fs.existsSync(filePath)) return fallback
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T
  } catch {
    return fallback
  }
}

export function writeData(file: string, data: unknown): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2))
}

export function deleteDataFile(file: string): void {
  const filePath = path.join(DATA_DIR, file)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}
