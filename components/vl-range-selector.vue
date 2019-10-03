<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="isSelected"
    :is-disabled="calculateDisabled"
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
  name: 'VlRangeSelector',
  components: {
    VlCalendar
  },

  props: {
    startDate: String,
    endDate: String,
    customClasses: Object,
    showWeeksNumber: Boolean,
    defaultDate: String,
    blockStartDate: Boolean,
    disabled: Boolean,
    isDisabled: Function,
    singleMonth: Boolean,
    enableSingleDate: Boolean,
    firstDayOfWeek: {
      type: String,
      validator: v =>  DAYS_SHORTCUTS.includes(v),
      default: 'mon'
    }
  },

  methods: {
    emitDate (date) {
      if (this.blockStartDate || (this.startDate && !this.endDate && date >= this.startDate)) {
        this.$emit('update:endDate', date)
      } else {
        this.$emit('update:startDate', date)

        if (this.endDate) {
          this.$emit('update:endDate', null)
        }
      }
      this.$emit('focus')
    },

    isSelected (date) {
      if (!this.startDate && !this.endDate) {
        return false
      } else if (!this.endDate) {
        return this.startDate === date
      } else {
        return date >= this.startDate && date <= this.endDate
      }
    },

    calculateDisabled (date) {
      const isDisabled = this.isDisabled || (() => false)

      if (this.disabled) {
        return true
      } else if (this.startDate && !this.endDate) {
        return isDisabled(date) || (!this.enableSingleDate && date === this.startDate)
      } else {
        return isDisabled(date)
      }
    }
  }
}
</script>
