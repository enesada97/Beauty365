import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "managements",
    loadChildren: () =>
      import("./managements/managements.module").then((m) => m.ManagementsModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "patients",
    loadChildren: () =>
      import("./patients/patients.module").then((m) => m.PatientsModule),
  },
  {
    path: "departments",
    loadChildren: () =>
      import("./departments/departments.module").then((m) => m.DepartmentsModule),
  },
  {
    path: "doctors",
    loadChildren: () =>
      import("./doctors/doctors.module").then((m) => m.DoctorsModule),
  },
  {
    path: "institutions",
    loadChildren: () =>
      import("./institutions/institutions.module").then((m) => m.InstitutionsModule),
  },

  {
    path: "protocols",
    loadChildren: () =>
      import("./protocols/protocols.module").then((m) => m.ProtocolsModule),
  },
  {
    path: "appointments",
    loadChildren: () =>
      import("./appointments/appointments.module").then((m) => m.AppointmentsModule),
  },
  {
    path: "processes",
    loadChildren: () =>
      import("./processes/processes.module").then((m) => m.ProcessesModule),
  },
  {
    path: "working",
    loadChildren: () =>
      import("./working/working.module").then((m) => m.WorkingModule),
  },
  {
    path: "options",
    loadChildren: () =>
      import("./options/options.module").then((m) => m.OptionsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
