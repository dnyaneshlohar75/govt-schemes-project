import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";

// import ASideBar from "../../components/customUI/ASideBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import { SidebarTrigger } from "@/components/ui/sidebar";

// import { Sidebar } from 'lucide-react';

const dummySchemes = [
  {
    id: "SCH001",
    name: "Youth Empowerment Program",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    lastUpdated: "2025-06-15",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH002",
    name: "Agriculture Support Scheme",
    startDate: "2025-06-10",
    endDate: "2025-07-10",
    lastUpdated: "2025-06-16",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH003",
    name: "Women Entrepreneurship Scheme",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
    lastUpdated: "2025-06-17",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH004",
    name: "Student Scholarship Scheme",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    lastUpdated: "2025-06-20",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH005",
    name: "Senior Citizen Welfare Program",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
    lastUpdated: "2025-07-01",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH006",
    name: "Rural Employment Guarantee Scheme",
    startDate: "2025-06-20",
    endDate: "2025-07-20",
    lastUpdated: "2025-06-25",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH007",
    name: "Digital Literacy Campaign",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    lastUpdated: "2025-08-01",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH008",
    name: "Small Business Loan Assistance",
    startDate: "2025-07-05",
    endDate: "2025-08-05",
    lastUpdated: "2025-07-06",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH009",
    name: "Clean Energy Subsidy Program",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
    lastUpdated: "2025-09-15",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH010",
    name: "Urban Housing Scheme",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    lastUpdated: "2025-10-10",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH011",
    name: "Skill Development Mission",
    startDate: "2025-06-18",
    endDate: "2025-07-18",
    lastUpdated: "2025-06-19",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH012",
    name: "Women Health Initiative",
    startDate: "2025-07-10",
    endDate: "2025-08-10",
    lastUpdated: "2025-07-12",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH013",
    name: "Startup Incubation Scheme",
    startDate: "2025-09-15",
    endDate: "2025-10-15",
    lastUpdated: "2025-09-20",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH014",
    name: "Child Nutrition Program",
    startDate: "2025-06-25",
    endDate: "2025-07-25",
    lastUpdated: "2025-06-26",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
  {
    id: "SCH015",
    name: "Digital India Access Grant",
    startDate: "2025-08-05",
    endDate: "2025-09-05",
    lastUpdated: "2025-08-06",
    requiredDocs: ["Aadhaar Card", "Income Certificate", "Caste Certificate"]
  },
];

const SchemeDashboard = () => {
  const [schemes, setSchemes] = useState(dummySchemes);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setloading(true);
        const mobile = Cookies.get("mobile");

        if (!mobile) {
          console.warn("No mobile number found in cookies");
          setSchemes(dummySchemes);
          return;
        }

        const res = await fetch(
          `https://api.example.com/schemes?mobile=${mobile}`
        );
        await new Promise((reslove) => setTimeout(reslove(), 2000));
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setSchemes(data);
      } catch (err) {
        console.error("API fetch error:", err);
        setSchemes(dummySchemes);
      } finally {
        setloading(false);
      }
    };

    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <main className="dark:bg-[#24262b]  bg-[#f5f6fb] w-full flex">
      <div >
      <div className="relative w-full  h-12  flex items-center">
  {/* Centered Heading */}
  <h2 className="absolute left-1/2 transform -translate-x-1/2 text-[18px]  md:text-2xl lg:text-4xl font-semibold dark:text-white text-orange-900 ">
    All Available Schemes
  </h2>

  {/* Right Side SidebarTrigger */}
  <div className="ml-auto  items-center pr-4 md:hidden lg:hidden">
   <SidebarTrigger className="-ml-1" />
    <Separator
      orientation="vertical"
      className="mx-2 h-4"
    />
  </div>  
