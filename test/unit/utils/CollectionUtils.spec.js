import { expect } from 'chai'
import * as CollectionUtils from '../../../utils/CollectionUtils'

describe('CollectionUtils.createRange', () => {
  it('return array of numbers including start and end', () => {
    expect(CollectionUtils.createRange(1, 3)).to.deep.equal([1, 2, 3])
  })
  
  it('return single item when start is same as end', () => {
    expect(CollectionUtils.createRange(1, 1)).to.deep.equal([1])
  })
})

describe('CollectionUtils.transpose', () => {
  it('returns transposed array', () => {
    expect(CollectionUtils.transpose([1, 2, 3, 4, 5, 6, 7], 2)).to.deep.equal([3, 4, 5, 6, 7, 1, 2])
  })
})
