import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import Web3 from 'web3';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  public rounded: boolean = true;
  public outline: boolean = true;

  public fighters: any;

  changeNameForm = this.formBuilder.group({
    name: '',
  })

  constructor(private formBuilder: FormBuilder, protected contractService: ContractService) { }

  ngOnInit(): void {
  }

  async buyFighter() {
    try {
      await this.contractService.buyFighter();
      console.log("Successful buy");
    } catch (e) {
      console.log(e);
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

}