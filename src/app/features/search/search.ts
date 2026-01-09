import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GithubService } from '../../core/services/github-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {


  searchForm: FormGroup = new FormGroup({
    query: new FormControl('angular'),
    language: new FormControl(''),
    sort: new FormControl('stars'),
  });

  githubService = inject(GithubService);
  router = inject(Router);

  repos = signal<any[]>([]);
  loading = signal<boolean>(false);


  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    this.loading.set(true);

    const { query, language, sort } = this.searchForm.value;

    this.githubService.searchRepositories(query, language, sort).subscribe({
      next: (response) => {
        this.repos.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching repositories:', error);
        this.loading.set(false);
      },
    });
  }

  onRepoSelect(repo: any) {
    this.router.navigate(['/repo', repo.owner.login, repo.name]);
  }
}
