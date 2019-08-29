const expect = require('chai').expect

const GildedRose = require('../gilded-rose')

describe('examples to delete', () => {
  it('should be able to pass', () => {
    expect(true).to.be.true
  })

  it('should be able to fail', () => {
    expect(true).to.be.false
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
