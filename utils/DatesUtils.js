import { twoDigits } from './NumberUtils'

export function getToday () {
  return new Date()
}

export function countDays (month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function parseDate (string) {
  return new Date(string)
}

export function formatDate (day, month, year) {
  const date = new Date(year, month, day)
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`
}

export function getWeekNumbers (month, year) {
  let weekNumbers = []
  for (let i = 1; i <= countDays(month, year); i++) {
    let weekNumber = getWeekNumber(new Date(year, month, i))
    if (month === 11 && weekNumber === 1) {
      weekNumber = weekNumbers[weekNumbers.length - 1] + 1
      weekNumbers.push(weekNumber)
      break
    }
    weekNumbers.push(weekNumber)
  }
  return Array.from(new Set(weekNumbers))
}

export function getWeekNumber (date) {
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))

  // Calculate full weeks to nearest Thursday
  let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const oneDayInMs = 86400000
  return Math.ceil(((date - yearStart) / oneDayInMs + 1) / 7)
}

export function getMonthName (month) {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][month]
}
