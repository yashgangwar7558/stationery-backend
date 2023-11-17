const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

// to hash the password before storing it for security
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(this.password, saltRounds);
            this.password = hashedPassword;
        }
    } catch (error) {
        next(error);
    }
});

const Users = new mongoose.model("Users", userSchema);

module.exports = Users;