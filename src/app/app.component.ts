import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import Reveal from 'reveal.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

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
    const cursorOuter = this.cursorLarge.nativeElement;
    const cursorInner = this.cursorSmall.nativeElement;
    this.isStuck = false;
    let mouse = {
      x: -100,
      y: -100,
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

  initializeInitalCursor() {
    const cursorOuter = this.cursorLarge.nativeElement;
    this.cursorOuterOriginalState = {
      width: cursorOuter.getBoundingClientRect().width,
      height: cursorOuter.getBoundingClientRect().height,
    };
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
