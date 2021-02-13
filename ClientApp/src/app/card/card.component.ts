import { Component, OnDestroy } from '@angular/core';
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
  public notification : boolean = false;

  constructor (
    /**
     * Variable privada donde está el store de redux
     */
    private applicationStore : Store<{application_state : ApplicationState}>,
  ) {
    this.applicationState$ = this.applicationStore.pipe(select('application_state'));
    this.applicationState$.pipe(takeUntil(this._onDestroy)).subscribe((data : ApplicationState) => {
      if (this.actualPosition != data.last.position) {
        this.playAudio();
        this.notification = true;
        this.actualPosition = data.last.position;
        setTimeout(() => {
          this.notification = false;
        }, 2000);
      }
    });
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/got-it-done.mp3";
    audio.load();
    audio.play();
  }

  ngOnDestroy() : void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
