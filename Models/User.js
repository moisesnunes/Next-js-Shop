import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Por favor digite seu nome.",
    },
    email: {
      type: String,
      required: "Por favor digite seu e-mail.",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: "Por favor digite uma senha.",
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
