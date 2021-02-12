import { Component } from '@angular/core';

export interface PeriodicElement {
  client_name: string;
  position: number;
  queu_name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, client_name: 'Hydrogen', queu_name: 'H'},
  {position: 2, client_name: 'Helium', queu_name: 'He'},
  {position: 3, client_name: 'Lithium',queu_name: 'Li'},
  {position: 4, client_name: 'Beryllium', queu_name: 'Be'},
  {position: 5, client_name: 'Boron', queu_name: 'B'}
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Clase de tipo component. Esta clase despliega la lista de los turnos, con un limit 5, obtenidos de Redux
 */
export class ListComponent {
  /**
   * Variable de tipo `string[]`, con el nombre referencial de las columnas
   */
  public displayedColumns: string[] = ['Turno', 'Nombre', 'Cola'];
  /**
   *
   */
  public dataSource = ELEMENT_DATA;

  constructor () {}

}
