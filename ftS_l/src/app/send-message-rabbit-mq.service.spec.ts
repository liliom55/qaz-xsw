/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendMessageRabbitMqService } from './send-message-rabbit-mq.service';

describe('Service: SendMessageRabbitMq', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendMessageRabbitMqService]
    });
  });

  it('should ...', inject([SendMessageRabbitMqService], (service: SendMessageRabbitMqService) => {
    expect(service).toBeTruthy();
  }));
});
