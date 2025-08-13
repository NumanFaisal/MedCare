import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";

// POST /api/appointments - Create a new appointment
export async function POST(request: NextRequest) {
    try {
        // Get the session to verify authentication
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { 
            doctorId, 
            date, 
            time, 
            reason, 
            appointmentType = "NEW_PATIENT",
            patientName,
            email,
            phone
        } = body;

        // Validate required fields
        if (!doctorId || !date || !time) {
            return NextResponse.json(
                { error: "Missing required fields: doctorId, date, and time are required." },
                { status: 400 }
            );
        }

        // Validate doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found." },
                { status: 404 }
            );
        }

        // For patients, use their ID from session
        let patientId = session.user.id;
        
        // If user is not a patient, we need to find or handle differently
        if (session.user.role !== "PATIENT") {
            return NextResponse.json(
                { error: "Only patients can book appointments." },
                { status: 403 }
            );
        }

        // Combine date and time into a DateTime object
        const appointmentDateTime = new Date(`${date}T${time}`);
        
        // Validate appointment is in the future
        if (appointmentDateTime <= new Date()) {
            return NextResponse.json(
                { error: "Appointment must be scheduled for a future date and time." },
                { status: 400 }
            );
        }

        // Check if the doctor is available at this time (optional - you can add more complex availability logic)
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                doctorId,
                date: appointmentDateTime,
            }
        });

        if (existingAppointment) {
            return NextResponse.json(
                { error: "Doctor is not available at this time. Please choose a different time slot." },
                { status: 409 }
            );
        }

        // Validate appointmentType
        const validAppointmentTypes = ["NEW_PATIENT", "FOLLOW_UP", "CHECK_UP"];
        if (!validAppointmentTypes.includes(appointmentType)) {
            return NextResponse.json(
                { error: "Invalid appointment type." },
                { status: 400 }
            );
        }

        // Create the appointment
        const appointment = await prisma.appointment.create({
            data: {
                date: appointmentDateTime,
                reason: reason || null,
                appointmentType,
                status: "Scheduled",
                patientId,
                doctorId,
            },
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

        // Return success response
        return NextResponse.json({
            message: "Appointment booked successfully.",
            appointment: {
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
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

// GET /api/appointments - Get appointments for the logged-in user
export async function GET(request: NextRequest) {
    try {
        // Get the session to verify authentication
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please log in." },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        
        let appointments;

        if (session.user.role === "PATIENT") {
            // Get appointments for patient
            appointments = await prisma.appointment.findMany({
                where: {
                    patientId: session.user.id,
                    ...(status && { status })
                },
                include: {
                    doctor: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            specialization: true,
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });
        } else if (session.user.role === "DOCTOR") {
            // Get appointments for doctor
            appointments = await prisma.appointment.findMany({
                where: {
                    doctorId: session.user.id,
                    ...(status && { status })
                },
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phoneNumber: true,
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            });
        } else {
            return NextResponse.json(
                { error: "Access denied." },
                { status: 403 }
            );
        }

        // Format appointments for response
        const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            date: appointment.date,
            reason: appointment.reason,
            appointmentType: appointment.appointmentType,
            status: appointment.status,
            ...(session.user.role === "PATIENT" ? {
                doctor: {
                    id: appointment.doctor.id,
                    name: `${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
                    specialization: appointment.doctor.specialization,
                }
            } : {
                patient: {
                    id: appointment.patient.id,
                    name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                    email: appointment.patient.email,
                    phone: appointment.patient.phoneNumber,
                }
            })
        }));

        return NextResponse.json({
            appointments: formattedAppointments
        });

    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}