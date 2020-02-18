import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TodoTaskComponent } from "./todo-task/todo-task.component";
import { DoneTaskComponent } from "./done-task/done-task.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuardService } from "./auth/auth-guard.service";

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
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
