import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import {FedTaxService} from './shared/fed_tax.service';
@Component({
  selector: 'paycheck',
  styleUrls: ['./paycheck.component.css'],
  template: `

  <div id="paycheck-section">
    <div id="results">
     <h2>Paycheck info</h2>
      <p>Gross Pay: {{paycheck.gross_pay}}</p>
      <p>Federal Income Tax: {{paycheck.fed_tax}}</p>
      <p>Social Security: {{paycheck.social_security}}</p>
      <p>Medicare: {{paycheck.medicare}}</p>
      <p>Annual Net: {{paycheck.net_annual}}</p>
      <p>Monthly Net: {{paycheck.net_monthly }}</p>
    </div>
    <div id="paycheck">
    <h2>Your Paycheck</h2>
      <form (ngSubmit)="computePaycheck()" [formGroup]="paycheckForm" novalidate>
        <div class="paycheck-form">
          <label class="flexify">
            Gross Pay
            <input type="number" formControlName="gross_pay"  placeholder="How money?" (keyup)="computePaycheck()">
          </label>
        <label class="flexify">
            Pay Frequency:
          <!--    <input type="text"  formControlName="pay_frequency" class="sd-form-control" placeholder="Annually, Monthly, Bimonthly, Biweekly?">-->
              <select id="pay_frequency" formControlName="pay_frequency" >
              <option value="annual" [selected]='true'>Annually</option>
              <option value="monthly">Monthly</option>
              </select>
          </label>

           <label class="flexify">
            Filling Status:
            <!-- <input type="text" formControlName="filling_status" class="sd-form-control" placeholder="Single, Married, Married File Separate, Head of Household?">-->
            <select id="filling_status" formControlName="filling_status" class="sd-form-control">
            <option value="single" [selected]='true'>Single</option>
            <option value="married">Married</option>
            <option value="single">Married file separated</option>
            </select>
          </label>
          <label class="form-submit">
            <button class="" type="submit">Calculate</button>
          </label>
        </div>
      </form>
    </div>
  </div>
  `
})
export class PaycheckComponent {
  paycheckForm: FormGroup;
  paycheck: any = {}

  constructor(private formBuilder: FormBuilder, private fed_tax_service: FedTaxService) {

  }
  ngOnInit(){
    this.paycheck.gross_pay = 45000;
    this.paycheckForm = this.formBuilder.group({
      gross_pay: [45000],
      pay_frequency: ['annual'],
      filling_status: ['single']
    });
    this.computePaycheck();
  }

  computePaycheck(){
    var paycheck = this.paycheck
    paycheck.gross_pay = this.paycheckForm.value.gross_pay;
    paycheck.filling_status = this.paycheckForm.value.filling_status;
    paycheck.pay_frequency = this.paycheckForm.value.pay_frequency;

    // TODO Build FedWithholding logic
    paycheck.fed_tax = paycheck.gross_pay*this.fed_tax_service.fed_withholding();

    paycheck.social_security = paycheck.gross_pay*0.062;
    paycheck.medicare = paycheck.gross_pay*0.0145;
    paycheck.net_annual = paycheck.gross_pay - paycheck.fed_tax;
    paycheck.net_monthly = paycheck.net_annual/12;

  }
}
