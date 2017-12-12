import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';
import { AppComponent } from './app.component';
import { WebglService } from "./shared/webgl.service";
import { DataService } from "./shared/data.service";
import { AvatarService } from "app/shared/avatar.service";
import { WebglCanvasComponent } from './webgl-canvas/webgl-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    WebglCanvasComponent
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [DataService, WebglService, AvatarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
