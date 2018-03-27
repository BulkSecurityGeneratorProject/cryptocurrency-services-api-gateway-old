import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-hello',
  templateUrl: './hello.component.html',
  styleUrls: [
    'hello.scss'
  ]
})
export class HelloComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'HelloComponent message';
  }

  ngOnInit() {
  }

}
