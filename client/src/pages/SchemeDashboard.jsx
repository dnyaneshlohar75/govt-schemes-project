import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import {
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
// import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import ASideBar  from './files/ASideBar';  

// import { Sidebar } from 'lucide-react';

const dummySchemes = [
  {
    id: 'SCH001',
    name: 'Youth Empowerment Program',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    lastUpdated: '2025-06-15',
  },
  {
    id: 'SCH002',
    name: 'Agriculture Support Scheme',
    startDate: '2025-06-10',
    endDate: '2025-07-10',
    lastUpdated: '2025-06-16',
  },
  {
    id: 'SCH003',
    name: 'Women Entrepreneurship Scheme',
    startDate: '2025-06-15',
    endDate: '2025-07-15',
    lastUpdated: '2025-06-17',
  },
  {
    id: 'SCH004',
    name: 'Student Scholarship Scheme',
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    lastUpdated: '2025-06-20',
  },
  {
    id: 'SCH005',
    name: 'Senior Citizen Welfare Program',
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    lastUpdated: '2025-07-01',
  },
  {
    id: 'SCH006',
    name: 'Rural Employment Guarantee Scheme',
    startDate: '2025-06-20',
    endDate: '2025-07-20',
    lastUpdated: '2025-06-25',
  },
  {
    id: 'SCH007',
    name: 'Digital Literacy Campaign',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    lastUpdated: '2025-08-01',
  },
  {
    id: 'SCH008',
    name: 'Small Business Loan Assistance',
    startDate: '2025-07-05',
    endDate: '2025-08-05',
    lastUpdated: '2025-07-06',
  },
  {
    id: 'SCH009',
    name: 'Clean Energy Subsidy Program',
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    lastUpdated: '2025-09-15',
  },
  {
    id: 'SCH010',
    name: 'Urban Housing Scheme',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    lastUpdated: '2025-10-10',
  },
  {
    id: 'SCH011',
    name: 'Skill Development Mission',
    startDate: '2025-06-18',
    endDate: '2025-07-18',
    lastUpdated: '2025-06-19',
  },
  {
    id: 'SCH012',
    name: 'Women Health Initiative',
    startDate: '2025-07-10',
    endDate: '2025-08-10',
    lastUpdated: '2025-07-12',
  },
  {
    id: 'SCH013',
    name: 'Startup Incubation Scheme',
    startDate: '2025-09-15',
    endDate: '2025-10-15',
    lastUpdated: '2025-09-20',
  },
  {
    id: 'SCH014',
    name: 'Child Nutrition Program',
    startDate: '2025-06-25',
    endDate: '2025-07-25',
    lastUpdated: '2025-06-26',
  },
  {
    id: 'SCH015',
    name: 'Digital India Access Grant',
    startDate: '2025-08-05',
    endDate: '2025-09-05',
    lastUpdated: '2025-08-06',
  }
];


const SchemeDashboard = () => {
    const [schemes, setSchemes] = useState(dummySchemes)
      const [searchTerm, setSearchTerm] = useState("")
      const [loading,setloading]=useState(false);
      useEffect(() => {
  const fetchSchemes = async () => {
    try {
        setloading(true);
      const mobile = Cookies.get('mobile');

      if (!mobile) {
        console.warn("No mobile number found in cookies");
        setSchemes(dummySchemes);
        return;
      }

      const res = await fetch(`https://api.example.com/schemes?mobile=${mobile}`);
      await new Promise((reslove)=>setTimeout(reslove(), 2000));
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setSchemes(data);
    } catch (err) {
      console.error("API fetch error:", err);
      setSchemes(dummySchemes);
    }finally{
        setloading(false);
    }
  };

  fetchSchemes();
}, []);

      const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ASideBar/> 
      <h2 className="text-2xl font-bold text-green-800 text-center mb-8">All Available Schemes</h2>
 <div className='flex flex-col lg:flex-row justify-center items-center gap-2 mb-4 '>
          <h2 className='font-bold '>Search Schemes</h2>
         <div className="relative w-[250px]">
  <Input
    type="text"
    placeholder="Enter Scheme Name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="pl-10 pr-4" // left padding for icon space
    />
  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
</div>
        </div>
        <div className='w-[90%] flex justify-center m-auto'>
{loading && <ScrollArea className="w-full overflow-auto rounded-md border h-[500px] p-4">
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-[900px]">
    {filteredSchemes.length > 0 ? (
      filteredSchemes.map((scheme) => (
        
        <Card
          key={scheme.id}
          className="bg-white shadow-md rounded-xl border border-gray-200"
        >
          <CardHeader>
            <Skeleton className="h-12 w-12 rounded-full" />
            <CardDescription className="text-sm text-gray-500">
                 <Skeleton className="h-4 w-[250px]" />
            </CardDescription>
          </CardHeader>

          <CardContent className="text-gray-700 text-sm space-y-1">
            <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
          </CardContent>

          <CardFooter className="text-xs text-gray-400 justify-end">
            <div className="mt-2 text-sm text-blue-500 hover:underline cursor-pointer">
           
        <Skeleton className="h-4 w-[200px]" />
            </div>
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
</ScrollArea>}
{!loading && <ScrollArea className="w-full overflow-auto rounded-md border h-[500px] p-4">
  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-[900px]">
    {filteredSchemes.length > 0 ? (
      filteredSchemes.map((scheme) => (
      <Dialog key={scheme.id}>
  <Card className="bg-white shadow-lg rounded-2xl border border-gray-200 transition-transform hover:scale-[1.01] duration-300">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-green-700">{scheme.name}</CardTitle>
      <CardDescription className="text-sm text-gray-500">ID: {scheme.id}</CardDescription>
    </CardHeader>

    <CardContent className="text-gray-700 text-sm space-y-2">
      <p>
        <strong>Start Date:</strong> <span className="text-gray-600">{scheme.startDate}</span>
      </p>
      <p>
        <strong>End Date:</strong> <span className="text-gray-600">{scheme.endDate}</span>
      </p>
    </CardContent>

    <CardFooter className="flex justify-end">
      <DialogTrigger asChild>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium underline">View Details</button>
      </DialogTrigger>
    </CardFooter>

    <DialogContent className="sm:max-w-[600px] bg-white rounded-xl shadow-xl p-6 border">
      <DialogHeader className="mb-4 text-center">
        <DialogTitle className="text-2xl font-bold text-green-700">{scheme.name}</DialogTitle>
        <DialogDescription className="text-sm text-gray-500">ID: {scheme.id}</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <p><strong>Start Date:</strong> {scheme.startDate}</p>
          <p><strong>End Date:</strong> {scheme.endDate}</p>
        </div>

        <div>
          <strong>Description:</strong>
          <p className="text-justify mt-1">
            {scheme.description || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique inventore, sit iste officiis, ratione aliquam culpa laborum eius sint quaerat eum perspiciatis sequi quia, accusamus aperiam impedit laboriosam repellat eligendi explicabo repudiandae in dolorem a obcaecati. Modi consequuntur cumque odit omnis aperiam obcaecati.`}
          </p>
        </div>

        {/* <p><strong>Eligibility:</strong> {scheme.eligibility || "Not specified"}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-white ${scheme.status === "Active" ? "bg-green-500" : "bg-red-500   
            {scheme.status || "Active"}
          </span>
        </p> */}
      </div>

      <DialogFooter className="mt-6 flex justify-end items-center">
        <Link
          to={`/`}
          className="text-white bg-green-700 text-center hover:bg-green-800 px-5 py-2 rounded-lg text-sm transition  "
        >
          Apply Now
        </Link>
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
</ScrollArea>}

        </div>
    

    </div>
  )
}

export default SchemeDashboard;
