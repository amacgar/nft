import { Injectable } from '@angular/core';
import { AlertService } from '../components/alert';

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

  private tokenAbi = require('../../assets/abi/MainFighter.json');
  private contracAddress = '0xECbd22697770729CBf6C755696CA9bF763f9f16D';
  private web3: any;
  private tokenContract: any;
  private userAccount: any = [];

  constructor(protected alertService: AlertService) {
    if (typeof window.web3 !== undefined) {
      this.web3 = new this.Web3(window.web3.currentProvider);
    }
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
      return true;
    } catch (e) {
      this.alertService.error('Something happened and you are not logged =(', this.options);
      return false;
    }
  }

  async connectContract() {
    this.web3.eth.contract(this.tokenAbi).at(this.contracAddress);
  }

  async getUserBalance() {
    
  }
}
