import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { build } from 'vitepress'
import { it, expect } from 'vitest'

const tempPath = path.resolve(__dirname, '.temp')

it('should build', async () => {
  await mkdir(tempPath, { recursive: true })
  await writeFile(path.resolve(tempPath, 'index.md'), '# test 1')
  await build(tempPath, {
    outDir: path.resolve(tempPath, 'dist'),
  })
  expect(
    await readFile(path.resolve(tempPath, 'dist/index.html'), 'utf-8'),
  ).include('test 1')
  await writeFile(path.resolve(tempPath, 'index.md'), '# test 2')
  await build(tempPath, {
    outDir: path.resolve(tempPath, 'dist'),
  })
  expect(
    await readFile(path.resolve(tempPath, 'dist/index.html'), 'utf-8'),
  ).include('test 2')
})
