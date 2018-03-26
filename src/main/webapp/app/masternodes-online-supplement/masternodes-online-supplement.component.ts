import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-masternodes-online-supplement',
  templateUrl: './masternodes-online-supplement.component.html',
  styleUrls: [
    'masternodes-online-supplement.scss'
  ]
})
export class MasternodesOnlineSupplementComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'MasternodesOnlineSupplementComponent message';
  }

  ngOnInit() {
  }

}
