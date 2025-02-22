import { Component, Input } from '@angular/core';
import { IProperty } from '../IProperty.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css'],
  imports: [CommonModule],
})
export class PropertyCardComponent {
  @Input() property: IProperty;
  constructor(private router: Router) {}
  goToPropertyDetail(): void {
    this.router.navigate(['/property-detail/:id']); // Adjust the route if needed
  }
}
