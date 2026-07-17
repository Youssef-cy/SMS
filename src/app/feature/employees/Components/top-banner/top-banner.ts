import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmp } from '../../../add-emp/add-emp';
import { AddBtn } from "../../../../shared/add-btn/add-btn";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-top-banner',
  imports: [AddBtn, RouterLink],
  templateUrl: './top-banner.html',
  styleUrl: './top-banner.css',
})
export class TopBanner {
  
    constructor(  private dialog: MatDialog,){}

  
  openDialog() {
    this.dialog.open(AddEmp, {
      width: '500px',
    });
  }

  

}
