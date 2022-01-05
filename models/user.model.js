const  mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Visual config: remove version field and change old field name "_id" by the name "uid"
userSchema.method('toJSON', function() {
    // Extract version, id, password and object to the original user schema
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = mongoose.model('User', userSchema);