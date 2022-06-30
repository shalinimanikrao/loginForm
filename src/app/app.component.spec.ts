import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  // let input: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should check name is invalid', () => {
    const name = component.loginForm.controls.name;
    expect(name.valid).toBeFalsy();
    expect(name.pristine).toBeTruthy();
    expect(name.errors.required).toBeTruthy();
    name.setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    expect(Validators.maxLength).toBeTruthy();
    expect(Validators.minLength).toBeTruthy();
  });

  it('should check name entered is valid', () => {
    const name = component.loginForm.controls.name;
    name.setValue('test');
    expect(name.errors).toBeNull();
  });

  it('should check dob is invalid', () => {
    const dob = component.loginForm.controls.name;
    expect(dob.valid).toBeFalsy();
    expect(dob.errors.required).toBeTruthy();
  });

  it('should check dob entered is valid', () => {
    const dob = component.loginForm.controls.dob;
    dob.setValue('01/01/2000');
    expect(dob.errors).toBeNull();
  });

  it('should check mobile number is invalid', () => {
    const mobile = component.loginForm.controls.mobile;
    expect(mobile.valid).toBeFalsy();
    expect(mobile.pristine).toBeTruthy();
    expect(mobile.errors.required).toBeTruthy();
    mobile.setValue('123045');
    expect(Validators.pattern).toBeTruthy();
  });

  it('should check mobile number entered is valid', () => {
    const mobile = component.loginForm.controls.mobile;
    mobile.setValue('1234567890');
    expect(mobile.errors).toBeNull();
  });

  it('should check email Id is invalid', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors.required).toBeTruthy();
    email.setValue('abc');
    expect(email.errors.email).toBeTruthy();
  });

  it('should check email Id entered is valid', () => {
    const email = component.loginForm.controls.email;
    email.setValue('abc@gmail.com');
    expect(email.errors).toBeNull();
  });

  it('should check password enterred is invalid', () => {
    const password = component.loginForm.controls.password;
    expect(password.errors.required).toBeTruthy();
    password.setValue('1234');
    expect(Validators.minLength).toBeTruthy();
  });

  it('should check password enterred is valid', () => {
    const password = component.loginForm.controls.password;
    password.setValue('12345');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  });

  it('should check if form is valid or not with no data filled', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should check if form is valid or not when data filled', () => {
    component.loginForm.controls.name.setValue('abcd');
    component.loginForm.controls.dob.setValue('01/01/2000');
    component.loginForm.controls.mobile.setValue('1230456789');
    component.loginForm.controls.email.setValue('abcd@email.com');
    component.loginForm.controls.password.setValue('123456');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should check if the form is submitted', () => {
    expect(component.loginForm.invalid).toBeTruthy();
    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(button.nativeElement.disabled).toBeTruthy();
    component.loginForm.controls.name.setValue('abcd');
    component.loginForm.controls.dob.setValue('01/01/2000');
    component.loginForm.controls.mobile.setValue('1230456789');
    component.loginForm.controls.email.setValue('abcd@email.com');
    component.loginForm.controls.password.setValue('123456');
    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeFalsy();
    component.submitForm();
    fixture.detectChanges();
    const successForm = fixture.debugElement.query(By.css('#alert')).nativeElement.innerText;
    expect(successForm).toBeTruthy();
  });

});
