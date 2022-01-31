import { Injectable } from '@angular/core';
import CONSTANTS from '../../config/constants';
import { AlertService } from '../components/alert';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  options = {
    autoClose: true,
  }

  constructor(protected alertService: AlertService) { }

  throwError(e: any) {
    if (e.message === CONSTANTS.no_account) {
      this.alertService.error("You should connect your Metamask account first :(", this.options);
    } else {
      this.alertService.error("Something was wrong :(", this.options);
    }
    throw new Error(e);
  }
}
