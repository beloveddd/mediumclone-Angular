import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GlobalFeedComponent } from './components/globalFeed.component';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { PopularTagsModule } from '../shared/modules/popularTags/popularTags.module';
import { FeedToggleModule } from '../shared/modules/feedToggle.module.ts/feedToggle.module';

const routes: Routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedToggleModule,
  ],
  declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
