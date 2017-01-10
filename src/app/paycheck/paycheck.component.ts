import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
@Component({
  selector: 'paycheck',
  styleUrls: ['./paycheck.component.css'],
  template: `


    <div id="results">
      <p>Gross Pay: {{paycheck}}</p>
      <p>Federal Income Tax: {{paycheck}}</p>
      <p>Social Security: {{paycheck}}</p>
      <p>Medicare: {{paycheck}}</p>
      <p>Annual Net: {{paycheck}}</p>
      <p>Monthly Net: {{paycheck}}</p>
    </div>
    <div id="paycheck">
    <h2>Your Paycheck</h2>
      <form (ngSubmit)="computePaycheck()" [formGroup]="paycheckForm" novalidate>
        <div class="paycheck-form">
          <label class="flexify">
            Gross Pay
            <input type="number" formControlName="gross_pay" placeholder="How money?">
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
      gross_pay: [''],
      pay_frequency: [''],
      filling_status: ['']
    });
  }

  computePaycheck(){
    console.log("computePaycheck() form object");
    console.log(this.paycheckForm);
  }
}
