import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', loadComponent: () => import('./features/search/search').then(m => m.Search) },
    { path: 'repo/:owner/:repo', loadComponent: () => import('./features/repo-details/repo-details').then(m => m.RepoDetails) }
];
