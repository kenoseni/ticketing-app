import mongoose from "mongoose";

interface TicketAttriButes {
  title: string;
  price: number;
  userId: string;
}

interface TicketDocument extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDocument> {
  build(attrs: TicketAttriButes): TicketDocument;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);
ticketSchema.statics.build = (attrs: TicketAttriButes) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
  "Ticket",
  ticketSchema
);

export { Ticket };
