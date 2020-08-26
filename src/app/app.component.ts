import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wishlistCoursera';
  time = new Observable(observer => {
    //Le importa es cuando se llama al metodo
    setInterval(() => observer.next(new Date().toString()), 1000);
    return null;
  });

  constructor(public translate: TranslateService){
    console.log('************ get translation');
    translate.getTranslation('en').subscribe(x => console.log('x: ' + JSON.stringify(x)));
    translate.setDefaultLang('es'); //Ponemos default español
  }

  destinationAdded(d){
    //alert(d.name);
  }
}
