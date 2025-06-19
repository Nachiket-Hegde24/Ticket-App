import axios from 'axios';
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import react, { useState } from "react";
import "./TicketForm.css";



function TicketForm(){

    const[form,setForm] = useState({
            title:'',
            description:'',
            priority:'',
            createdBy:'',
    });

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const hasFormSubmit = async(e)=>{
        e.preventDefault();
        try{
         await axios.post('http://localhost:5000/api/tickets',form);
         alert('Ticket Created');
         setForm({title:'',description:'',priority:'Medium',createdBy:''});
         window.dispatchEvent(new Event('TicketCreated'));
       }

       catch(error)
        {
         alert('error creating ticket. Please try again')
         console.error(error);
        }
    }
  
      
    return(
        <form className="ticket-form" onSubmit={hasFormSubmit}>
            <div className='heading'>Raise Issues</div>
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <select name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input name="createdBy" placeholder="Your Name" value={form.createdBy} onChange={handleChange} required />
            <button type="submit">Create Ticket</button>
        </form>
    )
}

export default TicketForm;