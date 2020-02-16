import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { TasksService } from './services/tasks.service';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';
import { TransformTaskPipe } from './shared/transform-task.pipe';
import { SortNamePipe } from './shared/sort-name.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AppRoutingModule } from './app.routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { Login1Component } from './auth/login1/login1.component';
import { EnterToAppComponent } from './auth/enter-to-app/enter-to-app.component';


const config = {
  apiKey: 'AIzaSyCrvIJaFSRzPO8q3QRGSkfArzAYKsZz758',
  authDomain: 'autoryzacja-lista-zadan.firebaseapp.com',
  databaseURL: 'https://autoryzacja-lista-zadan.firebaseio.com',
  projectId: 'autoryzacja-lista-zadan',
  storageBucket: 'autoryzacja-lista-zadan.appspot.com',
  messagingSenderId: '447948890498',
  appId: '1:447948890498:web:a1c1b2879ae54327bf2f9b'
};

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
    LoginComponent,
    Login1Component,
    EnterToAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [TasksService, HttpService, AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule { }
