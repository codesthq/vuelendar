<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="date => date === selectedDate"
    :is-disabled="disabledDates ? isDisabled : null"
    :custom-classes="customClasses"
    :show-weeks-number="showWeeksNumber"
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
    customClasses: Object,
    showWeeksNumber: Boolean
  },

  methods: {
    isDisabled(date) {
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
