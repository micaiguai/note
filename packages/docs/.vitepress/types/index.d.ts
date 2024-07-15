export interface File {
  text: string
  link: string
  meta: {
    sort: number
    extension: string
  }
}

export interface Folder {
  text: string
  items: File[]
  meta: {
    sort: number
    plainName: string
    folderName: string
  }
}
