const expect = require("chai").expect;

const GildedRose = require("../gilded-rose");
const Item = require("../item");

describe("GildedRose", () => {
  it("should return correct result", () => {
    //    Golden --- Master
    // The original items passed to the method
    const storeItems = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    ];
    // The result the code returned
    const expectedResult = [
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21),
    ];
    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  it("for normal items quality should never be below 0", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 10, 0)];
    const expectedResult = [new Item("+5 Dexterity Vest", 9, 0)];
    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  it("when the sellIn date passes, quality should degrade twice as fast", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 0, 4)];
    const expectedResult = [new Item("+5 Dexterity Vest", -1, 2)];
    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });
  it("the quality of an item can never be more than 50", () => {
    const storeItems = [new Item("Aged Brie", 1, 50)];
    const expectedResult = [new Item("Aged Brie", 0, 50)];
    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });
  it("the quality of an aged brie should increase by 1", () => {
    const storeItems = [new Item("Aged Brie", 1, 0)];
    const expectedResult = [new Item("Aged Brie", 0, 1)];
    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  // it("the quality of conjured items should decrease twice as fast", () => {
  //   const storeItems = [new Item("Conjured Mana Cake", 10, 20)];
  //   const expectedResult = [new Item("Conjured Mana Cake", 9, 18)];
  //   const gildedRose = new GildedRose();
  //   gildedRose.items = storeItems;
  //   gildedRose.updateQuality();

  //   expect(gildedRose.items).to.eql(expectedResult);
  // });

  it("quality of the item is never negative", () => {
    const storeItems = [new Item("Conjured Mana Cake", 0, 0)];
    const expectedResult = [new Item("Conjured Mana Cake", -1, 0)];

    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  it("Sulfuras, being a legendary item, never has to be sold or decreases in quality", () => {
    const storeItems = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const expectedResult = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];

    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  it("aged brie quailty increases as it gets older", () => {
    const storeItems = [new Item("Aged Brie", 1, 0)];
    const expectedResult = [new Item("Aged Brie", 0, 1)];

    const gildedRose = new GildedRose();
    gildedRose.items = storeItems;
    gildedRose.updateQuality();

    expect(gildedRose.items).to.eql(expectedResult);
  });

  describe("Backstage passes", () => {
    it("increases in Quality as it's SellIn value approaches", () => {
      const storeItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 14, 0),
      ];
      const expectedResult = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 13, 1),
      ];
      const gildedRose = new GildedRose();
      gildedRose.items = storeItems;
      gildedRose.updateQuality();

      expect(gildedRose.items).to.eql(expectedResult);
    });

    it("Quality increases by 2 when there are 10 days or less", () => {
      const storeItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0),
      ];
      const expectedResult = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2),
      ];
      const gildedRose = new GildedRose();
      gildedRose.items = storeItems;
      gildedRose.updateQuality();

      expect(gildedRose.items).to.eql(expectedResult);
    });

    it("Quality increases by 3 when there are 5 days or less", () => {
      const storeItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
      ];
      const expectedResult = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 3),
      ];
      const gildedRose = new GildedRose();
      gildedRose.items = storeItems;
      gildedRose.updateQuality();

      expect(gildedRose.items).to.eql(expectedResult);
    });

    it("Quality drops to 0 after concert", () => {
      const storeItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30),
      ];
      const expectedResult = [
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
      ];
      const gildedRose = new GildedRose();
      gildedRose.items = storeItems;
      gildedRose.updateQuality();

      expect(gildedRose.items).to.eql(expectedResult);
    });
  });
});
