import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {
  

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);    
    if( (typeof value === "string")  &&  value.toString().match(/^(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2})$/))
      return "<b>"+value+"</b>";
    else  
      return value;
  }

}
