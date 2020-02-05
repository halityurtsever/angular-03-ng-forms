import { Component } from '@angular/core';
import { Employee } from './models/employee';
import { FormPosterService } from './services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // fields
  title = 'Angular 2 Forms';
  languages = [];
  employeeModel = new Employee('', '', true, 'Company', 'default');
  hasLanguageError = false;

  // constructor
  constructor(private formPoster: FormPosterService) {
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.error('error: ', err)
      );
  }

  // methods
  submitForm(form: NgForm) {
    // do some form validation
    this.validateLanguage(this.employeeModel.primaryLanguage);
    if (this.hasLanguageError) {
      return;
    }

    this.formPoster.postEmployeeForm(this.employeeModel)
      .subscribe(
        data => console.log('success: ', data),
        err => console.log('error: ', err)
      );
  }

  validateLanguage(value) {
    if (value === 'default') {
      this.hasLanguageError = true;
    } else {
      this.hasLanguageError = false;
    }
  }

  setFirstName(value: string) {
    this.employeeModel.firstName = this.firstCharToUppercase(value);
  }

  setLastName(value: string) {
    this.employeeModel.lastName = this.firstCharToUppercase(value);
  }

  private firstCharToUppercase(value: string): string {
    if (value.length > 0) {
      return value[0].toUpperCase() + value.slice(1);
    } else {
      return value;
    }
  }
}
