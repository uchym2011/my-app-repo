import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appUiTask]"
})
export class TaskDirective {
  constructor(private el: ElementRef, private rerender: Renderer2) {
    el.nativeElement.style.position = "absolute";
    el.nativeElement.style.width = "100%";
    el.nativeElement.style.textAlign = "center";
    el.nativeElement.style.top = "50%";
    el.nativeElement.style.left = "50%";
    el.nativeElement.style.transform = "translate(-50%,-50%)";
  }
}
