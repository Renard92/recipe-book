import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DropdownDirective} from "./directive/dropdown.directive";
import { NotFoundComponent } from './component/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    NotFoundComponent
  ],
  exports: [
    CommonModule,
    DropdownDirective
  ]
})
export class SharedModule { }
