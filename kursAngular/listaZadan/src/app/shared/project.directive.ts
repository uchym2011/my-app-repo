import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appProject]"
})
export class ProjectDirective {
  private card;
  constructor(private el: ElementRef, private rerender: Renderer2) {
    this.card = this.rerender.createElement("div");
  }
}
