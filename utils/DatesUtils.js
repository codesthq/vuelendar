import { twoDigits } from './NumberUtils'

export function getToday () {
  return new Date()
}

export function countDays (month, year) {
  return new Date(year, month + 1, 0).getDate()
}

export function formatDate (day, month, year) {
  const date = new Date(year, month, day)
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`
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
    'December',
  ][month]
}
