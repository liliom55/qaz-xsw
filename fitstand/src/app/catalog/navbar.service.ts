import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class NavbarService {

  private toggleSource = new Subject<void>();
  toggle$ = this.toggleSource.asObservable();

  toggleNavbar() {
    this.toggleSource.next();
  }


}
