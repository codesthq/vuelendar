<template>
  <vl-calendar
    @input="date => $emit('input', date)"
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
  }
}
</script>
