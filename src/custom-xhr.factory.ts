import { Injectable } from '@angular/core';
import { XhrFactory } from '@angular/common';

@Injectable()
export class CustomXhrFactory implements XhrFactory {
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}
