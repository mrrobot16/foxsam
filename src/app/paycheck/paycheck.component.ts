import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
@Component({
  selector: 'paycheck',
  styleUrls: ['./paycheck.component.css'],
  template: `
  <h2>Your Paycheck</h2>
    <div id="paycheck">
      <form (ngSubmit)="computePaycheck()" [formGroup]="paycheckForm" novalidate>
        <div class="form-content">
          <label>
            Gross Pay
            <input type="number" formControlName="gross_pay" class="sd-form-control" placeholder="How money?">
          </label>
        <label>
            Pay Frequency
          <!--    <input type="text"  formControlName="pay_frequency" class="sd-form-control" placeholder="Annually, Monthly, Bimonthly, Biweekly?">-->
              <select id="pay_frequency" formControlName="filling_status" class="sd-form-control">
              <option value="annually">Annually</option>
              <option value="monthly">Monthly</option>
              </select>
          </label>

           <label>
            Filling Status:
            <!-- <input type="text" formControlName="filling_status" class="sd-form-control" placeholder="Single, Married, Married File Separate, Head of Household?">-->
            <select id="filling_status" formControlName="filling_status" class="sd-form-control">
            <option value="single">Single</option>
            <option value="married">Married</option>
            </select>
          </label>
          <div class="form-submit">
            <button type="submit">Calculate</button>
          </div>
        </div>
      </form>
    </div>
  `
})
export class PaycheckComponent {
  paycheckForm:FormGroup;

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
    console.log("computePaycheck()")
  }
}
