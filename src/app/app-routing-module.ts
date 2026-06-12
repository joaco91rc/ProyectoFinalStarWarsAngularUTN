import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/inicio-module').then(m => m.InicioModule)
  },
  {
    path: 'sables',
    loadChildren: () =>
      import('./modules/sables/sables-module').then(m => m.SablesModule)
  },
  {
    path: 'personajes',
    loadChildren: () =>
      import('./modules/personajes/personajes-module').then(m => m.PersonajesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}