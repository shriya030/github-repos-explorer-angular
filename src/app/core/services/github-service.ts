import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  http = inject(HttpClient);

  searchRepositories(query: string, language: string, sort: string): Observable<any> {
    let q = query
    if (language) {
      q += `+language:${language}`;
    }
    return this.http.get(`${BASE_URL}/repositories`, { params: { q, sort, order: 'desc', per_page: 20 } });
  }
}
