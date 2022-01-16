// test/Box.test.js
// Load dependencies
const { expect } = require('chai');

// Load compiled artifacts
const Fighter = artifacts.require('Fighter');

// Start test block
contract('Fighter', function () {
  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.fighter = await Fighter.new();
  });

  // Test case
  it('Return array of fighters previously created some fighter', async function () {
    // Generate a new fighter
    await this.fighter.generateFighter();

    // Test if whe have an array with one fighter created and it have four attributes
    const fighters = await this.fighter.getFighters();
    expect(fighters.length).equal(1);
    expect(fighters[0].length).equal(4);
  });

  it('Return the owner of the fighter through an id', async function () {
    // Generate a new fighter
    await this.fighter.generateFighter();

    // Send one id to get the owner of the fighter
    const owner = await this.fighter.getFighterOwner(0);
    expect(typeof(owner)).equal('string');
  });
});