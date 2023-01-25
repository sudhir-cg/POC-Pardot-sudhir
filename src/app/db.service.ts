import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(  private http: HttpClient) { }

  runStoredProcedure() {
    return this.http.post<any>(
       " https://igcnx-amnis-dev.azurewebsites.net/cd-run-stored-procedure",
    {
      procedure: "dbo.sp_SavedQueries_GET"
    }
    );
  }
}
