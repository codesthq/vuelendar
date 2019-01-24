<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="isSelected"
    :is-disabled="isDisabled"
    ref="calendar"
  />
</template>

<script>
import VlCalendar from './vl-calendar'

export default {
  name: 'VlRangeSelector',
  components: {
    VlCalendar
  },

  props: {
    startDate: String,
    endDate: String
  },

  methods: {
    emitDate (date) {
      if (this.startDate && !this.endDate) {
        this.$emit('update:endDate', date)
      } else {
        this.$emit('update:startDate', date)

        if (this.endDate) {
          this.$emit('update:endDate', null)
        }
      }
      this.$emit('focus');
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

    isDisabled (date) {
      if (this.startDate && !this.endDate) {
        return date <= this.startDate
      } else {
        return false
      }
    }
  }
}
</script>
