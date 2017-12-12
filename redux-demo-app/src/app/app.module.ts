import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { fromJS, Map } from 'immutable';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // not immutable
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
  // immutable
  // fromJS() and Map() return an immutable object:
  // constructor(ngRedux: NgRedux<Map<string, any>>) {
  //   ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE));
  // }


}
