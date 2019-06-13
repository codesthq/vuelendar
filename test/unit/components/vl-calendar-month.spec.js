import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import VlCalendarMonth from '../../../components/vl-calendar-month'
import { createRange } from '../../../utils/CollectionUtils'
import * as DatesUtils from '../../../utils/DatesUtils'

describe('vl-calendar-month', () => {
  let wrapper

  function mountComponent (propsData = {}) {
    sinon.restore()
    sinon.stub(DatesUtils, 'getWeekNumbers').returns([5, 6, 7, 8, 9])
    wrapper = shallowMount(VlCalendarMonth, { propsData })
    return wrapper
  }

  // beforeEach(() => mountComponent({ month: new Date().getMonth(), year: new Date().getFullYear() }));
  afterEach(() => sinon.restore())
  
  it('title contains month name and year', () => {
    expect(mountComponent({ month: 0, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('January 2019')
    expect(mountComponent({ month: 1, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('February 2019')
    expect(mountComponent({ month: 2, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('March 2019')
    expect(mountComponent({ month: 3, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('April 2019')
    expect(mountComponent({ month: 4, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('May 2019')
    expect(mountComponent({ month: 5, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('June 2019')
    expect(mountComponent({ month: 6, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('July 2019')
    expect(mountComponent({ month: 7, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('August 2019')
    expect(mountComponent({ month: 8, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('September 2019')
    expect(mountComponent({ month: 9, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('October 2019')
    expect(mountComponent({ month: 10, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('November 2019')
    expect(mountComponent({ month: 11, year: 2019 }).find('.vl-calendar-month__title').text()).to.equal('December 2019')
  })
  
  it('week day names are displayed', () => {
    expect(wrapper.findAll('.vl-calendar-month__week-day').wrappers.map(w => w.text()))
      .to.deep.equal(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  })
  
  it('every day in month is displayed', () => {
    expect(mountComponent({ month: 1, year: 2019 }).findAll('.vl-calendar-month__day').wrappers.map(w => +w.text()))
      .to.deep.equal(createRange(1, 28))
  
    expect(mountComponent({ month: 1, year: 2020 }).findAll('.vl-calendar-month__day').wrappers.map(w => +w.text()))
      .to.deep.equal(createRange(1, 29))
  
    expect(mountComponent({ month: 3, year: 2019 }).findAll('.vl-calendar-month__day').wrappers.map(w => +w.text()))
      .to.deep.equal(createRange(1, 30))
  
    expect(mountComponent({ month: 6, year: 2019 }).findAll('.vl-calendar-month__day').wrappers.map(w => +w.text()))
      .to.deep.equal(createRange(1, 31))
  })
  
  it('first day of month is displayed below corresponding week day', () => {
    mountComponent({ month: 8, year: 2019 }) // First day is Sunday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-6')
    
    mountComponent({ month: 8, year: 2019, firstDayOfWeek: 'sun' }) // First day is Sunday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.deep.equal(['vl-calendar-month__day'])
  
    mountComponent({ month: 8, year: 2019, firstDayOfWeek: 'sat' }) // First day is Sunday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-1')
    
    mountComponent({ month: 1, year: 2019 }) // First day is Friday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-4')
  
    mountComponent({ month: 1, year: 2019, firstDayOfWeek: 'sun' }) // First day is Friday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-5')
    
    mountComponent({ month: 0, year: 2019 }) // First day is Tuesday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-1')
  
    mountComponent({ month: 0, year: 2019, firstDayOfWeek: 'sun'  }) // First day is Tuesday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-2')
  
    mountComponent({ month: 3, year: 2019 }) // First day is Monday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.deep.equal(['vl-calendar-month__day'])
  
    mountComponent({ month: 3, year: 2019, firstDayOfWeek: 'sun' }) // First day is Monday
    expect(wrapper.find('.vl-calendar-month__day').classes()).to.include('vl-calendar-month__day--offset-1')
  })
  
  it('date string is emitted after click on day', () => {
    mountComponent({ month: 1, year: 2019 })
    wrapper.findAll('.vl-calendar-month__day').at(7).trigger('click')
    
    expect(wrapper.emitted('input')).to.deep.equal([['2019-02-08']])
  })
  
  it('day may be selected base on passed isSelected callback', () => {
    mountComponent({
      month: 1,
      year: 2019,
      isSelected: date => date < '2019-02-20' && date > '2019-01-31'
    })
  
    const days = wrapper.findAll('.vl-calendar-month__day').wrappers
    days.slice(0, 19).forEach(w => {
      expect(w.classes()).to.include('selected')
    })
    
    expect(days[0].classes()).to.include('selected--first')
    expect(days[18].classes()).to.include('selected--last')
  
    wrapper.findAll('.vl-calendar-month__day').wrappers.slice(20).forEach(w => {
      expect(w.classes()).to.not.include('selected')
    })
  })
  
  it('day may be disabled base on passed isDisabled callback', () => {
    mountComponent({
      month: 1,
      year: 2019,
      isDisabled: date => date < '2019-02-21' && date > '2019-01-31'
    })
  
    const days = wrapper.findAll('.vl-calendar-month__day').wrappers
  
    days.slice(0, 20).forEach(w => {
      expect(w.classes()).to.include('disabled')
    })
  
    expect(days[0].classes()).to.include('disabled--first')
    expect(days[19].classes()).to.include('disabled--last')
  
    days.slice(21).forEach(w => {
      expect(w.classes()).to.not.include('disabled')
    })
  })
  
  it('weeks numbers are displayed on demand', () => {
    mountComponent({ showWeeksNumber: true })
    
    expect(wrapper.findAll('.vl-calendar-month__week-numbers-column .vl-calendar-month__week-number').wrappers.map(w => w.text()))
      .to.deep.equal(['5', '6', '7', '8', '9'])
  })
  
  it('it is possible to setup custom class', () => {
    mountComponent({
      month: 1,
      year: 2019,
      customClasses: { 'is-processing': date => date < '2019-02-21' && date > '2019-01-31' }
    })
  
    const days = wrapper.findAll('.vl-calendar-month__day').wrappers
    
    days.slice(0, 20).forEach(w => {
      expect(w.classes()).to.include('is-processing')
    })
  
    days.slice(21).forEach(w => {
      expect(w.classes()).to.not.include('is-processing')
    })
  })
})
