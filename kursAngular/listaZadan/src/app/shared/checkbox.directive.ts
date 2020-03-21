import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appUiCheckbox]"
})
export class CheckboxDirective {
  constructor(private el: ElementRef, private rerender: Renderer2) {
    el.nativeElement.style.width = "10%";
  }
}
