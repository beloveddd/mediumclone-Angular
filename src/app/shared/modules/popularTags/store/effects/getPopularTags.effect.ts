import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from '../actions/getPopularTags.action';
import { PopularTagsService } from '../../services/popularTags.service';
import { PopularTagType } from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  getPopularTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}
}
