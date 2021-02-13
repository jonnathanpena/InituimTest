import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formatDate } from '@angular/common';

/*  Models */
import { Queue } from '../models/Queue';
/* End Models */

/* Providers */
import { QueueProvider } from '../providers/queue.provider';
/* End Providers */

/* Redux */
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../redux/states/application.state';
import { UpdateData } from '../redux/actions/application.action';
/* End Redux */

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Clase de tipo component. Esta clase despliega la lista de los turnos, con un limit 5, obtenidos de Redux
 * También comunica al componente de la tarjeta para que despliegue allí la información del último turno.
 * Lleva el control del tiempo para comparar con las colas pendientes.
 * Finalmente, en base a redux, obtiene el estado de la aplicación y sabe si debe o no refrescar la data
 */
export class ListComponent implements OnInit, OnDestroy {
  /**
   * Variable publica (va al html) de redux para el control del estado de la aplicación
   */
  public applicationState$: Observable<ApplicationState>;
  /**
   * Variable privada que destruye las subscripciones al destruir el componente
   */
  private _onDestroy = new Subject<void>();
  /**
   * Variable privada que realiza los intérvalos de consultas
   */
  private interval = interval(1000);
  /**
   * Variable para la tabla de las colas
   */
  public dataSource : Queue[] = [];
  /**
   * Variable públic donde se maneja el mensaje de error
   */
  public errorMessage : string = '';
  /**
   * Variable tipo `Queue[]` donde están los pendientes por pasar
   */
  private next : Queue[] = [];
  /**
   * Variable subscriber del interval
   */
  private intervalSubscribe : any;
  /**
   * Variable pública para las columnas
   */
  public displayedColumns : string[] = ['Turno', 'Nombre', 'Cola'];

  constructor (
    /**
     * Variable privada donde maneja el `store` de redux de tipo `redux store`
     */
    private applicationStore : Store<{application_state: ApplicationState}>,
    /**
     * Variable privada de tipo `QueueProvider`
     */
    private queueService : QueueProvider
  ) {
    this.applicationState$ = this.applicationStore.pipe(select('application_state'));
  }

  /**
   * Luego de que carga el componente iniciamos los subscribers
   */
  ngOnInit() : void {
    this.applicationState$.pipe(takeUntil(this._onDestroy)).subscribe((data: ApplicationState) => {
      if (data.getAll) {
        this.getQueues();
        return;
      }
      this.dataSource = data.data;
      this.next = data.next;
      if (this.next.length > 0) {
        this.intervalSubscribe = this.interval.subscribe((_: number) => {
          this.compareNexts();
        });
      } else if (this.next.length == 0 && this.intervalSubscribe) {
        this.intervalSubscribe.unsubscribe();
      }
    });
  }

  /**
   * Función que consulta las colas, para luego llamar a redux
   */
  getQueues() : void {
    this.queueService.queue().then((data: {success: boolean, errorMessage: string, data: Queue[]}) => {
      if (data.success) {
        this.applicationStore.dispatch(new UpdateData(data.data));
        this.errorMessage = '';
      } else {
        this.errorMessage = data.errorMessage;
        this.getQueues();
      }
    }).catch(error => console.log(error));
  }

  /**
   * Función comparadora de los pendientes
   */
  compareNexts() : void {
    const now = formatDate(new Date(),'yyyy-MM-dd HH:ii','en_US');
    for (let n of this.next) {
      let newDate = formatDate(new Date(n.turnAt),'yyyy-MM-dd HH:ii','en_US');
      if (now === newDate) {
        this.queueService.queueProcessed(n.id).then((data : { success: boolean, errorMessage : string, data : string }) => {
          this.getQueues();
        }).catch( error => {
          this.getQueues();
        });
      }
    }
  }

  /**
   * Destruimos los subscribers
   */
  ngOnDestroy() : void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
