import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
// App is our top level component
import {AppComponent} from './app.component';
import {NoContentComponent} from './components/no-content';
import '../styles/styles.scss';
import {reducer} from './reducers/index';
import {StoreModule} from '@ngrx/store';
import {TreeNodeComponent} from './components/tree-node/tree-node.component';
import {TreePageComponent} from './components/tree-page/tree-page.component';


// Application wide providers
const APP_PROVIDERS = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent,
    TreeNodeComponent,
    TreePageComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    StoreModule.provideStore(reducer),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef
  ) {
  }
}
