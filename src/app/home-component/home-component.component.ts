import { Component, OnInit } from '@angular/core';
import { AddPropertyComponent } from '../property/add-property/add-property.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  scrollIconClicked = false;
  scrollToSteps() {
    const stepsSection = document.querySelector('.steps-container');
    if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: 'smooth' });
      this.scrollIconClicked = true;
    }
  }
  refToContactForm() {
    this.router.navigate(['/add-property'], { fragment: 'formContainer' });
  }
}
