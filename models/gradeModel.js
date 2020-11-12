export default (mongoose) => {
    const schema = mongoose.Schema({

        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true
        },
        lastModified: {
            type: Date,
            default: Date.now,
            required: true,
        },

    });

    const Grade = mongoose.model('grades', schema);
    return Grade;
};