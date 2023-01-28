import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { CursorComponent } from './cursor/cursor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('customCursor') customCursor : CursorComponent;

  headerAction($event){
    if($event){
      this.customCursor.updateOuterCursorSize($event);
    }
    else {
      this.customCursor.resetOuterCursorSize();
    }
  }
}
