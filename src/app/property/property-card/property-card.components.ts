import { Component, Input } from '@angular/core';
import { IProperty } from '../IProperty.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-card',
  templateUrl: 'property-card.component.html',
  styleUrls: ['property-card.component.css'],
  imports: [CommonModule],
})
export class PropertyCardComponent {
  @Input() property: IProperty;
}
