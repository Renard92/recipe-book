import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  public static DEFAULT_CURRENCY = '€';

  private currency = CurrencyPipe.DEFAULT_CURRENCY;

  transform(value: number, currency: string = this.currency, decimal: number = 1): string {
    return value.toFixed(decimal) + ' ' + currency;
  }

}
