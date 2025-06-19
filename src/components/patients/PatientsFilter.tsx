import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


interface PatientsFilterProps {
    filterGender: string;
    handleFilterChange: (value: string) => void;
    patientCount: number;
}

function PatientsFilter({ filterGender, handleFilterChange, patientCount }: PatientsFilterProps) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border-1 border-gray-300">
            <div className="flex items-center space-x-6">
                <div>
                    <Label className="text-md font-medium mb-1 block">Gender</Label>
                    <RadioGroup
                        defaultValue="all" 
                        className="flex space-x-4"
                        value={filterGender}
                        onValueChange={handleFilterChange}
                    >
                        <div className="flex items-center space-x-1">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all" className="cursor-pointer">All</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="cursor-pointer">Male</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="cursor-pointer">Female</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
                Showing {patientCount} patients
            </div>
        </div>
    );
}

export default PatientsFilter;