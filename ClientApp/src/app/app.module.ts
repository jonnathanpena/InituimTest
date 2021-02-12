import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClockComponent } from './clock/clock.component';
import { ListComponent } from './list/list.component';
import { TurnGenerateComponent } from './components/turn-generate/turn-generate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Externals Libs */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClockComponent,
    ListComponent,
    TurnGenerateComponent
  ],
  entryComponents: [
    TurnGenerateComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    BrowserAnimationsModule
  ],
  exports: [
    ClockComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
