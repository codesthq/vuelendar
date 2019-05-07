import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount } from '@vue/test-utils'
import VlCalendar from '../../../components/vl-calendar'
import VlCalendarMonth from '../../../components/vl-calendar-month'
import * as DatesUtils from '../../../utils/DatesUtils'

describe('vl-calendar', () => {
  let wrapper
  
  function mountComponent (propsData = {}) {
    wrapper = shallowMount(VlCalendar, { propsData })
  }
  
  beforeEach(() => mountComponent())
  afterEach(() => sinon.restore())
  
  it('December 2019 and January 2020 are visible in 2019-12-31', () => {
    sinon.stub(DatesUtils, 'getToday').returns(new Date('2019-12-31'))
    mountComponent()
    
    expect(wrapper.findAll(VlCalendarMonth).wrappers.map(w => w.props())).to.deep.equal([{
      month: 11,
      year: 2019,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }, {
      month: 0,
      year: 2020,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }])
  })
  
  it('January and February 2019 are visible in 2019-01-31', () => {
    sinon.stub(DatesUtils, 'getToday').returns(new Date('2019-01-31'))
    mountComponent()
    
    expect(wrapper.findAll(VlCalendarMonth).wrappers.map(w => w.props())).to.deep.equal([{
      month: 0,
      year: 2019,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }, {
      month: 1,
      year: 2019,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }])
  })
  
  it('it is possible to move visible months forward', () => {
    sinon.stub(DatesUtils, 'getToday').returns(new Date('2018-12-20'))
    mountComponent()
    
    wrapper.find('.vl-calendar__arrow--forward').trigger('click')
    
    expect(wrapper.findAll(VlCalendarMonth).wrappers.map(w => w.props())).to.deep.equal([{
      month: 0,
      year: 2019,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }, {
      month: 1,
      year: 2019,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }])
  })
  
  it('it is possible to move visible months backward', () => {
    sinon.stub(DatesUtils, 'getToday').returns(new Date('2018-12-20'))
    mountComponent()
    
    wrapper.find('.vl-calendar__arrow--back').trigger('click')
    
    expect(wrapper.findAll(VlCalendarMonth).wrappers.map(w => w.props())).to.deep.equal([{
      month: 10,
      year: 2018,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }, {
      month: 11,
      year: 2018,
      isSelected: undefined,
      isDisabled: undefined,
      customClasses: undefined,
      showWeeksNumber: false
    }])
  })
  
  it('functions to calculate classes are propagated down', () => {
    sinon.stub(DatesUtils, 'getToday').returns(new Date('2019-01-31'))
    
    const isSelected = () => {}
    const isDisabled = () => {}
    const customClasses = { 'is-processing': () => true }
    mountComponent({ isSelected, isDisabled, customClasses })
    
    expect(wrapper.findAll(VlCalendarMonth).wrappers.map(w => w.props())).to.deep.equal([{
      month: 0,
      year: 2019,
      isDisabled,
      isSelected,
      customClasses,
      showWeeksNumber: false
    }, {
      month: 1,
      year: 2019,
      isDisabled,
      isSelected,
      customClasses,
      showWeeksNumber: false
    }])
  })
  
  it('propagate input event from children', () => {
    mountComponent()
    
    wrapper.findAll(VlCalendarMonth).wrappers.forEach(w => {
      w.vm.$emit('input', '2019-02-13')
    })
    
    expect(wrapper.emitted('input')).to.deep.equal([['2019-02-13'], ['2019-02-13']])
  })
  
  it('showWeeksNumber property is propagated down', () => {
    mountComponent()
    expect(wrapper.find(VlCalendarMonth).props('showWeeksNumber')).to.be.false
  
    mountComponent({ showWeeksNumber: true })
    expect(wrapper.find(VlCalendarMonth).props('showWeeksNumber')).to.be.true
  })
})
