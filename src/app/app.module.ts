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
import {OrganizationChartModule} from 'primeng/organizationchart';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    SlideMenuModule,
    OrgChartModule,
    RadioButtonModule,
    ButtonModule,
    OrganizationChartModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
