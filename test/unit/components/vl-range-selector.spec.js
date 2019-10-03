import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VLRangeSelector from '../../../components/vl-range-selector'

describe('vl-range-selector', () => {
  let wrapper

  function mountComponent (propsData = {}) {
    wrapper = shallowMount(VLRangeSelector, { propsData })
  }

  it('contains calendar', () => {
    mountComponent()
    expect(wrapper.find({ ref: 'calendar' }).props()).to.deep.include({})
  })
  
  it('emits appropriate events', () => {
    mountComponent()
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-02-05')
    expect(wrapper.emitted().focus).to.have.lengthOf(1)
    expect(wrapper.emitted('update:startDate')).to.deep.equal([['2018-02-05']])
    expect(wrapper.emitted('update:endDate')).to.deep.equal(undefined)
  
    mountComponent({ startDate: '2018-02-01', endDate: '2018-02-06' })
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-02-05')
    expect(wrapper.emitted().focus).to.have.lengthOf(1)
    expect(wrapper.emitted('update:startDate')).to.deep.equal([['2018-02-05']])
    expect(wrapper.emitted('update:endDate')).to.deep.equal([[null]])
  
    mountComponent({ startDate: '2018-02-01' })
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-02-05')
    expect(wrapper.emitted().focus).to.have.lengthOf(1)
    expect(wrapper.emitted('update:startDate')).to.deep.equal(undefined)
    expect(wrapper.emitted('update:endDate')).to.deep.equal([['2018-02-05']])
  })
  
  it('it is possible to block start date', () => {
    mountComponent({ startDate: '2019-01-28', endDate: '2019-02-04', blockStartDate: true })
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2019-02-08')
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2019-02-09')
    
    expect(wrapper.emitted('update:startDate')).to.deep.equal(undefined)
    expect(wrapper.emitted('update:endDate')).to.deep.equal([['2019-02-08'], ['2019-02-09']])
  })

  it('it is possible to block whole calendar', () => {
    mountComponent({ disabled: true })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2019-01-15')).to.be.true
    expect(isDisabled('2019-01-27')).to.be.true
    expect(isDisabled('2019-01-28')).to.be.true
  })
  
  it('it is possible to limit available dates on calendar', () => {
    mountComponent({ isDisabled: date => date >= '2019-01-15' })
    let isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2019-01-14')).to.be.false
    expect(isDisabled('2019-01-15')).to.be.true
    expect(isDisabled('2019-01-16')).to.be.true
  
    mountComponent({ isDisabled: date => date <= '2019-01-15' })
    isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2019-01-14')).to.be.true
    expect(isDisabled('2019-01-15')).to.be.true
    expect(isDisabled('2019-01-16')).to.be.false
  })
  
  it('when "enableSingleDate" flag is passed, endDate can be same as startDate', () => {
    mountComponent({ startDate: '2019-02-08' })
    expect(wrapper.find({ ref: 'calendar' }).props().isDisabled('2019-02-08')).to.be.true
  
    mountComponent({ startDate: '2019-02-08', enableSingleDate: true })
    expect(wrapper.find({ ref: 'calendar' }).props().isDisabled('2019-02-08')).to.be.false
  })
  
  it('when only start date is selected, it is marked', () => {
    mountComponent({ startDate: '2018-02-15' })
  
    const isSelected = wrapper.find({ ref: 'calendar' }).props().isSelected
    
    expect(isSelected('2018-02-15')).to.be.true
    expect(isSelected('2018-02-14')).to.be.false
    expect(isSelected('2018-02-16')).to.be.false
  })
  
  it('dates in range are marked', () => {
    mountComponent({ startDate: '2019-01-28', endDate: '2019-02-04' })
  
    const isSelected = wrapper.find({ ref: 'calendar' }).props().isSelected
  
    expect(isSelected('2019-01-15')).to.be.false
    expect(isSelected('2019-01-28')).to.be.true
    expect(isSelected('2019-01-29')).to.be.true
    expect(isSelected('2019-02-03')).to.be.true
    expect(isSelected('2019-02-04')).to.be.true
    expect(isSelected('2019-02-05')).to.be.false
    expect(isSelected('2018-01-30')).to.be.false
  })
  
  it('when only start date is selected, click on previous date cause change on start date', () => {
    mountComponent({ startDate: '2019-01-28' })
  
    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2019-01-15')).to.be.false
    expect(isDisabled('2019-01-27')).to.be.false
    expect(isDisabled('2019-01-28')).to.be.true
    expect(isDisabled('2019-01-29')).to.be.false
    expect(isDisabled('2020-01-26')).to.be.false
  
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2019-01-15')

    expect(wrapper.emitted()).to.deep.equal({ 'update:startDate': [['2019-01-15']], 'focus': [[]] })
  })

  it('"customClasses" property is propagated down', () => {
    const customClasses = { 'is-processing': () => true }
    mountComponent({ customClasses })
    
    expect(wrapper.find({ ref: 'calendar' }).props().customClasses).to.equal(customClasses)
  })
  
  it('appropriate properties are propagated down', () => {
    mountComponent()
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.false
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.be.undefined
    expect(wrapper.find({ ref: 'calendar' }).props().singleMonth).to.be.false
    expect(wrapper.find({ ref: 'calendar' }).props().firstDayOfWeek).to.equal('mon')
    
    mountComponent({ showWeeksNumber: true, defaultDate: '2019-01-03', singleMonth: true, firstDayOfWeek: 'tue' })
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.true
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.equal('2019-01-03')
    expect(wrapper.find({ ref: 'calendar' }).props().singleMonth).to.be.true
    expect(wrapper.find({ ref: 'calendar' }).props().firstDayOfWeek).to.equal('tue')
  })
})
