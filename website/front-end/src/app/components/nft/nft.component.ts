import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import Web3 from 'web3';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public rounded: boolean = true;
  public outline: boolean = true;

  private tokenDecimals = 4;
  
  public fighters: any;

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

  constructor(private formBuilder: FormBuilder, protected contractService: ContractService, private http: HttpClient) {}

  ngOnInit(): void {}

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

  async getBalanceFromNftContract() {
    await this.contractService.transferBalanceNftToOwner();
  }

  async getBalanceFromTokenContract() {
    await this.contractService.transferBalanceTokenToOwner();
  }

  async getTokenBalance() {
    const amountToken = await this.contractService.getTokenBalance();
    console.log(amountToken / 10 ** this.tokenDecimals);
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
    await this.contractService.buyTokens(this.buyTokens.value.to, tokenAmount, this.buyTokens.value.amountEther.toString());
    console.log(`You bought ${tokenAmount / 10 ** this.tokenDecimals} MLD`);
  }

  async convertEtherToToken(ethAmount: number) {
    try {
      const result: any = await lastValueFrom(this.getEtherPrice());
      const ethPrice: number = result.data.market_data.price_usd;
      const amountToken: number = (ethAmount * ethPrice) * (10 ** 4);
      if (amountToken > 0.0001) {
        return Math.floor(amountToken);
      }
      return 0;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  getEtherPrice() {
    return this.http.get('https://data.messari.io/api/v1/assets/eth/metrics');
  }

  countDecimals(num: number) {
    if(Math.floor(num) === num) return 0;
    return num.toString().split(".")[1].length || 0; 
  }
}
