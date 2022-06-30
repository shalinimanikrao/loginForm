import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loginForm: FormGroup;
  public userAge: number;
  public birthDate: Date;
  public ageVal = false;
  public alert = false;
  currentValue: string;

  ngOnInit() {
    console.log('hello onInit');
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      dob: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  // code to print input value while typing
  getValue(value) {
    console.warn(value);
    this.currentValue = value;
  }
  get name() {
    return this.loginForm.get('name');
  }

  public ageFromBirthDate() {
    if (this.birthDate) {
      const bdate = new Date(this.birthDate);
      const timeDiff = Math.abs(Date.now() - bdate.getTime());
      this.userAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    }
    console.log(this.userAge, 'this.is user age');
    if (this.userAge >= 18 && this.userAge <= 35) {
      this.ageVal = true;
      console.log(this.ageVal, 'this is age value');
    }
  }

  get dob() {
    return this.loginForm.get('dob');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get mobile() {
    return this.loginForm.get('mobile');
  }

  public submitForm() {
    this.ageFromBirthDate();
    if (this.ageVal === true) {
      this.submit();
    }
  }

  submit() {
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.alert = true;
  }

  closeAlert() {
    this.alert = false;
  }

}
