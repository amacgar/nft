import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  changeNameForm = this.formBuilder.group({
    name: '',
  })

  constructor(private formBuilder: FormBuilder, protected contractService: ContractService) { }

  ngOnInit(): void {

  }

  async buyFighter() {
    
  }

  async onSubmit() {
    console.log(this.changeNameForm.value.name);
  }

  async connect() {
    this.contractService.checkIfConnected();
    console.log("Trying to connect");
  }
}

declare global {
    interface Window {
        web3:any;
        ethereum:any;
    }
}