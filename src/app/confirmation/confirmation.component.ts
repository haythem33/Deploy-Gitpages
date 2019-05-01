import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../confirmation.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
token: any;
  constructor(public confirmationService: ConfirmationService) { }

  ngOnInit() {
  }


}
