import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

public propertyId: number;
  constructor(private route: ActivatedRoute, private router: Router) { }
//putem converti un string la number ori punanand Number() ori +(this.route.snapshot.params['id'])
  ngOnInit() {
    this.propertyId= Number(this.route.snapshot.params['id']);
    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id']; //reload the same component; + -> e pentru convertirea in number
      }
    )
  }
//metoda care trece de la un id la celalalt la URL si schimba componenta dar in aceeasi pagina
  onSelectNext(){
    this.propertyId += 1;
    this.router.navigate(['property-detail',this.propertyId]);

  }
}
