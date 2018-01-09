import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { error } from 'util';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAll()
      .subscribe(posts => this.posts = posts);
  }
  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    this.posts.splice(0, 0, post);
    input.value = '';
    this.postService.add(post)
      .subscribe(
      newPost => {
        post['id'] = newPost.id;
        // this.posts.push(post); // add to end of the list
        // or
        // this.posts.splice(0, 0, post); // add to the first of the list
      },
      (error: AppError) => {
        this.posts.splice(0, 1); // if there is an error remove the added post from the list
        if (error instanceof BadRequestError) {
          alert('Bad request error');
        } else {
          throw error;
        }
      });
  }
  updatePost(post) {
    this.postService.update(post)
      .subscribe(newPost => {
        this.posts.map(x => x.id === newPost.id ? newPost : x); // find obj and update it
      });
  }
  deletePost(post) {
    // delete from posts
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);


    this.postService.delete(post)
      .subscribe(() => {
        // // delete from posts
        // const index = this.posts.indexOf(post);
        // this.posts.splice(index, 1);
      },
      (error: AppError) => {
        this.posts.splice(index, 0, post);
        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          this.postService.errorHandle(error);
        }
      }
      );
  }
}
