import React, { useState, useEffect } from "react";
import axios from "axios";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets');
      setTickets(res.data);
    } catch (error) {
      alert('Error in fetching Tickets');
      console.error(error);
    }
  };

  const deleteTickets = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/tickets/${id}`);
        setTickets(prev=>prev.filter(ticket => ticket._id !== id));
    } catch (error) {
      alert('Error in Deleting Tickets');
      console.error(error);
    }
  };

  const updateStatus = async(id,newStatus) => {
    try {
        await axios.put(`http://localhost:5000/api/tickets/${id}`,{status:newStatus});
        setTickets(prev=>prev.map(ticket =>
             ticket._id === id?{...ticket,status:newStatus}:ticket
            ));
    } catch (error) {
      alert('Error in Updating Tickets');
      console.error(error);
    }
  }

  useEffect(()=>{
     fetchTickets();
   },[]);
  

   return(
     <div className="ticket-List">
          <h2>Ticket</h2>
          {tickets.length === 0 && <p>No ticket found</p>}
          {tickets.map(ticket=>(
             <div key={ticket._id} className="ticket-card"> 
               <h3>{ticket.title}</h3>
               <p><strong>Description:</strong>{ticket.desciption}</p>
               <p><strong>priority:</strong>{ticket.priority}</p>
               <p><strong>Status:</strong>{ticket.status}</p>
               <p><strong>created By:</strong>{ticket.createdBy}</p>
               <p><strong>Created At:</strong>{ new Date(ticket.createdAt).toLocaleString }</p>
               <div className="ticket-button">
                  <button onClick={()=> updateStatus(ticket._id,'In Progress')}>In Progress</button>
                  <button onClick={()=> updateStatus(ticket._id,'Resolved')}>Resolved</button>
                  <button className="delete-btn"  onClick={()=> deleteTickets(ticket._id,'')}>Deleted</button>
                </div>
             </div>
            ))
        }
    </div>
   )
}


export default TicketList;