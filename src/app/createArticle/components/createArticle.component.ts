import { Component } from '@angular/core';

import { ArticleInputInterface } from '../../shared/types/articleInput.interface';

@Component({
  selector: 'mc-create-article',
  templateUrl: 'createArticle.component.html',
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: ['', '', ''],
  };

  onSubmit($event: ArticleInputInterface) {}
}
