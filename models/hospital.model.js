const  mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { collection: 'Hospitals'}); // Name in mongoDB

// Visual config: remove version field and change old field name "_id" by the name "id"
hospitalSchema.method('toJSON', function() {
    // Extract version, id, password and object to the original user schema
    const {__v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Hospital', hospitalSchema);