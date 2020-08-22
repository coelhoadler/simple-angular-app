import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  username = 'coelhoadler';

  constructor(
    public appService: AppService
  ) {
    this.appService.username = this.username;
   }

   ngOnInit() {
    this.appService.username = this.username;
   }

  callAPI() {
    this.appService.getGitProjects();
  }

}
