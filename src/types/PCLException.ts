export interface PCLError {
  message: string
  code: number
}

export class PCLError extends Error {
  code: number
  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}
