import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators,  AbstractControl, ValidatorFn} from '@angular/forms';

import { Customer } from './customer';

function ratingRange(min: number, max: number) : ValidatorFn {
    return (c: AbstractControl): {[key: string]: boolean} | null =>{
        if(c.value!=undefined && (isNaN(c.value) || c.value<min|| c.value > max)){
            return {'range': true};
        };
        return null;
    };
}


@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent  implements OnInit{
    
    customerForm : FormGroup;
    customer: Customer= new Customer();
    emailMessage: string;

    private validationMessage = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    }

    constructor(private fb: FormBuilder){

    }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['',[Validators.required, Validators.minLength(3)]],
            lastName: ['',[Validators.required, Validators.maxLength(50)]],
            emailGroup:this.fb.group({
                email:['',[Validators.required, Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+")]]
            }),
            phone:'',
            notification:'email',
            rating:['', ratingRange(1,5)],
            sendCatalog: true
        });

        this.customerForm.get('notification').valueChanges
            .subscribe(value=>this.setNotification(value));
        
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.subscribe(value=> this.setMessage(emailControl));
    }

    populateTestData() : void{
        this.customerForm.patchValue({
            firstName: 'Jack',
            lastName:'kostoski',
            email: 'stevan@kostoski.com',
            rating: 4,
            sendCatalog: false
        });
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    setMessage(c: AbstractControl): void{
        this.emailMessage='';
        if((c.touched || c.dirty) && c.errors){
            this.emailMessage = Object.keys(c.errors).map(key=>this.validationMessage[key]).join(' ');
        }
    }

    setNotification(nofifyVia: string): void{
        const phoneControl = this.customerForm.get('phone');
        if(nofifyVia === 'text'){
            phoneControl.setValidators(Validators.required);
        }else{
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }
 }
