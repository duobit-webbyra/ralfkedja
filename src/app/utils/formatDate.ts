export const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Stockholm',
    }).format(new Date(dateString))
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'Invalid date'
  }
}
