import { Component, OnInit } from '@angular/core';
import { AddPropertyComponent } from '../property/add-property/add-property.component';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  router: any;
  constructor() {}

  ngOnInit() {}
  scrollIconClicked = false;
  scrollToSteps() {
    const stepsSection = document.querySelector('.steps-container');
    if (stepsSection) {
      stepsSection.scrollIntoView({ behavior: 'smooth' });
      this.scrollIconClicked = true;
    }
  }
  refToContactForm() {}
}