</div>  
<div className="grid  justify-center text-center w-full items-center gap-2 mb-4">
          <div className="relative lg:min-w-3xl  flex p-2 text-2xl">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={'border-2 outline-2 h-10  text-2xl '}
            />
            <div className="absolute right-1 py-[8px] px-3 rounded-bl-[20px] top-1/2 transform -translate-y-1/2 bg-orange-800 dark:bg-slate-200 text-gray-200 dark:text-gray-900">
              <FaSearch/>
            </div>
          </div>
          <p className="font-light text-[16px] dark:text-gray-200 text-orange-900 md:text-xl lg:text-2xl text-left ml-3">
            To search for a scheme, type its name . Like: "Scheme Name"
          </p>
        </div>
        
          {loading && (
            <ScrollArea className="overflow-auto rounded-md  h-screen  p-4">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-3 ">
                {filteredSchemes.length > 0 ? (
                  filteredSchemes.map((scheme) => (
                    <Card
                      key={scheme.id}
                      className="dark:bg-[#24262b] h-84"
                    >
                      <CardHeader>
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <CardDescription className="text-sm">
                          <Skeleton className="h-4 w-[250px]" />
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </CardContent>

                      <CardFooter className={'flex gap-2'}>
                        
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[200px]" />
                      
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-gray-500 text-2xl col-span-3 text-center">
                    No schemes found
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
          {!loading && (
            <ScrollArea className="overflow-auto rounded-md h-screen p-4">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSchemes.length > 0 ? (
                  filteredSchemes.map((scheme) => (
                    <Dialog key={scheme.id}>
                      <Card className={'dark:bg-[#24262b] bg-[#eaecf8]'}>
                        <CardHeader>
                          <CardTitle className={'dark:text-white text-2xl font-semibold'} >
                            {scheme.name}
                          </CardTitle>
                          <CardDescription className={'flex'} >
                            
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex justify-center text-[14px] md:text-[14px] lg:text-sm m-auto">
                          {scheme.description ||
                            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique inventore, sit iste officiis, ratione aliquam culpa laborum eius sint quaerat eum perspiciatis sequi quia, accusamus aperiam impedit laboriosam repellat eligendi explicabo repudiandae in dolorem a obcaecati. Modi consequuntur cumque odit omnis aperiam obcaecati.`}
                        </CardContent>

                        <CardFooter className="gap-4">
                          <DialogTrigger asChild>
                            <Button  className={'bg-transparent  text-orange-900 dark:text-gray-50  outline-orange-900 border hover:bg-orange-700 hover:text-gray-200 border-orange-900'}>View Details</Button>
                          </DialogTrigger>
                          
                            <Button className={'bg-transparent  text-orange-900  dark:text-gray-50 outline-orange-900 border hover:bg-orange-700 hover:text-gray-200 border-orange-900'}><Link to={'/'}>Apply Now</Link></Button>
                         
                        </CardFooter>

                      <DialogContent className="dark:bg-[#1c2029]">
  <DialogHeader>
    <DialogTitle className="text-2xl">{scheme.name}</DialogTitle>
    <DialogDescription>ID: {scheme.id}</DialogDescription>
  </DialogHeader>

  <CardContent>
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <p>
        <strong>Start Date:</strong> {scheme.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {scheme.endDate}
      </p>
    </div>

    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Required Documents:</h3>
      <ul  className="list-decimal list-inside space-y-1">
        {scheme.requiredDocs?.map((doc, index) => (
          <li key={index}>{doc}</li>
        )) || (
          <li>No documents listed.</li>
        )}
      </ul>
    </div>
  </CardContent>

  <DialogFooter className="mt-6 flex justify-end items-center">
    <Button className="bg-transparent text-green-900 outline-green-900 border hover:bg-green-700 hover:text-gray-200 border-green-900">
      <Link to={`/`}>Apply Now</Link>
    </Button>
  </DialogFooter>
</DialogContent>

                      </Card>
                    </Dialog>
                  ))
                ) : (
                  <div className="text-gray-500 text-2xl col-span-3 text-center">
                    No schemes found
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}

      </div>
    </main>
  );
};

export default SchemeDashboard;
