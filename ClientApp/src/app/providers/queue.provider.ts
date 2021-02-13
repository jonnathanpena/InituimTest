import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URLProvider } from './url.provider';

import { Client } from '../models/Client';
import { Queue } from '../models/Queue';

@Injectable({
  providedIn: 'root',
})
export class QueueProvider {

  constructor (
    private http : HttpClient,
    private urlProvider : URLProvider
  ) {}

  public queue() : Promise<{ success: boolean, errorMessage : string, data : Queue[] }> {
    return this.http.get<{ success: boolean, errorMessage : string, data : Queue[] }>(`${this.urlProvider.queue()}/All`).toPromise();
  }

  public getTurn(client : Client) : Promise<{ success: boolean, errorMessage : string, data : number }> {
    return this.http.post<{ success: boolean, errorMessage : string, data : number }>(`${this.urlProvider.queue()}/GetTurn`, client).toPromise();
  }

  public queueProcessed(id : number) : Promise<{ success: boolean, errorMessage : string, data : string }> {
    return this.http.delete<{ success: boolean, errorMessage : string, data : string }>(`${this.urlProvider.queue()}/QueueProcessed/${id}}`).toPromise();
  }
}
