const express = require('express');
const Ticket = require('../models/ticket');
const { copyFileSync } = require('fs');
const router = express.Router();

router.post('/', async(req, res)=>{
    try{
        const ticket = new Ticket(req.body)
        await ticket.save() 
        res.status(201).json(ticket);
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
});

router.get('/', async(req,res)=>{
    const tickets = await Ticket.find();
    res.json(tickets);
});

router.put('/:id',async(req, res)=>{
    try{
        const updated = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        )
        res.json(updated)
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

router.delete('/:id',async(req, res)=>{
    try{
        await Ticket.findByIdAndDelete(req.params.id)
        res.json({message:'Deleted'})
    }catch(err){
        res.status(400).json({error:err.message})
    }
})
module.exports=router