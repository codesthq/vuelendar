# Vuelendar
Simple and clean calendar written in Vue.js. Check out full Vuelendar's documentation [here](https://codesthq.github.io/vuelendar-lp/).

[![CircleCI](https://circleci.com/gh/codesthq/vuelendar/tree/master.svg?style=svg)](https://circleci.com/gh/codesthq/vuelendar/tree/master)

## Features
### Select single date
![vuelendar-single](https://user-images.githubusercontent.com/10059264/55957707-44f7fb00-5c67-11e9-8648-d81d36c67489.png)

### Select range of dates
![vuelendar-range](https://user-images.githubusercontent.com/10059264/55957608-0b26f480-5c67-11e9-89cc-1e94c1b5c463.png)


## Installation
    npm install vuelendar@1.0.0

## Usage
Import styles in your .vue file:

    <style src="vuelendar/scss/vuelendar.scss" lang="scss"></style>

Register components:

    import VRangeSelector from 'vuelendar/components/vl-range-selector';
    import VDaySelector from 'vuelendar/components/vl-day-selector';

    export default {
      components: {
        VRangeSelector,
        VDaySelector
      },
      data () {
        return {
          range: {},
          date: null
        }
      }
      // ...
    }

Use in template:

    <v-range-selector
      :start-date.sync="range.start"
      :end-date.sync="range.end"
    />

    <v-day-selector
      v-model="date"
    />

## Disabling dates

Vuelendar allows two ways for disabling dates.

Using an array:


    <v-day-selector
      v-model="date"
      disabled-dates="['2019-04-21', '2019-04-25']
    />
    Will disable 21st April 2019 and 25th April 2019

Using an object to describe a range of dates:

    <v-day-selector
      v-model="date"
      disabled-dates="{
        from: '2019-04-21',
        to: '2019-04-23'
      }"
    />
    Will disable all dates from 21st April 2019 and 25th April 2019

Specifying only 'from' attribute will disable all dates past that date.


    <v-day-selector
      v-model="date"
      disabled-dates="{
        from: '2019-04-21',
      }"
    />
    Will disable all dates from 21st April 2019

Specifying only 'to' attribute will disable all dates before that date.


    <v-day-selector
      v-model="date"
      disabled-dates="{
        to: '2019-04-21',
      }"
    />
    Will disable all dates before 21st April 2019
