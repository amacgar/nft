import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userLogged: boolean = false;

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    const userAccount = this.contractService.getUserAccount();
    if (userAccount.length > 0) {
      this.userLogged = true;
    }
  }

}
