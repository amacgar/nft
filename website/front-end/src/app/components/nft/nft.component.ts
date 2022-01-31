import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { HttpClient } from '@angular/common/http';
import Web3 from 'web3';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public rounded: boolean = true;
  public outline: boolean = true;
  
  private client: any;

  public fighters: any;

  private tokenAmount = 0;

  changeNameForm = this.formBuilder.group({
    name: '',
  });
  
  transferToken = this.formBuilder.group({
    to: '',
    amount: 0
  });

  createTokens = this.formBuilder.group({
    to: '',
    amount: 0
  });

  buyTokens = this.formBuilder.group({
    to: '',
    amountEther: 0
  })

  constructor(private formBuilder: FormBuilder, protected contractService: ContractService, private http: HttpClient) {
    // const coinbase = require('coinbase').Client;
    // const credentials = require('../../../../secrets.json');
    // this.client = new coinbase({
    //   'apiKey': credentials.apiKey,
    //   'apiSecret': credentials.apiSecret,
    //   'version': '2010-04-20',
    //   'strictSSL': false
    // });
    // const CoinbasePro = require('coinbase-pro');
    // this.client = new CoinbasePro.PublicClient();
  }

  ngOnInit(): void {
    this.getEtherPrice().subscribe(result => {
      console.log(result);
    })
  }

  async buyFighter() {
    try {
      await this.contractService.buyFighter();
      console.log("Successful buy");
    } catch (e) {
    }
  }

  async onSubmit(id: string) {
    console.log(this.changeNameForm.value.name);
    await this.contractService.changeName(id, this.changeNameForm.value.name);
  }

  async connect() {
    try {
      await this.contractService.checkIfConnected();
      console.log("Successful connect");
    } catch (e) {
      console.log(e);
    }
  }

  async getAllFighters() {
    this.fighters = await this.contractService.getAllFighters();
    console.log(this.fighters);
  }

  async getEvents() {
    const events = await this.contractService.getEvents();
    console.log(events);
  }

  async getBalanceFromContract() {
    await this.contractService.transferBalanceToOwner();
  }

  async getTokenBalance() {
    const amountToken = await this.contractService.getTokenBalance();
    console.log(amountToken);
  }

  async transferTokenTo() {
    const result = await this.contractService.transferToken(this.transferToken.value.to, this.transferToken.value.amount);
    console.log(result);
  }

  async createTokensTo() {
    const result = await this.contractService.createTokens(this.createTokens.value.to, this.createTokens.value.amount);
    console.log(result);
  }

  async getOwner() {
    const owner = await this.contractService.getOwner();
    console.log(owner);
  }

  async buyToken() {
    const tokenAmount = await this.convertEtherToToken(this.buyTokens.value.amountEther);
    await this.contractService.buyTokens(this.buyTokens.value.to, this.tokenAmount, this.buyTokens.value.amountEther.toString());
  }

  async convertEtherToToken(ethAmount: number) {
    // let converted: number = 0;
    // await this.client.getSpotPrice({'currencyPair': 'ETH-USD'}, (err: any, price: any) => {
    //   if (price) {
    //     const amountToken = ethAmount * price;
    //     if (this.countDecimals(amountToken) < 4) {
    //       converted = amountToken;
    //     }
    //   } else {
    //     console.log(err);
    //   }
    // });
    // return converted;
  }

  getEtherPrice() {
    // return this.http.get('http://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    return this.http.get('https://data.messari.io/api/v1/assets/eth/metrics');
  }

  countDecimals(num: number) {
    if(Math.floor(num) === num) return 0;
    return num.toString().split(".")[1].length || 0; 
  }
}
