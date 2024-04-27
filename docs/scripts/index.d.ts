export type File = {
  originName: string
  name: string
  extension: 'md' | string
}

export type Folder = {
  originName: string
  name: string
  children: File[]
}
