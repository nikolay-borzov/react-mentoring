declare const API_URL: string
declare const IS_DEVELOPMENT: boolean
declare const IS_SERVER: boolean

declare namespace NodeJS {
  interface Global {
    API_URL: string
    IS_DEVELOPMENT: boolean
    IS_SERVER: boolean
  }
}

declare interface Window {
  _virtualConsole: any
  PRELOADED_STATE: any
}

interface NodeModule {
  hot: {
    accept(path: string, callback: () => void): void
  }
}
