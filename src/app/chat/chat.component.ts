import { DataService } from './../services/data.service';
const moment = require('moment');
import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  data$ = [];
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  autoScroll = true;
  @HostListener('wheel', ['$event'])
  scrollHandler(event) {
    if (
      event.deltaY > 0 &&
      this.myScrollContainer.nativeElement.scrollHeight -
        this.myScrollContainer.nativeElement.scrollTop -
        this.myScrollContainer.nativeElement.clientHeight <
        10
    ) {
      console.log(event);
      this.autoScroll = true;
    } else {
      this.autoScroll = false;
    }
  }

  constructor(private data: DataService) {}

  ngOnInit() {
    this.startPolling();
    this.data.logData$.subscribe(val =>
      this.data$.push(moment().format('h:mm:ss - D MMM') + ': \n' + val + '\n')
    );
  }

  ngAfterViewChecked() {
    if (this.autoScroll) {
      this.scrollToBottom();
    }
  }

  startPolling() {
    this.data.startDataflow();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
