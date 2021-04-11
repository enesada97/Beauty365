import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
   return this.http.get(environment.apiUrl + '/translates/gettranslatesbylang?lang='+lang,{responseType:"json"});
  }
}
