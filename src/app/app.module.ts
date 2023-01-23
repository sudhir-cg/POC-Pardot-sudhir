import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { OrgChartModule } from '@mondal/org-chart';
import { SlideMenuModule } from 'primeng/slidemenu';
import {RadioButtonModule} from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';

import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    OrgChartModule,
    RadioButtonModule,
    ButtonModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
