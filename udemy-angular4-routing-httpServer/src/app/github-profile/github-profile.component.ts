import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // getting actuall parameters without observable
    // usecase: if you are navigating throw different component
    // you don't need observable
    this.route.snapshot.paramMap.get('id');

    // getting parameters with obsrvable
    // usecase : if you want to navigate throw the same component
    // you need observable to get the parameters whatever
    // the parameters are changed
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
    });
  }
  submit() {
    // required params
    // this.router.navigate(['/followers',requiedParam1,requiedParam2])
    // optional params
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest' }
    });

  }
}
