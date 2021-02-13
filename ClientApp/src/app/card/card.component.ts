import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class CardComponent implements OnDestroy {
  /**
   * Variable pública donde se obtiene el subscribe de redux
   */
  public applicationState$: Observable<ApplicationState>;
  /**
   * Variable privada para conocer la posición actual y ejecutar un sonido
   */
  private actualPosition : number = 0;
  /**
   * Variable privada para destrucción del subscribe cuando el componente se destruya
   */
  private _onDestroy = new Subject<void>();
  @ViewChild('audioOption', { static: false }) audioPlayerRef: ElementRef;

  constructor (
    /**
     * Variable privada donde está el store de redux
     */
    private applicationStore : Store<{application_state : ApplicationState}>,
  ) {
    this.applicationState$ = this.applicationStore.pipe(select('application_state'));
    this.applicationState$.pipe(takeUntil(this._onDestroy)).subscribe((data : ApplicationState) => {
      if (this.actualPosition != data.last.position) {
        this.actualPosition = data.last.position;
        if (this.audioPlayerRef) {
          this.audioPlayerRef.nativeElement.play();
        }
      }
    });
  }

  ngOnDestroy() : void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
