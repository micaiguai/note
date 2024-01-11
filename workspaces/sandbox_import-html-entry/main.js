import { importEntry } from 'import-html-entry'

const {
  template,
  assetPublicPath,
  getExternalScripts,
  getExternalStyleSheets,
  execScripts
} = await importEntry('http://127.0.0.1:7100/')

console.log('template :', template)
console.log('assetPublicPath :', assetPublicPath)
console.log('await getExternalScripts() :', await getExternalScripts())
console.log('await getExternalStyleSheets() :', await getExternalStyleSheets())
console.log('await execScripts() :', await execScripts())
