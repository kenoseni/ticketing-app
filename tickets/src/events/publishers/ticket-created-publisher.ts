import { Channels, TicketCreatedEvent, Publisher } from "@sage-mode/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly channel = Channels.TicketCreated;
}
