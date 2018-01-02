import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'pal-nav-page',
  templateUrl: './pal-nav.component.html',
  styleUrls: ['../../../assets/css/nav.css']
})
export class PalNavPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
