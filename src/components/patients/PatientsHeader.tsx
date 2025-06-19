import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


interface PatientsHeaderProps {
    searchQuery: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PatientsHeader({ searchQuery, handleSearch }: PatientsHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold">Patients List</h1>
                <p className="text-gray-600 mt-1">Manage your registered patients</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                        className="pl-9 min-w-[250px]" 
                        placeholder="Search patients..." 
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <Button variant="outline" className="flex items-center gap-1 border-1 border-gray-300 hover:bg-[#FDE1D3]">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                </Button>
                <Button className="bg-primary  text-white">
                    Add New Patient
                </Button>
            </div>
        </div>
    );
}

export default PatientsHeader;