import {Observable} from 'rxjs/index';

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
