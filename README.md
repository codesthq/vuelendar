# Vuelendar
Simple and clean calendar written in Vue.js

## Features
### Select single date
![vuelendar-single](https://user-images.githubusercontent.com/10059264/55957707-44f7fb00-5c67-11e9-8648-d81d36c67489.png)

### Select range of dates
![vuelendar-range](https://user-images.githubusercontent.com/10059264/55957608-0b26f480-5c67-11e9-89cc-1e94c1b5c463.png)


## Installation
    npm install --save git+https://github.com/codesthq/vuelendar.git

## Usage
Import styles in your .vue file:

    <style src="vuelendar/scss/vuelendar.scss"></style>
    
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
