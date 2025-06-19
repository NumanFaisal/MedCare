import { HeartPulse } from "lucide-react";
import { Button } from "../ui/button";


interface NoPatientsProps {
    resetFilters: () => void;
}   

function NoPatients({ resetFilters }: NoPatientsProps) {
    return (
        <div className="text-center py-8">
            <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-dark">
                <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No patients found</h3>
            <p className="mt-1 text-sm text-gray-500">
                No patients match your search or filter criteria.
            </p>
            <div className="mt-6">
                <Button className=" bg-primary hover:bg-primary/50 text-white" onClick={resetFilters}>
                    Reset Filters
                </Button>
            </div>
        </div>
    );
}

export default NoPatients;