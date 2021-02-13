import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class URLProvider {
  private domain: String = 'https://localhost:44330/';

  public queue() : String {
    return `${this.domain}/api/Queue`;
  }
}
