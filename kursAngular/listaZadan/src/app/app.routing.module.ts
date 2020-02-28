import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TodoTaskComponent } from "./todo-task/todo-task.component";
import { DoneTaskComponent } from "./done-task/done-task.component";
import { AuthGuardService } from "./auth/auth-guard.service";
import { WelcomeComponent } from "./auth/welcome/welcome.component";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "desktopApp",
    component: MainLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "todoTask", component: TodoTaskComponent },
      { path: "doneTask", component: DoneTaskComponent },
      { path: "", redirectTo: "todoTasks", pathMatch: "full" }
    ]
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
