import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VLSingleDateSelector from '../../../components/vl-day-selector'

describe('vl-day-selector', () => {
  let wrapper

  function mountComponent (config = {}) {
    wrapper = shallowMount(VLSingleDateSelector, {
      propsData: {
        selectedDate: config.selectedDate,
        disabledDates: config.disabledDates,
        customClasses: config.customClasses,
        showWeeksNumber: config.showWeeksNumber,
        defaultDate: config.defaultDate
      }
    })
    return wrapper
  }

  it('contains calendar', () => {
    mountComponent()
    expect(wrapper.find({ ref: 'calendar' }).exists()).to.be.true
  })

  it('emits appropriate events', () => {
    mountComponent()

    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-02-05')
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-03-05')
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-01-05')
    wrapper.find({ ref: 'calendar' }).vm.$emit('input', '2018-05-05')

    expect(wrapper.emitted('input')).to.deep.equal([['2018-02-05'], ['2018-03-05'], ['2018-01-05'], ['2018-05-05']])
    expect(wrapper.emitted().focus).to.have.lengthOf(4)
  })

  it('selected date is marked', () => {
    mountComponent({ selectedDate: '2018-02-15' })

    const isSelected = wrapper.find({ ref: 'calendar' }).props().isSelected
    expect(isSelected('2018-02-15')).to.be.true
    expect(isSelected('2018-02-14')).to.be.false
    expect(isSelected('2018-02-16')).to.be.false
  })

  it('disable dates when giving an array of disabled dates', () => {
    mountComponent({ disabledDates: ['2018-02-15', '2018-02-19'] })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled


    expect(isDisabled('2018-02-15')).to.be.true
    expect(isDisabled('2018-02-19')).to.be.true
    expect(isDisabled('2019-01-29')).to.be.false
    expect(isDisabled('2020-01-26')).to.be.false
  })

  it('disable dates when giving a full object of disabled dates', () => {
    mountComponent({ disabledDates: {
      from: '2018-02-15',
      to: '2018-02-17'
    } })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2018-02-15')).to.be.true
    expect(isDisabled('2018-02-16')).to.be.true
    expect(isDisabled('2018-02-17')).to.be.true
    expect(isDisabled('2018-02-18')).to.be.false
    expect(isDisabled('2018-02-19')).to.be.false
  })


  it('disable dates when giving a partial object of disabled dates', () => {
    mountComponent({ disabledDates: {
      from: '2018-02-15',
    } })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2018-02-14')).to.be.false
    expect(isDisabled('2018-02-15')).to.be.true
    expect(isDisabled('2018-02-16')).to.be.true
    expect(isDisabled('2018-02-17')).to.be.true
    expect(isDisabled('2025-02-17')).to.be.true
    expect(isDisabled('2040-02-17')).to.be.true
  })

  it('disable dates when giving a different partial object of disabled dates', () => {
    mountComponent({ disabledDates: {
      to: '2018-02-15',
    } })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2018-02-16')).to.be.false
    expect(isDisabled('2018-02-15')).to.be.true
    expect(isDisabled('2018-02-14')).to.be.true
    expect(isDisabled('2018-02-13')).to.be.true
    expect(isDisabled('2010-02-13')).to.be.true
    expect(isDisabled('1990-02-13')).to.be.true
  })

  it('"customClasses" property is propagated down', () => {
    const customClasses = { 'is-processing': () => true }
    mountComponent({ customClasses })
    
    expect(wrapper.find({ ref: 'calendar' }).props().customClasses).to.equal(customClasses)
  })
  
  it('appropriate properties are propagated down', () => {
    mountComponent()
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.undefined
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.be.undefined
    
    mountComponent({ showWeeksNumber: true, defaultDate: '2019-01-03' })
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.true
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.equal('2019-01-03')
  })
})
