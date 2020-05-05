import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../models/task";

// unikać pure: false ponieważ bardzo obciaża, nawet przy ruchu myszka sortuje za każdym razem od nowa

@Pipe({
  name: "sortName",
  pure: true,
})
export class SortNamePipe implements PipeTransform {
  transform(value: Array<string>, args = false): Array<string> {
    if (args) {
      // return value.sort();
      // * More advanced case
      return value.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    return value;
  }
  // }
}
