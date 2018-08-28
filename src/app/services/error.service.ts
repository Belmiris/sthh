import { Injectable, EventEmitter } from '@angular/core';
import { NameValue } from 'src/app/models/name-value.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorNames = new EventEmitter<NameValue[]>();
  errorAny = new EventEmitter<any>();

  constructor() { }

  public throwNamed(errors: NameValue[]) {
    this.errorNames.emit(errors);
  }

  public throwAny(error: any) {
    this.errorAny.emit(error);
  }
}
