import {
  Component, OnInit, Input,
  OnChanges, SimpleChanges, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import { Dog } from '../app.component';

@Component({
  selector: 'app-nowy',
  templateUrl: './nowy.component.html',
  styleUrls: ['./nowy.component.css']
})
export class NowyComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input()
  inputText: string;
  @Input()
  inputDog: Dog;
  show = true;


  /**
   * Uruchamia się na począku, przed ngOnInit
   * Sprawdza czy zmieniły się zbindowane pola komponentu.
   * Musi zmienić sie referencja!
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges - uruchomione! - #1');
    console.log(changes);
  }

  /**
 * Uruchamia się jeden raz podczas inicjalizacji komponentu
 * Uruchami się po konstruktorze i po ngOnChange
 */
  ngOnInit(): void {
    console.log('ngOnInit - uruchomione!  - #2');
  }

  /**
    * Uruchamia się przy każdej zmianie, wywołaniu eventa etc
    */
  ngDoCheck(): void {
    console.log('ngDoCheck - uruchomione! - #3');
  }

  /**
    * Uruchamia się po inicjalizacji np <ng-content>
    */
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit - uruchomione! - #4');
  }

  /**
    * Uruchamia się po każdej zmianie np <ng-content>
    */
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked - uruchomione! - #5');
  }

  /**
    * Uruchamia się po inicjalizacji widoku
    */
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - uruchomione! - #6');
  }

  /**
   * Uruchamia się po każdej zmianie w widoku
   */
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked - uruchomione! - #7');
  }

  /**
   * Uruchamia się po zniszczeniu komponentu
   */
  ngOnDestroy(): void {
    console.log('ngOnDestroy - uruchomione! - #8');
  }

  content() {
    this.show = !this.show;
  }

}
