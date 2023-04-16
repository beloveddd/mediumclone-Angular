import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { FeedComponent } from './components/feed.component';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers';
import { FeedService } from './feed.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', reducer),
  ],
  declarations: [FeedComponent],
  providers: [FeedService],
  exports: [FeedComponent],
})
export class FeedModule {}
