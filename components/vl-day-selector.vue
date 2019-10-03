<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="date => date === selectedDate"
    :is-disabled="isDisabled"
    :custom-classes="customClasses"
    :show-weeks-number="showWeeksNumber"
    :default-date="defaultDate"
    :single-month="singleMonth"
    :first-day-of-week="firstDayOfWeek"
    ref="calendar"
  />
</template>

<script>
import VlCalendar from './vl-calendar'
import { DAYS_SHORTCUTS } from '../constants/days'

export default {
  name: 'VlDaySelector',
  model: {
    prop: 'selectedDate'
  },
  components: {
    VlCalendar
  },
  props: {
    selectedDate: String,
    isDisabled: Function,
    customClasses: Object,
    showWeeksNumber: Boolean,
    defaultDate: String,
    singleMonth: Boolean,
    firstDayOfWeek: {
      type: String,
      validator: v =>  DAYS_SHORTCUTS.includes(v),
      default: 'mon'
    }
  },

  methods: {
    calculateDisabled (date) {
      if (Array.isArray(this.disabledDates)) {
        return this.disabledDates.includes(date)
      } else {
        const from = this.disabledDates.from
        const to = this.disabledDates.to

        const isAfterFrom = from && from <= date
        const isBeforeTo = to && date <= to

        if (from && to) {
          return isAfterFrom && isBeforeTo
        }

        if (from) {
          return isAfterFrom
        }

        if (to) {
          return isBeforeTo
        }
      }
    },
    emitDate (date) {
      this.$emit('input', date)
      this.$emit('focus')
    }
  }
}
</script>
