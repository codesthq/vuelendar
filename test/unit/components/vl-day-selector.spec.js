import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import VLSingleDateSelector from '../../../components/vl-day-selector'

describe('vl-day-selector', () => {
  let wrapper

  function mountComponent (config = {}) {
    wrapper = shallowMount(VLSingleDateSelector, {
      propsData: {
        selectedDate: config.selectedDate
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
})
