export default (sourceDate?: string): string => {
  if (!sourceDate) {
    return ''
  }

  const date = new Date(sourceDate)

  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
