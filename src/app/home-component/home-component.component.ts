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

  ngAfterViewInit(): void {
    // Hide the scroll icon after user scrolls
    window.addEventListener('scroll', () => {
      const mouse = document.querySelector('.mouse') as HTMLElement;
      if (mouse) {
        if (window.scrollY > 100) {
          mouse.style.opacity = '0';
          mouse.style.pointerEvents = 'none';
        } else {
          mouse.style.opacity = '1';
          mouse.style.pointerEvents = 'auto';
        }
      }
    });
  }

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
