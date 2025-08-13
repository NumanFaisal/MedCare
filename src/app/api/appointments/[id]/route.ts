import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";

// GET /api/appointments/[id] - Get a specific appointment
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const appointmentId = params.id;

        const appointment = await prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                doctor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        specialization: true,
                        email: true,
                    }
                },
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phoneNumber: true,
                    }
                }
            }
        });

        if (!appointment) {
            return NextResponse.json(
                { error: "Appointment not found." },
                { status: 404 }
            );
        }

        // Check if user has access to this appointment
        if (session.user.role === "PATIENT" && appointment.patientId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        if (session.user.role === "DOCTOR" && appointment.doctorId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        // Format appointment for response
        const formattedAppointment = {
            id: appointment.id,
            date: appointment.date,
            reason: appointment.reason,
            appointmentType: appointment.appointmentType,
            status: appointment.status,
            doctor: {
                id: appointment.doctor.id,
                name: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
                specialization: appointment.doctor.specialization,
                email: appointment.doctor.email,
            },
            patient: {
                id: appointment.patient.id,
                name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                email: appointment.patient.email,
                phone: appointment.patient.phoneNumber,
            }
        };

        return NextResponse.json({
            appointment: formattedAppointment
        });

    } catch (error) {
        console.error("Error fetching appointment:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

// PATCH /api/appointments/[id] - Update appointment status or details
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const appointmentId = params.id;
        const body = await request.json();
        const { status, reason, date, time } = body;

        // Find the appointment first
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!existingAppointment) {
            return NextResponse.json(
                { error: "Appointment not found." },
                { status: 404 }
            );
        }

        // Check if user has access to update this appointment
        if (session.user.role === "PATIENT" && existingAppointment.patientId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        if (session.user.role === "DOCTOR" && existingAppointment.doctorId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        // Prepare update data
        const updateData: any = {};

        if (status) {
            const validStatuses = ["Scheduled", "Confirmed", "Completed", "Cancelled", "No-Show"];
            if (!validStatuses.includes(status)) {
                return NextResponse.json(
                    { error: "Invalid status." },
                    { status: 400 }
                );
            }
            updateData.status = status;
        }

        if (reason !== undefined) {
            updateData.reason = reason;
        }

        if (date && time) {
            const appointmentDateTime = new Date(`${date}T${time}`);
            
            // Validate appointment is in the future (only for rescheduling)
            if (appointmentDateTime <= new Date()) {
                return NextResponse.json(
                    { error: "Appointment must be scheduled for a future date and time." },
                    { status: 400 }
                );
            }

            updateData.date = appointmentDateTime;
        }

        // Update the appointment
        const updatedAppointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: updateData,
            include: {
                doctor: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        specialization: true,
                        email: true,
                    }
                },
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phoneNumber: true,
                    }
                }
            }
        });

        // Format appointment for response
        const formattedAppointment = {
            id: updatedAppointment.id,
            date: updatedAppointment.date,
            reason: updatedAppointment.reason,
            appointmentType: updatedAppointment.appointmentType,
            status: updatedAppointment.status,
            doctor: {
                id: updatedAppointment.doctor.id,
                name: `${updatedAppointment.doctor.firstName} ${updatedAppointment.doctor.lastName}`,
                specialization: updatedAppointment.doctor.specialization,
                email: updatedAppointment.doctor.email,
            },
            patient: {
                id: updatedAppointment.patient.id,
                name: `${updatedAppointment.patient.firstName} ${updatedAppointment.patient.lastName}`,
                email: updatedAppointment.patient.email,
                phone: updatedAppointment.patient.phoneNumber,
            }
        };

        return NextResponse.json({
            message: "Appointment updated successfully.",
            appointment: formattedAppointment
        });

    } catch (error) {
        console.error("Error updating appointment:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

// DELETE /api/appointments/[id] - Cancel/Delete an appointment
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const appointmentId = params.id;

        // Find the appointment first
        const existingAppointment = await prisma.appointment.findUnique({
            where: { id: appointmentId }
        });

        if (!existingAppointment) {
            return NextResponse.json(
                { error: "Appointment not found." },
                { status: 404 }
            );
        }

        // Check if user has access to delete this appointment
        if (session.user.role === "PATIENT" && existingAppointment.patientId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        if (session.user.role === "DOCTOR" && existingAppointment.doctorId !== session.user.id) {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        // Instead of deleting, mark as cancelled
        await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status: "Cancelled" }
        });

        return NextResponse.json({
            message: "Appointment cancelled successfully."
        });

    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}