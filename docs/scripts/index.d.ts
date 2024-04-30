export interface File {
  originName: string
  name: string
  extension: 'md' | string
}

export interface Folder {
  originName: string
  name: string
  children: File[]
}
