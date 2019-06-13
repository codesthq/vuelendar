<template>
  <div class="vl-calendar-month">
    <div class="vl-calendar-month__title">
      {{ monthName }} {{ year }}
    </div>

    <div class="vl-flex">
      <div
        v-if="showWeeksNumber"
        class="vl-calendar-month__week-numbers-column"
      >
        <div
          v-for="number in weekNumbers"
          class="vl-calendar-month__week-number"
          :key="number"
        >
          {{ number }}
        </div>
      </div>

      <div>
        <div class="vl-flex">
          <span
            v-for="name in daysNames"
            :key="name"
            class="vl-calendar-month__week-day"
          >{{ name }}</span>
        </div>

        <div class="vl-flex vl-flex-wrap">
          <span
            v-for="day in days"
            :key="day"
            @click="$emit('input', getDate(day))"
            class="vl-calendar-month__day"
            :class="calculateClasses(day)"
            :data-day="day"
            :data-month="month"
            :data-year="year"
          >
            {{ day }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createRange, transpose } from '../utils/CollectionUtils'
import { countDays, formatDate, getMonthName, getWeekNumbers } from '../utils/DatesUtils'
import { DAYS_NAMES, DAYS_SHORTCUTS } from '../constants/days'

export default {
  name: 'VlCalendarMonth',
  props: {
    showWeeksNumber: Boolean,
    month: Number,
    year: Number,
    isSelected: Function,
    isDisabled: Function,
    customClasses: Object,
    firstDayOfWeek: {
      type: String,
      validator: v =>  DAYS_SHORTCUTS.includes(v),
      default: 'mon'
    }
  },

  computed: {
    monthName () {
      return getMonthName(this.month)
    },

    days () {
      return createRange(1, countDays(this.month, this.year))
    },

    daysNames () {
      return transpose(DAYS_NAMES, this.daysOffset)
    },

    daysOffset () {
      return DAYS_SHORTCUTS.indexOf(this.firstDayOfWeek)
    },

    weekNumbers () {
      return getWeekNumbers(this.month, this.year)
    }
  },

  methods: {
    getDate (day) {
      return formatDate(day, this.month, this.year)
    },

    calculateClasses (day) {
      const classes = []
      if (day === 1) {
        let offset = (new Date(this.year, this.month, 1).getDay() + 7 - this.daysOffset) % 7
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

      Object.keys(this.customClasses || {}).forEach(cl => {
        const fn = this.customClasses[cl]
        if (fn(date)) {
          classes.push(cl)
        }
      })

      return classes
    }
  }
}
</script>
