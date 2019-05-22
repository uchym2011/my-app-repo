import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Nauka angulara';
  dog = new Dog('Reksio');
  show = true;

  changeTitle() {
    this.title = 'Angular jest fajny!';
  }

  changeDog() {
    this.dog.name = 'Ciapek';
    // this.dog = new Dog('Szarik');
  }

  nothing() {
  }

  destory() {
    this.show = !this.show;
  }
}

export class Dog {
  constructor(public name: string) {
  }


}
