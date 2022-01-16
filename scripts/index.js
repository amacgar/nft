module.exports = async function main (callback) {
  try {
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);

    const Fighter = artifacts.require('Fighter');
    const fighter = await Fighter.deployed();

    await fighter.generateFighter();

    const fighters = await fighter.getFighters();
    console.log(`Fighters generated ${fighters}`);
    const sorted = parseResponse(fighters);
    console.log(sorted);

    for await(const element of fighters) {
      const ownerFighter = await fighter.getFighterOwner(element['id']);
      console.log(`The owner of the nft ${element['id']} is ${ownerFighter}`);
    }

    callback(0);
  } catch (error) {
    console.error(error);
    callback(1);
  }
};

function parseResponse(array) {
  const result = [];
  array.forEach( (element) => {
    result.push({
      name: element[0],
      id: element[1],
      dmg: element[2],
      speed: element[3]
    });
  });
  return result;
}