import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, FileText, Package, ShoppingBag, Users } from "lucide-react";
import Link from "next/link";


function MedicalDashboard() {
    // Sample data for medical shop dashboard
    const recentPrescriptions = [
        { id: "P123456", patient: "Vishal Kumar", medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"], date: "2025-06-03", status: "pending"},
        { id: "P123457", patient: "Prince Tiwari", medications: ["Lisinopril 10mg"], date: "2025-06-02", status: "completed"},
        { id: "P123458", patient: "Pratik Anand", medications: ["Metformin 1000mg", "Atorvastatin 20mg"], date: "2025-06-01", status: "completed"},
    ];

    const topMedications = [
        { name: "Amoxicillin", dosage: "500mg", count: 42, inStock: true },
        { name: "Lisinopril", dosage: "10mg", count: 38, inStock: true },
        { name: "Atorvastatin", dosage: "20mg", count: 35, inStock: true },
        { name: "Metformin", dosage: "1000mg", count: 29, inStock: false },
        { name: "Omeprazole", dosage: "20mg", count: 27, inStock: true }
    ]

    return (
        <DashboardLayout role="medical">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Medical Shop Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, City Pharmacy</p>
                </div>

                {/* Stats overview */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Todays Prescription</p>
                                    <p className="text-3xl font-bold mt-1">5</p>
                                </div>
                                <div className="h-12 w-12 bg-[#E5DEFF] rounded-full flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Medicines Dispensed</p>
                                    <p className="text-3xl font-bold mt-1">28</p>
                                </div>
                                <div className="h-12 w-12 bg-[#E5DEFF] rounded-full flex items-center justify-center">
                                    <Package className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Customers</p>
                                    <p className="text-3xl font-bold mt-1">162</p>
                                </div>
                                <div className="h-12 w-12 bg-primary-light rounded-full flex items-center justify-center">
                                    <Users className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Low Stock Items</p>
                                    <p className="text-3xl font-bold mt-1">12</p>
                                </div>
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <ShoppingBag className="h-6 w-6 text-red-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    {/* Recent Prescriptions */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Recent Prescriptions
                                </CardTitle>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/fetch-prescriptions">
                                        View All
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentPrescriptions.map(prescription => (
                                    <div key={prescription.id} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium">{prescription.patient}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${
                                                prescription.status === 'pending' 
                                                    ? 'bg-amber-100 text-amber-800' 
                                                    : 'bg-green-100 text-green-800'
                                                }`}>
                                                {prescription.status === 'pending' ? 'Pending' : 'Completed'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                <div>ID: {prescription.id}</div>
                                                <div className="text-xs mt-1">
                                                    {prescription.medications.join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="border-gray-300 border">View Details</Button>
                                    </div>
                                ))}
                                
                                <div className="text-center pt-2">
                                    <Button variant="link" size="sm" asChild>
                                        <Link href="/fetch-prescriptions">View All Prescriptions</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Medications */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" />
                                    Top Medications
                                </CardTitle>
                                <Button variant="ghost" size="sm">
                                    View Inventory
                                </Button>
                            </div>
                            <CardDescription>
                                Most frequently dispensed medications
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {topMedications.map((medication, index) => (
                                <div key={index} className="flex items-center justify-between py-2  border-b last:border-0 border-gray-300 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="w-8 text-center font-medium text-gray-500">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium">{medication.name} {medication.dosage}</p>
                                            <p className="text-xs text-gray-500">
                                            Dispensed {medication.count} times this month
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 text-xs rounded-full ${
                                        medication.inStock 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {medication.inStock ? 'In Stock' : 'Low Stock'}
                                    </div>
                                </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button className="h-auto py-4 flex flex-col text-white" asChild>
                                <Link href="/fetch-prescriptions">
                                    <FileText className="mb-2" />
                                    Fetch Prescription
                                </Link>
                            </Button>
                            <Button className="h-auto py-4 flex flex-col text-white" >
                                <ShoppingBag className="mb-2" />
                                Manage Inventory
                            </Button>
                            <Button className="h-auto py-4 flex flex-col text-white" >
                                <Package className="mb-2" />
                                Order Supplies
                            </Button>
                            <Button className="h-auto py-4 flex flex-col text-white" >
                                <Users className="mb-2" />
                                Customer Records
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default MedicalDashboard;