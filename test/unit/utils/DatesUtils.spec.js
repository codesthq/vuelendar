import { expect } from 'chai'
import * as DatesUtils from '../../../utils/DatesUtils'

describe('DatesUtils.countDays', () => {
  it('return 28 for February 2019', () => {
    expect(DatesUtils.countDays(1, 2019)).to.equal(28)
  })

  it('return 29 for February 2020', () => {
    expect(DatesUtils.countDays(1, 2020)).to.equal(29)
  })

  it('return 30 for June 2019', () => {
    expect(DatesUtils.countDays(5, 2019)).to.equal(30)
  })
})

describe('DatesUtils.parseDate', () => {
  it('return Date object from string', () => {
    const date = DatesUtils.parseDate('2019-01-03')
    
    expect(date instanceof Date).to.be.true
    expect(date.getFullYear()).to.equal(2019)
    expect(date.getMonth()).to.equal(0)
    expect(date.getDate()).to.equal(3)
  })
})

describe('DatesUtils.formatDate', () => {
  it('return appropriate formatted date', () => {
    expect(DatesUtils.formatDate(2, 0, 2018)).to.equal('2018-01-02')
  })

  it('return last day of previous month formatted date when day is 0', () => {
    expect(DatesUtils.formatDate(0, 1, 2018)).to.equal('2018-01-31')
  })

  it('return first day of next month formatted date when day is one bigger than number of days in \
  month', () => {
    expect(DatesUtils.formatDate(32, 0, 2018)).to.equal('2018-02-01')
  })
})

describe('DatesUtils.getMonthName', () => {
  it('return appropriate month name', () => {
    expect(DatesUtils.getMonthName(0)).to.equal('January')
    expect(DatesUtils.getMonthName(1)).to.equal('February')
    expect(DatesUtils.getMonthName(2)).to.equal('March')
    expect(DatesUtils.getMonthName(3)).to.equal('April')
    expect(DatesUtils.getMonthName(4)).to.equal('May')
    expect(DatesUtils.getMonthName(5)).to.equal('June')
    expect(DatesUtils.getMonthName(6)).to.equal('July')
    expect(DatesUtils.getMonthName(7)).to.equal('August')
    expect(DatesUtils.getMonthName(8)).to.equal('September')
    expect(DatesUtils.getMonthName(9)).to.equal('October')
    expect(DatesUtils.getMonthName(10)).to.equal('November')
    expect(DatesUtils.getMonthName(11)).to.equal('December')
  })
})

describe('DatesUtils.getWeekNumbers', () => {
  it('return appropriate weeks number', () => {
    expect(DatesUtils.getWeekNumbers(4, 2019)).to.deep.equal([18, 19, 20, 21, 22])
    expect(DatesUtils.getWeekNumbers(11, 2019)).to.deep.equal([48, 49, 50, 51, 52, 53])
    expect(DatesUtils.getWeekNumbers(0, 2020)).to.deep.equal([1, 2, 3, 4, 5])
  })
})

describe('DatesUtils.getWeekNumber', () => {
  it('return week number', () => {
    expect(DatesUtils.getWeekNumber(new Date(2019, 0, 1))).to.equal(1)
    expect(DatesUtils.getWeekNumber(new Date(2019, 0, 16))).to.equal(3)
    expect(DatesUtils.getWeekNumber(new Date(2019, 4, 6))).to.equal(19)
    expect(DatesUtils.getWeekNumber(new Date(2019, 11, 31))).to.equal(1)
  })
})
