import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  public comments: any;
  public postTitle: any;
  private localParams: any;

  constructor(private route: ActivatedRoute, private _http: HttpService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.localParams = params;
      this.postTitle = params.postTitle;
      console.log(this.localParams);
    });

    this._http
      .api(
        `https://jsonplaceholder.typicode.com/comments?postId=${this.localParams.postId}`
      )
      .subscribe((data) => {
        this.comments = data;
      });
  }

  trimPostBody(postBody: String) {
    return `${postBody.substring(0, 12)}...`;
  }
}
