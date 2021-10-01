export interface ResponseI<T = unknown> {
  statusCode: number
  data: T | string
}
