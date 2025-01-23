import { Component, Input } from '@angular/core';
import { IProperty } from '../IProperty.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-card',
  // template: `<h1>I am a card</h1>`,
  templateUrl: 'property-card.component.html',
  // styles: ['h1 {font-weight: normal;}']
  styleUrls: ['property-card.component.css'],
  imports: [CommonModule],
})
export class PropertyCardComponent {
  @Input() property: IProperty;
}
