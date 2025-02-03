'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";



const TicketForm = ({ticket}) => {

    const EDITMODE = ticket._id === "new" ? false : true;

    const router = useRouter();

    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        progress: 0,
        status: "not started",
        category: "Hardware Problem",
    };

    if(EDITMODE) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["progress"] = ticket.progress;
        startingTicketData["status"] = ticket.status;
        startingTicketData["category"] = ticket.category;
    }
    
    const [formData, setFormData] = useState(startingTicketData);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(EDITMODE) {
            const res = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({ formData }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok) {
                throw new Error("Failed to create ticket");
            }

        } else {
            const res = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({ formData }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok) {
                throw new Error("Failed to create ticket");
            }
        }

        router.refresh();
        router.push("/");

    }


  return (
    <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2" method="POST">
            <h3>{ EDITMODE ? "Update your ticket" : "Create your ticket"}</h3>
            <label>Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label>Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
            />

            <label>Category</label>
            <select onChange={handleChange} name="category" value={formData.category}>
                <option value="Hardware Problem">Hardware Problem</option>
                <option value="Software Problem">Software Problem</option>
                <option value="Project">Project</option>
            </select>

            <label>Priority</label>
            <div>
            <input
                id="priority-1"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={1}
                checked={formData.priority == 1}
            />
            <label>1</label>
            <input
                id="priority-2"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={2}
                checked={formData.priority == 2}
            />
            <label>2</label>
            <input
                id="priority-3"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={3}
                checked={formData.priority == 3}
            />
            <label>3</label>
            <input
                id="priority-4"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={4}
                checked={formData.priority == 4}
            />
            <label>4</label>
            <input
                id="priority-5"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={5}
                checked={formData.priority == 5}
            />
            <label>5</label>
            </div>

            <label>Progress</label>
            <input
                type="range"
                id="progress"
                name="progress"
                value={formData.progress}
                min={0}
                max={100}
                onChange={handleChange}
            />

            <label>Status</label>
            <select onChange={handleChange} name="status" value={formData.status}>
                <option value="not started">Not Started</option>
                <option value="started">Started</option>
                <option value="done">Done</option>
            </select>

            <input type="submit" value={ EDITMODE ? "Update Ticket" : "Create Ticket"} className="btn" />
        </form>
    </div>
  )
}

export default TicketForm