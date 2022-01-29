import { Injectable } from '@angular/core';
import { AlertService } from '../components/alert';
import { ErrorsService } from './errors.service';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  options = {
    autoClose: true,
  }

  private Web3 = require('web3');

  private fighterContract: any;
  private MLDTokenContract: any;

  private tokenAbiNft = require('../../assets/abi/MainFighter.json');
  private tokenAbiMDL = require('../../assets/abi/MLDToken.json');
  private contractAddressNft = '0x7Fc8F77d078dCA5F3413Af051BA5B758fdF9A7dA';
  private contractAddressToken = '0xA478F77A4690bF31dAc73E7325eDB032197523B0';
  private symbolNft = 'FT';
  private decimalsNft = 0;
  private symbolToken = 'MLD';
  private decimalsToken = 18;
  private web3: any;
  private userAccount: any = [];

  constructor(protected alertService: AlertService, protected errors: ErrorsService) {
    if (typeof window.web3 !== undefined) {
      this.web3 = new this.Web3(window.web3.currentProvider);
    }
    this.connectContract();
  }

  /**
   * @function checkIfConnected
   * 
   * @description Check if you are already connected to metamask
   * 
   * @return {boolean} True if the user is connected successfully, false otherwise
   */
  async checkIfConnected(): Promise<boolean> {
    const { ethereum } = window;
    const installed = await this.checkMetamask(ethereum);
    if (installed) {
      await ethereum.request({ method: "eth_accounts" });
      if (this.userAccount.length !== 0) {
        this.alertService.success(`You are logged now with ${this.userAccount[0]}!!`, this.options);
        return true;
      } else {
        const result = await this.requestAccess(ethereum);
        // We obtain which network is currently using
        const version = await this.web3.eth.net.getId();
        if (version !== 4) {
          this.alertService.info('Please select Rinkeby network!!', this.options);
        }
        return result;
      }
    } else {
      return false;
    }
  }

  /**
   * @function checkMetamask
   * 
   * @description Check if Metamask is installed in the browser
   * 
   * @param ethereum
   * 
   * @return {boolean} True if Metamask is installed, false otherwise
   */
  async checkMetamask(ethereum: any): Promise<boolean> {
    if (!ethereum) {
      this.alertService.error('You should install Metamask to continue :(', this.options)
      return false;
    } else {
      return true;
    }
  }

  /**
   * @function addTokenToMetamask
   * 
   * @description Add the token identifier to the metamask of the user
   * 
   * @author Alberto Machado | amacgar
   * 
   * @param ethereum 
   */
  async addTokenToMetamask(ethereum: any) {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: this.contractAddressToken, // The address that the token is at.
            symbol: this.symbolToken, // A ticker symbolNft or shorthand, up to 5 chars.
            decimals: this.decimalsToken, // The number of decimalsNft in the token
            image: '', // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @function requestAccess
   * 
   * @description If the user is not logged in Metamask send a request to log in
   * 
   * @param ethereum 
   * 
   * @return {boolean} True if the user is logged, false otherwise
   */
  async requestAccess(ethereum: any): Promise<boolean> {
    try {
      this.userAccount = await ethereum.request({
        method: "eth_requestAccounts",
      });
      this.alertService.success(`You are logged now with ${this.userAccount[0]}!!`, this.options);
      this.addTokenToMetamask(ethereum);
      return true;
    } catch (e) {
      this.alertService.error('Something happened and you are not logged =(', this.options);
      return false;
    }
  }

  async connectContract() {
    this.fighterContract = new this.web3.eth.Contract(this.tokenAbiNft.abi, this.contractAddressNft);
    this.MLDTokenContract = new this.web3.eth.Contract(this.tokenAbiMDL.abi, this.contractAddressToken);
  }

  async getUserBalance() {
    
  }

  async buyFighter() {
    try {
      await this.fighterContract.methods.buyFighter().send({ from: this.userAccount[0], value: this.web3.utils.toWei('0.01', 'ether')});
    } catch (e) {
      this.errors.throwError(e);
    }
  }

  async getAllFighters() {
    return await this.fighterContract.methods.getAllFighters().call();
  }

  async getFighter(id: number) {
    return await this.fighterContract.methods.getOwnFighter(id).call();
  }

  async getEvents() {
    let latest_block = await this.web3.eth.getBlockNumber();
    let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc
    console.log("latest: ", latest_block, "historical block: ", historical_block);
    const events = await this.fighterContract.getPastEvents(
        'FighterGenerated', // change if your looking for a different event
        { fromBlock: historical_block, toBlock: 'latest' }
    );
    return events;
  };

  getUserAccount() {
    return this.userAccount;
  }

  async changeName(id: string, name: string) {
    try {
      await this.fighterContract.methods.changeName(parseInt(id, 10), name).send({ from: this.userAccount[0], value: this.web3.utils.toWei('0.01', 'ether')});
    } catch (e) {
      this.errors.throwError(e);
    }
  }

  async transferBalanceToOwner() {
    try {
      await this.fighterContract.methods.getContractBalance().send({ from: this.userAccount[0]});
    } catch (e) {
      this.errors.throwError(e);
    }
  }

  async getTokenBalance() {
    try {
      return await this.MLDTokenContract.methods.balanceOf(this.userAccount[0]).call();
    } catch (e) {
      this.errors.throwError(e);
    }
  }

  async transferTokenFrom(to: string, amount: number) {
    try {
      return await this.MLDTokenContract.methods.transferFrom(this.userAccount[0], to, amount);
    } catch (e) {
      this.errors.throwError(e);
    }
  }
}
