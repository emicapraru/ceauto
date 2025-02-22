import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { IPropertyBase } from '../../model/ipropertybase';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { DownBarComponent } from '../../down-bar/down-bar.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  standalone: true,
  styleUrls: ['./add-property.component.css'],
  imports: [
    FormsModule,
    NgIf,
    CommonModule,
    FormsModule,
    TabsModule,
    ButtonsModule,
    DownBarComponent,
    NgbCarouselModule,
  ],
})
export class AddPropertyComponent implements OnInit {
  [x: string]: any;
  @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  @ViewChild('formContainer') formContainer: ElementRef;
  stepsVisible = false;

  propertyView: IPropertyBase = {
    city: '',
    id: 0,
    sellRent: 0,
    name: '',
    prename: '',
    email: '',
    phone: 0,
    buget: 0,
    variante: '',
    cutieViteza: '',
    regimCondus: '',
    nevConsultanta: '',
    zi: '',
    alteInformatii: '',
    alteDetalii: '',
  };
  constructor(private router: Router, private housingService: HousingService) {}
  cityList: any[];

  ngOnInit() {
    // setTimeout is used because of NgOnInit lifycicle difference between Form; 1000 for rending a lot of components for form if they are many in the future
    // template driven forms are asyncronoes and reactive forms are syncronos
    setTimeout(() => {
      this.addPropertyForm.controls['Name'].setValue('Default Value');
    }, 1000);

    this.housingService.getAllCities().subscribe((data: any) => {
      console.log(data);
      this.cityList = data;
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit(Form: NgForm) {
    console.log('Congrats');
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
  scrollToForm() {
    this.formContainer.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  toggleSteps() {
    this.stepsVisible = !this.stepsVisible;
  }
}
