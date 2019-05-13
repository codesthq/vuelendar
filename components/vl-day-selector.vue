<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="date => date === selectedDate"
    :is-disabled="disabledDates ? calculateDisabled : isDisabled"
    :custom-classes="customClasses"
    :show-weeks-number="showWeeksNumber"
    :default-date="defaultDate"
    :single-month="singleMonth"
    ref="calendar"
  />
</template>

<script>
import VlCalendar from './vl-calendar'

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
    disabledDates: [Object, Array],
    isDisabled: Function,
    customClasses: Object,
    showWeeksNumber: Boolean,
    defaultDate: String,
    singleMonth: Boolean
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
