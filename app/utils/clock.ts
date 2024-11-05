export class Clock {
  getCurrentTime() {
    const dateInstance = new Date()
    const time = dateInstance.toLocaleTimeString('en-US', {
      minute: '2-digit',
      hour: '2-digit',
    })
    return time
  }

  getCurrentDate() {
    const dateInstance = new Date()
    const date = dateInstance.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    })
    return date
  }
}
