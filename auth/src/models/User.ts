import mongoose from "mongoose";
import { Password } from "../utils/password";

// An interface that describes the properties
// that are required to create a new user

interface UserAttriButes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttriButes): UserDocument;
}

// An interface that describes the properties
// that a user document has
interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userShema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userShema.statics.build = (attrs: UserAttriButes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDocument, UserModel>("User", userShema);

export { User };
