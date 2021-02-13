import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';

/* SnackBar */
import { MatSnackBar } from '@angular/material/snack-bar';
/* End SnackBar */

/* Models */
import { Client } from '../../models/Client';
/* End Models */

/* Providers */
import { QueueProvider } from '../../providers/queue.provider';
/* End Providers */

/* Redux */
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../redux/states/application.state';
import { ReloadData } from '../../redux/actions/application.action';
/* End Redux */

@Component({
  selector: 'app-turn-generate',
  templateUrl: './turn-generate.component.html',
})

/**
 * Calse TurnGenerateComponent. Contiene el BottomSheet para la asignación de turno
 */
export class TurnGenerateComponent {
  /**
   * Variable públic para el manejo del formulario
   */
  public turnForm: FormGroup;

  constructor(
    /**
     * Variable privada que contiene el constructor del formulario
     */
    private formBuilder: FormBuilder,
    /**
     * Variable privada que autocontiene el componente para su cerrado inesperado
     */
    private _bottomSheetRef: MatBottomSheetRef<TurnGenerateComponent>,
    /**
     * Variable privada donde está el servicio de crear turno desde el proveedor
     */
    private queueService : QueueProvider,
    /**
     * Variable privada para el snackBar
     */
    private _snackBar: MatSnackBar,
    /**
     * Variable privada donde maneja el `store` de redux de tipo `redux store`
     */
    private applicationStore : Store<{application_state: ApplicationState}>
  ) {
    this.turnForm = this.createForm()
  }

  /**
   * Construye el formulario
   */
  createForm() : FormGroup {
    return this.formBuilder.group({
      clientIdentification: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern('[0-9]*')])],
      clientName: ['', Validators.compose([Validators.required, Validators.maxLength(300)])],
    });
  }

  /**
   * Cierra el bottomsheet
   */
  closeButtonSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  /**
   * Acción que se ejecuta en el onSubmit() del formulario, llama al servicio para crear un turno
   * @param event tipo mouse click o enter, para prevenir propagaciones inmediatas y default
   */
  create(event: MouseEvent) : void {
    event.preventDefault();
    event.stopImmediatePropagation();
    const { clientIdentification,  clientName } = this.turnForm.value;
    const client : Client = { clientIdentification, clientName };
    this.queueService.getTurn(client).then((data : { success: boolean, errorMessage : string, data : number }) => {
      this.openSnackBar(`Turno asignado ${data.data}`, '');
      this.applicationStore.dispatch(new ReloadData(true));
      this.closeButtonSheet();
    }).catch(error => {
      this.openSnackBar(`Ocurrió un error ${error.message}`, '');
      this.closeButtonSheet();
    });
  }

  /**
   * Función que notifica con el snackbar
   */
  openSnackBar(message: string, action: string) : void {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
