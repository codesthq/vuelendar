<template>
  <vl-calendar
    @input="date => emitDate(date)"
    :is-selected="date => date === selectedDate"
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
    selectedDate: String
  },

  methods: {
    emitDate (date) {
      this.$emit('input', date);
      this.$emit('focus');
    }
  }
}
</script>
