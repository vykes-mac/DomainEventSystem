abstract class IDomainEvent {}

// abstract class Observable<T extends IDomainEvent> {
//   Observable() {
//     DomainEvents.registerHandler(T.toString(), this);
//   }
// }

abstract class IDomainEventHandler<T extends IDomainEvent> {
  IDomainEventHandler() {
    DomainEvents.registerHandler(T, this);
  }
  Future Handle(T event);
}

class DomainEvents {
  static final Map<Type, List<IDomainEventHandler>> _events = {};

  static Future Publish(IDomainEvent event) async {
    var handlers = _events[event.runtimeType];
    return handlers.forEach((h) => h.Handle(event));
  }

  static void registerHandler(Type event, IDomainEventHandler handler) {
    _events.putIfAbsent(event, () => []);
    _events[event].add(handler);
  }
}
