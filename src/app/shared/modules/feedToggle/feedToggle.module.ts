import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { FeedToggleComponent } from './components/feedToggle.component';

@NgModule({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  declarations: [FeedToggleComponent],
  exports: [FeedToggleComponent],
})
export class FeedToggleModule {}
