import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ArticleInterface } from '../../shared/types/article.interface';
import {
  articleSelector,
  isErrorSelector,
  isLoadingSelector,
} from '../store/selectors';
import { currentSelector } from '../../auth/store/selectors';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { getArticleAction } from '../store/actions/getArticle.action';
import { deleteArticleAction } from '../store/actions/deleteArticle.action';

@Component({
  selector: 'mc-article',
  templateUrl: 'article.component.html',
  styleUrls: ['article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug!: string | null;
  article!: ArticleInterface | null;
  articleSub$!: Subscription;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  isAuthor$!: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(isErrorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!currentUser || !article) {
            return false;
          }

          return currentUser.username === article.author.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSub$ = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  ngOnDestroy(): void {
    this.articleSub$.unsubscribe();
  }

  fetchData(): void {
    if (!this.slug) {
      return;
    }

    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({ slug: this.slug }));
  }
}
