const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const userSchema = new Schema(
  {
    userId: {
         type: String, 
         unique: true,
          required: true 
        },

    email: {
         type: String, 
         required: true, 
         unique: true 
        },

    active: {
         type: Boolean, 
         default: false 
        },

    password: {
         type: String, 
         required: true 
        },

    resetPasswordToken: {
         type: String,
          default: null
         },

    resetPasswordExpires: { 
        type: Date,
         default: null
         },
    emailToken: {
             type: String,
              default: null 
            },

    emailTokenExpires:{
         type: Date,
          default: null 
        },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
  );
  const User = mongoose.model("user", userSchema);
  module.exports = User;


module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // 10 rounds
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Comparison failed", error);
  }
};