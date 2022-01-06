const  mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { collection: 'Doctors'}); // Name in mongoDB

// Visual config: remove version field and change old field name "_id" by the name "uid"
doctorSchema.method('toJSON', function() {
    // Extract version, id, password and object to the original user schema
    const {__v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = mongoose.model('Doctor', doctorSchema);