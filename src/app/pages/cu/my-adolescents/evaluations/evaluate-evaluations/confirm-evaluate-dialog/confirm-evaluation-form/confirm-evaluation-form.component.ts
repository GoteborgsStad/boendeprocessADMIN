import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirm-evaluation-form',
  templateUrl: './confirm-evaluation-form.component.html',
})
export class ConfirmEvaluationFormComponent implements OnInit {@Input() public assignmentId: number;
  @Output() public confirmEvaluationEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() public abortConfirmationEmitter: EventEmitter<any> = new EventEmitter<any>();
  public confirmForm: FormGroup;

  // tslint:disable-next-line
  private submitted: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    this.confirmForm = this._formBuilder.group({ });
  }

  public confirmSubmission() {

  }
}
