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
        defaultDate: config.defaultDate,
        isDisabled: config.isDisabled,
        singleMonth: config.singleMonth,
        firstDayOfWeek: config.firstDayOfWeek
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

  it('disable dates when giving a full object of disabled dates', () => {
    mountComponent({ isDisabled: date => date >= '2018-02-15' && date <= '2018-02-17' })

    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2018-02-13')).to.be.false
    expect(isDisabled('2018-02-14')).to.be.false
    expect(isDisabled('2018-02-15')).to.be.true
    expect(isDisabled('2018-02-16')).to.be.true
    expect(isDisabled('2018-02-17')).to.be.true
    expect(isDisabled('2018-02-18')).to.be.false
    expect(isDisabled('2018-02-19')).to.be.false
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
    expect(wrapper.find({ ref: 'calendar' }).props().isDisabled).to.be.undefined
    expect(wrapper.find({ ref: 'calendar' }).props().singleMonth).to.be.undefined
    expect(wrapper.find({ ref: 'calendar' }).props().firstDayOfWeek).to.equal('mon')

    const isDisabled = () => true
    mountComponent({ showWeeksNumber: true, defaultDate: '2019-01-03', singleMonth: true, isDisabled, firstDayOfWeek: 'tue' })
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.true
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.equal('2019-01-03')
    expect(wrapper.find({ ref: 'calendar' }).props().isDisabled).to.equal(isDisabled)
    expect(wrapper.find({ ref: 'calendar' }).props().singleMonth).to.equal(true)
    expect(wrapper.find({ ref: 'calendar' }).props().firstDayOfWeek).to.equal('tue')
  })
})
