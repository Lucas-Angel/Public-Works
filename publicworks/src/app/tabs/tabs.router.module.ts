import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: './home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'divulgar-obra',
        children: [
          {
            path: '',
            loadChildren: './divulgar-obra/divulgar-obra.module#DivulgarObraPageModule'
          }
        ]
      },
      {
        path: 'mapa-obras',
        children: [
          {
            path: '',
            loadChildren: './mapa-obras/mapa-obras.module#MapaObrasPageModule'
          }
        ]
      },
      {
        path: 'historico',
        children: [
          {
            path: '',
            loadChildren: './historico/historico.module#HistoricoPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
