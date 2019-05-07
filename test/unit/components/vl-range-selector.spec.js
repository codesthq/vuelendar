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
  
  it('when only start date is selected, it is not possible to select previous date', () => {
    mountComponent({ startDate: '2019-01-28' })
  
    const isDisabled = wrapper.find({ ref: 'calendar' }).props().isDisabled
    expect(isDisabled('2019-01-15')).to.be.true
    expect(isDisabled('2019-01-27')).to.be.true
    expect(isDisabled('2019-01-28')).to.be.true
    expect(isDisabled('2019-01-29')).to.be.false
    expect(isDisabled('2020-01-26')).to.be.false
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
    
    mountComponent({ showWeeksNumber: true, defaultDate: '2019-01-03' })
    expect(wrapper.find({ ref: 'calendar' }).props().showWeeksNumber).to.be.true
    expect(wrapper.find({ ref: 'calendar' }).props().defaultDate).to.equal('2019-01-03')
  })
})
