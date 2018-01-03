import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'pal-nav-page',
  templateUrl: '/owcs/app/components/pal/pal-nav.component.html',
  styleUrls: ['/owcs/app/components/pal/pal-nav.component.css']
})
export class PalNavPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
