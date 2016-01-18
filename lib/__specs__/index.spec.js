import GildedRose from '../index'

describe('examples to delete', () => {  
  it('should be able to pass', () => {
    true.should.be.true
  })

  it('should be able to fail', () => {
    true.should.be.false
  })
})

describe('GildedRose', () => {
  let subject;

  beforeEach(() => {
    subject = new GildedRose()
  })

  it('should do a thing', () => {
    subject.updateQuality()
  })
})
