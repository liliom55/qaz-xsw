import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductSizeDisplayPipe } from './product-size-display.pipe';
import { HumanizePipe } from './humanize.pipe';
import { PriceFilterPipe } from './price-filter/price-filter.pipe';

import { ClientService } from './clients/client.service';
import { ProductService } from './products/product.service';
import { CustomRoutingService } from './custom-routing/custom-routing.service';
import { LogoutService } from './logout/logout.service';
import { EmailService } from './email/email.service';
import { DynamicFormComponent }         from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { AppStompConfigService } from './stomp-config/app-stomp-config.service';

import { StompConfigService, StompService} from '@stomp/ng2-stompjs';
// import { MaterialModule } from '@angular/material';
import { CustomMaterialModule } from '../customMaterialModule';


@NgModule({
  schemas:[NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ProductSizeDisplayPipe,
    HumanizePipe,
    PriceFilterPipe
  ],
  providers: [
    ClientService,
    ProductService,
    CustomRoutingService,
    LogoutService,
    EmailService,
    StompService,
    {
      provide: StompConfigService,
      useClass: AppStompConfigService
    },
  ],
  exports: [
    DynamicFormComponent,
    ProductSizeDisplayPipe,
    HumanizePipe,
    PriceFilterPipe,
    CustomMaterialModule
    ]
})
export class SharedModule { }
