import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'pal-nav-page',
  templateUrl: './queue-nav.component.html',
  styleUrls: ['../../../assets/css/nav.css']
})
export class QueueNavPageComponent implements OnInit {
  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
