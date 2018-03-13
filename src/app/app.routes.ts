import {Routes} from '@angular/router';
import {NoContentComponent} from './components/no-content';
import {TreePageComponent} from './components/tree-page/tree-page.component';


export const ROUTES: Routes = [
  {path: '', component: TreePageComponent},
  {path: '**', component: NoContentComponent},
];
