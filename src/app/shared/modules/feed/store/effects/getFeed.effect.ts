import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { FeedService } from '../../feed.service';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from '../actions/getFeed.action';

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({ feed });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFeedFailureAction());
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
