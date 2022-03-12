import { Channels, TicketUpdatedEvent, Publisher } from "@sage-mode/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly channel = Channels.TicketUpdated;
}
