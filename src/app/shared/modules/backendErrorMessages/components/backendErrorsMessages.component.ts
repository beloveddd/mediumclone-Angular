import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from '../../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: 'backendErrorsMessages.component.html',
  styleUrls: ['backendErrorsMessages.component.scss'],
})
export class BackendErrorsMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null;

  errorMessages!: string[];

  ngOnInit(): void {
    if (this.backendErrorsProps) {
      this.errorMessages = Object.keys(this.backendErrorsProps).map(
        (name: string) => {
          const messages =
            this.backendErrorsProps && this.backendErrorsProps[name]
              ? this.backendErrorsProps[name].join(', ')
              : '';

          return `${name} ${messages}`;
        }
      );
    }
  }
}
