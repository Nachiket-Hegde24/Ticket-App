const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title:{type:String, require:true},
    description:{type:String,required:true},
    priority:{type:String, default:'Medium'},
    status:{type:String, default:'open'},
    createdBy:{type:String, required:true},
    createdAt:{type:String, default:Date.now}
});

module.exports=mongoose.model('Ticket',ticketSchema);
