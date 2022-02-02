// migrations/2_deploy.js
const Fighter = artifacts.require('Fighter');
const MainFighter = artifacts.require('MainFighter');
const MLDToken = artifacts.require('MLDToken');

module.exports = async function (deployer) {
  await deployer.deploy(Fighter);
  await deployer.deploy(MainFighter);
  await deployer.deploy(MLDToken);
};