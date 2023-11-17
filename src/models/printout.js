const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const printoutSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    display_name: {
        type: String,
        required: true,
    },
    user_uuid: {
        type: String,
        required: true,
    },
    total_pages: {
        type: Number,
        required: true,
    },
    copies: {
        type: Number,
        required: true,
    },
    pdf: {
        type: Buffer
    }
}, {
    timestamps: true
})

const Printout = new mongoose.model("Printout", printoutSchema);

module.exports = Printout;