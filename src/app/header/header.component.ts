import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() headerAction = new EventEmitter();
  headers = [
    {
      id: 'home',
      display: "Home",
      href: "",
      disable: false,
      active: true
    },
    {
      id: 'aboutMe',
      display: "About Me",
      href: "",
      disable: false,
      active: false
    },
    {
      id: 'contact',
      display: "Contact",
      href: "",
      disable: false,
      active: false
    },
    {
      id: 'resume',
      display: "Resume",
      href: "",
      disable: true,
      active: false
    },
  ]

  onMouseEnter($event){
    this.headerAction.emit($event)
  }

  onMouseLeave(){
    this.headerAction.emit(null)
  }

  selectionChanged(event, id){
    this.headers.forEach(header => {
      header.active = header.id === id;
    })
    console.log(event);
  }
}
