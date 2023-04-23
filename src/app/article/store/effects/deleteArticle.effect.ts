import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import {
  deleteArticleAction,
  deleteArticleFailureAction,
  deleteArticleSuccessAction,
} from '../actions/deleteArticle.action';

@Injectable()
export class DeleteArticleEffect {
  deleteArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({ slug }) => {
        if (slug) {
          return this.articleService.deleteArticle(slug).pipe(
            map(() => {
              return deleteArticleSuccessAction();
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(deleteArticleFailureAction());
            })
          );
        } else {
          return of();
        }
      })
    );
  });

  redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router
  ) {}
}
