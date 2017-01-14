import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
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
            <input type="number" formControlName="gross_pay" [value]="45000" placeholder="How money?" (keyup)="computePaycheck()">
          </label>
        <label class="flexify">
            Pay Frequency:
          <!--    <input type="text"  formControlName="pay_frequency" class="sd-form-control" placeholder="Annually, Monthly, Bimonthly, Biweekly?">-->
              <select id="pay_frequency" formControlName="pay_frequency" >
              <option value="annually">Annually</option>
              <option value="monthly">Monthly</option>
              </select>
          </label>

           <label class="flexify">
            Filling Status:
            <!-- <input type="text" formControlName="filling_status" class="sd-form-control" placeholder="Single, Married, Married File Separate, Head of Household?">-->
            <select id="filling_status" formControlName="filling_status" class="sd-form-control">
            <option value="single">Single</option>
            <option value="married">Married</option>
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
  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(){
    this.paycheck.gross_pay = 45000;
    this.paycheckForm = this.formBuilder.group({
      gross_pay: [45000],
      pay_frequency: [''],
      filling_status: ['']
    });
    this.computePaycheck();
  }

  computePaycheck(){
    var paycheck = this.paycheck
    this.paycheck.gross_pay = this.paycheckForm.value.gross_pay;
    this.paycheck.fed_tax = paycheck.gross_pay*0.2;
    this.paycheck.social_security = paycheck.gross_pay*0.062;
    this.paycheck.medicare = paycheck.gross_pay*0.0145;
    this.paycheck.net_annual = paycheck.gross_pay - paycheck.fed_tax;
    this.paycheck.net_monthly = paycheck.net_annual/12;
  }
}
