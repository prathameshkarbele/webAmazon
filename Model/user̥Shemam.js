import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const secretKey = process.env.KEY;

// console.log("Secret Key:", secretKey);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not vlid Email Adress");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// token genarate
userSchema.methods.generateAuthtokenn = async function(){
  try {
    // console.log("All Environment Variables:", process.env);
    const secretKey = process.env.KEY;
    // console.log("Secret Key:", secretKey);


    const token_one = jwt.sign({ _id: this._id }, secretKey);
    this.tokens = this.tokens.concat({token:token_one});
    await this.save();
    return token_one;
  } catch (error) {
    console.log(error)
  }
}
// console.log("Secret Key:", secretKey);

userSchema.methods.addcartdata = async function(cart){
  try {
     this.carts = this.carts.concat(cart);
     await this.save();
     return this.carts;
  } catch (error) {
    console.log(error)
  }
}
export const USER = new mongoose.model("USER", userSchema);
