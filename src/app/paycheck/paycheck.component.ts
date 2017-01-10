import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
@Component({
  selector: 'paycheck',
  styleUrls: ['./paycheck.component.css'],
  template: `


    <div id="results">
      <p *ngIf="paycheck.gross_pay">Gross Pay: {{paycheckForm.value.gross_pay}}</p>
      <p *ngIf="paycheck.fed_tax">Federal Income Tax: {{paycheck}}</p>
      <p *ngIf="paycheck.social_security">Social Security: {{paycheck.social_security}}</p>
      <p *ngIf="paycheck.medicare">Medicare: {{paycheck}}</p>
      <p *ngIf="paycheck.annual_net">Annual Net: {{paycheck}}</p>
      <p *ngIf="paycheck.monthly_net">Monthly Net: {{paycheck}}</p>
    </div>
    <div id="paycheck">
    <h2>Your Paycheck</h2>
      <form (ngSubmit)="computePaycheck()" [formGroup]="paycheckForm" novalidate>
        <div class="paycheck-form">
          <label class="flexify">
            Gross Pay
            <input type="number" formControlName="gross_pay" [value]="45000" placeholder="How money?" (ngModelChange)="computePaycheck()">
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
            <button type="submit">Calculate</button>
          </label>
        </div>
      </form>
    </div>
  `
})
export class PaycheckComponent {
  paycheckForm: FormGroup;
  paycheck: any = {}
  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(){
    this.paycheckForm = this.formBuilder.group({
      gross_pay: [0],
      pay_frequency: [''],
      filling_status: ['']
    });
    this.paycheck.gross_pay = true;
  }

  computePaycheck(){
    console.log("computePaycheck() form object");
    this.paycheck.gross_pay = this.paycheckForm.value.gross_pay;
    var gross_pay = this.paycheckForm.value.gross_pay;
    this.paycheck.social_security = gross_pay*0.062;
    this.paycheck.medicare = gross_pay*0.0145

  }
}
