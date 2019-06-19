import 'axios'

declare module 'axios' {
  interface AxiosStatic {
    initialized: boolean
  }
}
