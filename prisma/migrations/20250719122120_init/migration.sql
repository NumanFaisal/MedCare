-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'DOCTOR', 'MEDICAL');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('NEW_PATIENT', 'FOLLOW_UP', 'CHECK_UP');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "bloodType" "BloodType" NOT NULL,
    "allergies" TEXT NOT NULL,
    "medicalConditions" TEXT NOT NULL,
    "currentMedications" TEXT NOT NULL,
    "currentPassword" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "qualifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "experiences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "specialization" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medical" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Medical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "appointmentType" "AppointmentType" NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medicine" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_patientId_key" ON "Patient"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medical_email_key" ON "Medical"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_prescriptionId_key" ON "Prescription"("prescriptionId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
