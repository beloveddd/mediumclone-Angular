import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { GetArticleEffect } from './store/effects/getArticle.effect';
import { reducer } from './store/reducers';
import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ErrorMessageModule } from '../shared/modules/errorMessage/errorMessage.module';
import { ArticleComponent } from './components/article.component';
import { TagListModule } from '../shared/modules/tagList/tagList.module';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect]),
    StoreModule.forFeature('article', reducer),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    TagListModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService],
  exports: [ArticleComponent],
})
export class ArticleModule {}
