import { PatientType } from "@/types/patient";
import { useState } from "react";


function PatientsList() {
    const [patients, setpatients] = useState<PatientType[]>(allPatients);
}

export default PatientsList;