import { expect } from 'chai'
import * as NumberUtils from '../../../utils/NumberUtils'

describe('NumberUtils.twoDigits', () => {
  it('return "10" for 10', () => {
    expect(NumberUtils.twoDigits(10)).to.equal('10')
  })
  
  it('return "09" for 9', () => {
    expect(NumberUtils.twoDigits(9)).to.equal('09')
  })
})
