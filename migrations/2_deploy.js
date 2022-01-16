// migrations/2_deploy.js
const Fighter = artifacts.require('Fighter');
const MainFighter = artifacts.require('MainFighter');

module.exports = async function (deployer) {
  await deployer.deploy(Fighter);
  await deployer.deploy(MainFighter);
};