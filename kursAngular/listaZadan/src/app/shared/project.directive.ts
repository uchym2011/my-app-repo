import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appUiProject]"
})
export class ProjectDirective {
  constructor(private el: ElementRef, private rerender: Renderer2) {
    el.nativeElement.style.position = "relative";
    el.nativeElement.style.display = "flex";
    el.nativeElement.style.height = "5%";
    el.nativeElement.style.justifyContent = "flexStart";
    el.nativeElement.style.alignItems = "center";
    el.nativeElement.style.borderBottom = "1px solid black";
    el.nativeElement.style.background = "blue";
  }
}
