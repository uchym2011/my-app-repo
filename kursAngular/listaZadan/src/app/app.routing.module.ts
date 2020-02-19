import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TodoTaskComponent } from "./todo-task/todo-task.component";
import { DoneTaskComponent } from "./done-task/done-task.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { WelcomeComponent } from "./auth/welcome/welcome.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "todoTask",
    component: TodoTaskComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "doneTask",
    component: DoneTaskComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
