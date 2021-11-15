import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; 
@Pipe({
  name: 'myCustomePipe'
})
export class MyCustomePipePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }  
  availablesStates:String[] = ["up", "half", "down", "empty"]; 
  transform(value: unknown, ...args: unknown[]): SafeHtml {
    
    if( (typeof value === "string")  &&  value.toString().match(/^(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2})$/))
      return this._sanitizer.bypassSecurityTrustHtml("<i class='pi pi-calendar-times' style='font-size: 20px; '></i><b>"+value+"</b>");
    if(this.availablesStates.includes(value.toString())){
      switch (value) {
        case 'up':
            return this._sanitizer.bypassSecurityTrustHtml("<i class='pi pi-circle-fill upState' style='font-size: 20px; color: green;' ></i>");
          break;
        case 'down':
            return this._sanitizer.bypassSecurityTrustHtml("<i class='pi pi-circle-fill downState' style='font-size: 20px; color: red;' ></i>");
          break;
        case 'half':
            return this._sanitizer.bypassSecurityTrustHtml("<i class='pi pi-circle-fill halfState' style='font-size: 20px; color: yellow;'></i>");
          break;        
      }
    }
    else  
      return value;
  }

}
