import GildedRose from './gilded-rose'
import Item from './item'

const gildedRose = new GildedRose()
gildedRose.items.push(new Item('+5 Dexterity Vest', 10, 20))
gildedRose.items.push(new Item('Aged Brie', 2, 0))
gildedRose.items.push(new Item('Elixir of the Mongoose', 5, 7))
gildedRose.items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80))
gildedRose.items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20))
gildedRose.items.push(new Item('Conjured Mana Cake', 3, 6))

for (let i=0; i<gildedRose.items.length; i++) {
  console.log(`pass ${i+1}:`)
  gildedRose.updateQuality()
  gildedRose.items.forEach(x => {
    console.log(`'${x.name}' - sell in: ${x.sellIn} quality: ${x.quality}`)
  })
  console.log('\n')
}
