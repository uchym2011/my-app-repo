import { Directive, HostListener, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective {

  @Input()
  private date: string;

  // to co bedziemy wstawiac //<p>
  private paragraph;

  // aby w dyrektywie operować na naszym elemencie musimy wstrzyknać do kontruktora element ref i klase renderer
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.paragraph = this.renderer.createElement('p');
  }


  // metoda mouseenter bedzie wykonywana wtedy gdy najedziemy myszka na ten element, w ktrórym podpieta jest ta dyrektywa
  // metoda przyjmuje jakiś event
  @HostListener('mouseenter')
  mouseenter(eventDate: Event){
    console.log(this.date);
    this.paragraph.innerHTML = this.date;

    // wstrykujemy do naszego elemntu li ten nasz nowy paragraph
    this.renderer.appendChild(this.el.nativeElement, this.paragraph);
  }

  @HostListener('mouseleave')
  mouseleave(eventDate: Event){
    console.log(this.date);
    this.renderer.removeChild(this.el.nativeElement, this.paragraph);
  }
}
