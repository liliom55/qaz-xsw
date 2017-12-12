import { Component, OnInit, Input } from '@angular/core';
import { HomeRoutingService } from '../home-routing/home-routing.service';

@Component({
  selector: 'app-scan-instruction',
  templateUrl: './scan-instruction.component.html',
  styleUrls: ['./scan-instruction.component.css'],
})
export class ScanInstructionComponent implements OnInit {
  @Input() autoNextStep;

  constructor(
    private homeRoutingService: HomeRoutingService
  ) { }

  public step: number = 1;

  ngOnInit() {
    document.body.style.cursor = 'auto';
    if (this.autoNextStep) {
      this.doRepeat(1);
    }
  }
  doRepeat(maxStepNum) {
    setTimeout(() => {
      console.log('step scan', this.step);
      this.nextStep();
      if (--maxStepNum >= 0) {
        this.doRepeat(maxStepNum);
      }else{
        setTimeout(()=>{
          this.next();
        },this.autoNextStep * 1000);
      }
    }, this.autoNextStep * 1000);
  }
  next() {
    
    this.homeRoutingService.next(this.constructor.name);
    document.body.style.cursor = 'wait';
  }

  nextStep() {
    this.step += 1;
  }

}
