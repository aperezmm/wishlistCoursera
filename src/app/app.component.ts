import { Component } from '@angular/core';
import { Observable } from 'rxjs';

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
  });
}
