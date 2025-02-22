import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICars } from '../../model/icars';
import { HousingService } from '../../services/housing.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  standalone: true,
  imports: [CommonModule, TabsModule], // Add TabsModule here
})
export class PropertyDetailComponent implements OnInit {
  Marca = 'BMW';
  public propertyId: number;
  cars = new ICars();
  carsproperties: Array<ICars>;
  mainPhotoUrl: any;
  selectedImage: string;
  selectedImageIndex: number = 0;
  galleryImages = [
    { small: 'assets/img1-small.jpg', big: 'assets/img1-big.jpg' },
    { small: 'assets/img2-small.jpg', big: 'assets/img2-big.jpg' },
    { small: 'assets/img3-small.jpg', big: 'assets/img3-big.jpg' },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}
  //putem converti un string la number ori punanand Number() ori +(this.route.snapshot.params['id'])
  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['id']);
    this.route.params.subscribe((params) => {
      this.propertyId = +params['id']; //reload the same component; + -> e pentru convertirea in number
    });
    this.housingService.getAllCarsDetails(this.Marca).subscribe({
      next: (data) => {
        this.carsproperties = data;
        console.log('Data fetched successfully:', data);
        //console.log(this.route.snapshot.url.toString());
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetch completed.');
      },
    });
  }
  //metoda care trece de la un id la celalalt la URL si schimba componenta dar in aceeasi pagina
  onSelectNext() {
    this.propertyId += 1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
  selectImage(index: number): void {
    this.selectedImageIndex = index;
    this.selectedImage = this.galleryImages[index].big;
  }
}
