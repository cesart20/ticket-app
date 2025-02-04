import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    
    try {
        const {id} = params;

        const foundTicket = await Ticket.findOne({ _id: id });

        return NextResponse.json(
            { foundTicket },
            { status: 200 }
        );
    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { message: "Error", error },
            { status: 500 }
        );
    }
}


export async function PUT(req, {params}) {
    try {
        const { id } = params;
        const body = await req.json();
        const ticketData = body.formData;

        const updatedTicketData = await Ticket.findByIdAndUpdate(id, {
            ...ticketData
        });

        return NextResponse.json(
            { message: "Ticket updated successfully" },
            { status: 200 }
        );
        
    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { message: "Error", error },
            { status: 500 }
        );
    }
}



export async function DELETE(req, {params}) {
    try {

        const {id} = params;
        await Ticket.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Ticket deleted successfully" },
            { status: 200 }
        );
        
    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { message: "Error", error },
            { status: 500 }
        );
        
    }
}