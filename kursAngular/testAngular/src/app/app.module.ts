import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3.component';
import { Z1naglowekComponent } from './z1naglowek/z1naglowek.component';
import { Z1stopkaComponent } from './z1stopka/z1stopka.component';
import { MenuComponent } from './menu/menu.component';
import { Z1zawartoscComponent } from './z1zawartosc/z1zawartosc.component';
import { Z1itemComponent } from './z1item/z1item.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    Test2Component,
    Test3Component,
    Z1naglowekComponent,
    Z1stopkaComponent,
    MenuComponent,
    Z1zawartoscComponent,
    Z1itemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
