// test/Box.test.js
// Load dependencies
const { expect } = require('chai');
const web3 = require('web3');

// Load compiled artifacts
const MainFighter = artifacts.require('MainFighter');

// Start test block
contract('MainFighter', function () {
  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.mainFighter = await MainFighter.new();
  });

  // Test case
  it('Return array of fighters previously created some fighter', async function () {
      const account = web3.eth.accounts[0];
      await this.mainFighter.buyFighter({from: account, value: web3.utils.toWei('0.01', 'ether')});
      
      const fighters = await this.mainFighter.getFighters();
      expect(fighters.length).equal(1);
      expect(fighters[0].length).equal(4);
  });

  it('Fail if we dont send the enough fee', async function() {
    try {
      await this.mainFighter.buyFighter({value: web3.utils.toWei('0.001', 'ether')});
    } catch (e) {
      expect(e.reason).to.equal('You dont have enough fee for the transaction');
    }
  });

  it('Change fighter name', async function() {
    await this.mainFighter.buyFighter({value: web3.utils.toWei('0.01', 'ether')});

    let fighters = await this.mainFighter.getFighters();
    console.log(fighters);
    console.log("Before change name");
    await this.mainFighter.changeName(1, "Joselito", {value: web3.utils.toWei('0.01', 'ether')});
    console.log("After change name");
    fighters = await this.mainFighter.getFighters();
    console.log(fighters);
    expect(fighters[0]['name']).to.equal("Joselito");
  });
});