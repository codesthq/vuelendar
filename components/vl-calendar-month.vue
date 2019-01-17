<template>
  <div class="vl-calendar-month">
    <div class="vl-calendar-month__title">
      {{ monthName }} {{ year }}
    </div>

    <div class="vl-flex">
      <span class="vl-calendar-month__week-day">
        Mon
      </span>
      <span class="vl-calendar-month__week-day">
        Tue
      </span>
      <span class="vl-calendar-month__week-day">
        Wed
      </span>
      <span class="vl-calendar-month__week-day">
        Thu
      </span>
      <span class="vl-calendar-month__week-day">
        Fri
      </span>
      <span class="vl-calendar-month__week-day">
        Sat
      </span>
      <span class="vl-calendar-month__week-day">
        Sun
      </span>
    </div>

    <div class="vl-flex">
      <span
        v-for="day in days"
        :key="day"
        @click="$emit('input', getDate(day))"
        class="vl-calendar-month__day"
        :class="calculateClasses(day)"
      >
        {{ day }}
      </span>
    </div>
  </div>
</template>

<script>
import { createRange } from '../utils/CollectionUtils'
import { countDays, formatDate, getMonthName } from '../utils/DatesUtils'

export default {
  name: 'VlCalendarMonth',
  props: {
    month: Number,
    year: Number,
    isSelected: Function,
    isDisabled: Function
  },

  computed: {
    monthName () {
      return getMonthName(this.month)
    },

    days () {
      return createRange(1, countDays(this.month, this.year))
    }
  },

  methods: {
    getDate (day) {
      return formatDate(day, this.month, this.year)
    },

    calculateClasses (day) {
      const classes = []
      if (day === 1) {
        let offset = (new Date(this.year, this.month, 1).getDay() + 6) % 7
        if (offset > 0) {
          classes.push(`vl-calendar-month__day--offset-${offset}`)
        }
      }

      const date = this.getDate(day)
      if (this.isSelected && this.isSelected(date)) {
        classes.push('selected')

        if (!this.isSelected(this.getDate(day - 1))){
          classes.push('selected--first')
        }

        if (!this.isSelected(this.getDate(day + 1))){
          classes.push('selected--last')
        }
      }

      if (this.isDisabled && this.isDisabled(date)) {
        classes.push('disabled')

        if (!this.isDisabled(this.getDate(day - 1))){
          classes.push('disabled--first')
        }

        if (!this.isDisabled(this.getDate(day + 1))){
          classes.push('disabled--last')
        }
      }

      return classes
    }
  }
}
</script>
