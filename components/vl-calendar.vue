<template>
  <div class="vl-calendar">
    <span
      class="vl-calendar__arrow vl-calendar__arrow--back"
      @click="moveBack()"
    ></span>

    <span
      class="vl-calendar__arrow vl-calendar__arrow--forward"
      @click="moveForward()"
    ></span>

    <vl-calendar-month
      class="vl-calendar__month"
      :month="currentMonthMonth"
      :year="currentMonthYear"
      :is-selected="isSelected"
      :is-disabled="isDisabled"
      @input="date => $emit('input', date)"
    />

    <vl-calendar-month
      class="vl-calendar__month"
      :month="nextMonthMonth"
      :year="nextMonthYear"
      :is-selected="isSelected"
      :is-disabled="isDisabled"
      @input="date => $emit('input', date)"
    />
  </div>
</template>

<script>
import VlCalendarMonth from './vl-calendar-month'
import * as DatesUtils from '../utils/DatesUtils'

export default {
  name: 'VlCalendar',
  components: {
    VlCalendarMonth
  },

  props: {
    isSelected: Function,
    isDisabled: Function
  },

  data () {
    const today = DatesUtils.getToday();
    return {
      currentMonthMonth: today.getMonth(),
      currentMonthYear: today.getFullYear()
    }
  },

  computed: {
    nextMonthMonth () {
      return this.currentMonthMonth === 11 ? 0 : this.currentMonthMonth + 1;
    },

    nextMonthYear () {
      return this.currentMonthMonth === 11 ? this.currentMonthYear + 1 : this.currentMonthYear;
    }
  },

  methods: {
    moveBack () {
      if (this.currentMonthMonth === 0) {
        this.currentMonthMonth = 11;
        this.currentMonthYear--;
      } else {
        this.currentMonthMonth--;
      }
    },

    moveForward () {
      if (this.currentMonthMonth === 11) {
        this.currentMonthMonth = 0;
        this.currentMonthYear++;
      } else {
        this.currentMonthMonth++;
      }
    }
  }
}
</script>
