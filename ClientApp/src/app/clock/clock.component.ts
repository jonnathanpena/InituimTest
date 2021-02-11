import { Component, OnInit, OnDestroy } from '@angular/core';

Component({
  selector: 'app-click',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})

/**
 * Clase de tipo component
 * @remarks
 * Esta clase despliega el reloj de la aplicación y controla el tiempo de la misma, para reconocer el siguiente turno
 */
export class ClockComponent implements OnInit, OnDestroy {
  /**
   * Variable de tipo `string` que almacena la hora a presentarse en el reloj
   */
  public hours: string;
  /**
   * Variable de tipo `string` que almacena los minutos a presentarse en el reloj
   */
  public minutes: string;
  /**
   * Variable de tipo `string` que almacena los segundos a presentarse en el reloj
   */
  public seconds: string;
  /**
   * Variable de tipo `function` que activa la acción del reloj
   */
  private timerId = null;

  constructor () {}

  /**
	 * Función de tipo `void`
	 * @remarks
	 * Método propio de Angular para ejecutar las funciones una vez se crea el componente
	 */
  ngOnInit() : void {
    this.setCurrentTime();
    this.timerId = this.updateTime();
  }

  /**
		* Función de tipo `void`
		* @remarks
		* Consulta el timestamp actual
		*/
  private setCurrentTime() : void {
    const time = new Date(Date.now());
    this.hours = this.leftPadZero(time.getHours());
    this.minutes = this.leftPadZero(time.getMinutes());
    this.seconds = this.leftPadZero(time.getSeconds());
  }

  /**
		* Función de tipo `void`
		* @remarks
		* Activa la función del intérvalo para el reloj
		*/
  private updateTime() : void {
    setInterval(() => {
      this.setCurrentTime();
    }, 1000);
  }

  /**
		* Función de tipo `string`
		* @remarks
		* Utiliza el template string y la triada para retornar un valor con cero agregado
		* @param value valor numérico de la hora, minuto o segundo
		* @returns Retorna `string` de la hora, minuto o segundo consultado, completado con ceros a la izquerda
		*/
  private leftPadZero(value: number) : string {
    return value < 10 ? `0${value}` : value.toString();
  }

  /**
	 * Función de tipo void
	 * @remarks
	 * Método propio de Angular para destruir los estados de la aplicación
	 */
  ngOnDestroy() : void {
    clearInterval(this.timerId);
  }

}
