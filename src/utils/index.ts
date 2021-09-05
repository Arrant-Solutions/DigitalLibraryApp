export const toPlayDate = (date: Date) =>
  `${date.toDateString()}, ${date.toTimeString().substr(0, 5)}`
