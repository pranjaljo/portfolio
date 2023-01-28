import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent {
  @ViewChild('cursorSmall') private readonly cursorSmall: ElementRef;
  @ViewChild('cursorLarge') private readonly cursorLarge: ElementRef;
  @ViewChildren('cursorFollower') private readonly cursorFollower: ElementRef;
  @HostListener('document:mousemove', ['$event']) mouseMove(e) {
    this.updateCursorPosition(e);
    this.updateFollowerPosition(e)
  };
  @HostListener('document:mousedown', ['$event']) mouseDown(e) { this.updateInnerCursorSize(2) };
  @HostListener('document:mouseup', ['$event']) mouseUp(e) { this.updateInnerCursorSize(1) };

  isStuck;
  cursorOuterOriginalState;
  readonly followerCount = 5;


  ngAfterViewInit() {
    this.initializeInitalCursor();
    this.setFollowerSize();
  }

  initializeInitalCursor() {
    const cursorOuter = this.cursorLarge.nativeElement;
    this.cursorOuterOriginalState = {
      width: cursorOuter.getBoundingClientRect().width,
      height: cursorOuter.getBoundingClientRect().height,
    };
  }

  updateCursorPosition(e) {
    gsap.set(this.cursorSmall.nativeElement, {
      x: e.x,
      y: e.y,
    });
    if (!this.isStuck) {
      gsap.to(this.cursorLarge.nativeElement, {
        duration: 0.15,
        x: e.x - this.cursorOuterOriginalState.width / 2,
        y: e.y - this.cursorOuterOriginalState.height / 2,
      });
    }
  }

  updateFollowerPosition(e) {
    const followers = this.cursorFollower['_results'].map(x => x.nativeElement)
    gsap.to(followers, {
      stagger: 0.08,
      x: e.x,
      y: e.y,
    });
  }

  updateInnerCursorSize(scale) {
    gsap.to(this.cursorSmall.nativeElement, 0.15, {
      scale
    });
    const followers = this.cursorFollower['_results'].map(x => x.nativeElement)
    gsap.to(followers, {
      scale
    });
  }

  updateOuterCursorSize(e, ) {
    this.isStuck = true;
    const targetBox = e.currentTarget.getBoundingClientRect();
    gsap.to(this.cursorLarge.nativeElement, 0.2, {
      borderRadius: 0,
      x: targetBox.left,
      y: targetBox.top + window.scrollY,
      width: targetBox.width,
      height: targetBox.height,
      //height: e.currentTarget.className === 'inner-nav' ? '175px' : targetBox.height,
      //backgroundColor: "transparent",
    });
  }

  resetOuterCursorSize() {
    this.isStuck = false;
    gsap.to(this.cursorLarge.nativeElement, 0.2, {
      width: this.cursorOuterOriginalState.width,
      height: this.cursorOuterOriginalState.height,
      borderRadius: "50%",
    });
  }

  setFollowerSize() {
    let prev = this.cursorSmall.nativeElement;
    const followers = this.cursorFollower['_results'];
    followers.forEach((follower) => {
      const rect = prev.getBoundingClientRect();
      gsap.set(follower.nativeElement, {
        width: rect.width * 0.80,
        height: rect.height * 0.80
      })
      prev = follower.nativeElement;
    })
  }
}
