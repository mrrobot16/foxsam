import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'repo-browser',
  templateUrl: './repo-browser.component.html',
  styleUrls: ['./repo-browser.component.css']
})
export class RepoBrowserComponent {

  constructor(private router: Router, private github: GithubService) {
  }

  searchForOrg(orgName: string) {
    var github =  this.github.getOrg(orgName)
      .subscribe(({name}) => {
        console.log("name: ",name);
        this.router.navigate(['/github', orgName]);
      });
      console.log("searchForOrg: ", typeof this.github.getOrg(orgName));
  }

}
