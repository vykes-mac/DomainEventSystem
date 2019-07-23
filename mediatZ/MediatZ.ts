import { IDomainEventHandler } from './IDomainEventHandler';
import { IMediatZ } from './IMediatZ';
import { IDomainEvent } from './IDomainEvent';

export abstract class MediatZ implements IMediatZ {
  private static domainEventHandlers: Map<string, IDomainEventHandler[]> = new Map<string, IDomainEventHandler[]>();


  public static async Publish(event: IDomainEvent) {
    if(event === null) {
      throw new Error('event cannot be null');
    }
 
     MediatZ.PublishEvent(event);
  }

  private static PublishEvent(event: IDomainEvent) {
    const name = event.constructor.name;
    const handlers = MediatZ.domainEventHandlers.get(name);
    handlers.forEach(handler => handler.Handle(event));
  }

  public static register(event: IDomainEvent, handler: IDomainEventHandler) {
    const eventName = event.constructor.name;
    const eventExist = MediatZ.domainEventHandlers.get(eventName);

    if(eventExist) {
      eventExist.push(handler)
      MediatZ.domainEventHandlers.set(eventName, eventExist);
    } else {
      MediatZ.domainEventHandlers.set(eventName,[handler]);
    }
  }
}