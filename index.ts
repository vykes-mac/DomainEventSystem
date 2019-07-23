// Import stylesheets


import './style.css';
import { IDomainEvent } from './mediatZ/IDomainEvent';
import { IDomainEventHandler } from './mediatZ/IDomainEventHandler';
import { MediatZ } from './mediatZ/MediatZ';
import { INotificationHandler } from './mediatZ/INotificationHandler';



export class DomainEvent implements IDomainEvent {
  name = "hello";
  message = "world";
}

export class EventHandler implements IDomainEventHandler<DomainEvent> {

  constructor() {
    MediatZ.register(DomainEvent.prototype, this);
  }

 Handle(domainEvent : DomainEvent): Promise<void> {
   console.log(domainEvent.message);
   return null;
 }

}

export class EventHandler1 implements IDomainEventHandler<DomainEvent> {

  constructor() {
    MediatZ.register(DomainEvent.prototype, this);
  }

 Handle(domainEvent : DomainEvent): Promise<void> {
   console.log(domainEvent.message.concat(' hello'));
   return null;
 }

}

const handler = new EventHandler();
//const handler2 = new EventHandler1();

MediatZ.Publish(new DomainEvent());


// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;