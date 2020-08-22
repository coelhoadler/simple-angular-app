import { Injectable, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import {
    map,
    catchError,
    shareReplay
} from 'rxjs/operators'

interface GitProject {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    forks: number;
}

@Injectable({
    providedIn: 'root'
})
export class AppService {

    projects$: Observable<GitProject[]>;

    username: string;

    constructor(private http: HttpClient) { }

    public getGitProjects(): void {
        const gitBaseUrl = `https://api.github.com/users/${this.username}/repos?per_page=100`;

        this.projects$ = this.http.get<GitProject[]>(gitBaseUrl).pipe(
            map(projects =>
                projects.filter(project => project.name.length > 3)
            ),
            shareReplay({ bufferSize: 1, refCount: true, })
        ) as Observable<GitProject[]>
    }
}