export const toPlayDate = (date: Date) =>
  `${date.toDateString()}, ${date.toTimeString().substr(0, 5)}`

export const deserialize = <T = unknown>(object: T): T =>
  JSON.parse(JSON.stringify(object))
