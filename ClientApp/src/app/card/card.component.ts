import { Component } from '@angular/core';
import { Observable } from 'rxjs';

/* Redux */
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../redux/states/application.state';
/* End Redux */

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
/**
 * Clase de tipo component. Esta clase contiene una card donde se tiene el último turno que pasó, en pantalla
 */
export class CardComponent {
  /**
   * Variable pública donde se obtiene el subscribe de redux
   */
  public applicationState$: Observable<ApplicationState>;

  constructor (
    /**
     * Variable privada donde está el store de redux
     */
    private applicationStore : Store<{application_state : ApplicationState}>
  ) {
    this.applicationState$ = this.applicationStore.pipe(select('application_state'));
  }
}
