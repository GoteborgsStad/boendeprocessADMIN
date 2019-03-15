import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { File } from '../../_models/file.model';
import { NotificationService } from './../../_services/notification.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
})
export class ImageFormComponent implements OnInit {

  @Input() public imageUrl: string;
  @Input() public showChange: boolean = true;
  @Output() public inputImageEmitter: EventEmitter<File> = new EventEmitter();
  @Output() public deleteImageEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private _notificationService: NotificationService) { }

  public ngOnInit() {
  }

  public reflectDelete() {
    this.imageUrl = null;
    this.deleteImageEmitter.emit(this.imageUrl);
  }

  public readUrl(event: any) {
    if (event.target.files[0].size / 1048576 > 2) {
      this._notificationService.error_notification.next('Bildfilen får inte vara större än 2MB');
    } else {
      const imageData: File = new File();
      imageData.original_name = event.target.value.replace(/.*[\/\\]/, '').split('.').shift();

      if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event2: any) => {
        imageData.base64 = event2.target.result;
        this.inputImageEmitter.emit(imageData);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
    }

  }

  public takeAwayPictureShouldBeVisible() {
    return this.imageUrl !== null && typeof this.imageUrl !== 'undefined' && this.imageUrl.length > 0;
  }

}
