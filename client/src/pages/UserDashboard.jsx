import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FaSearch } from "react-icons/fa";

const dummySchemes = [
  {
    schemeId: "SCH001",
    schemeName: "Youth Empowerment Program",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
  },
  {
    schemeId: "SCH002",
    schemeName: "Agriculture Support Scheme",
    startDate: "2025-06-10",
    endDate: "2025-07-10",
  },
  {
    schemeId: "SCH003",
    schemeName: "Women Entrepreneurship Scheme",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
  },
  {
    schemeId: "SCH004",
    schemeName: "Student Scholarship Scheme",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
  },
  {
    schemeId: "SCH005",
    schemeName: "Senior Citizen Welfare Program",
    startDate: "2025-08-01",
    endDate: "2025-08-31",
  },
  {
    schemeId: "SCH006",
    schemeName: "Rural Employment Guarantee Scheme",
    startDate: "2025-06-20",
    endDate: "2025-07-20",
  },
  {
    schemeId: "SCH007",
    schemeName: "Digital Literacy Campaign",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
  },
  {
    schemeId: "SCH008",
    schemeName: "Small Business Loan Assistance",
    startDate: "2025-07-05",
    endDate: "2025-08-05",
  },
  {
    schemeId: "SCH009",
    schemeName: "Clean Energy Subsidy Program",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    schemeId: "SCH010",
    schemeName: "Urban Housing Scheme",
    startDate: "2025-11-01",
    endDate: "2025-11-30",
  }
];


const SchemeTable = () => {
const [schemes, setSchemes] = useState(dummySchemes)
  const [searchTerm, setSearchTerm] = useState("")
   useEffect(() => {
    const mobile = Cookies.get('mobile');
    
    if (!mobile) {
      console.warn("No mobile number found in cookies");
      setSchemes(dummySchemes);
      return;
    }

 fetch(`https://api.example.com/schemes?mobile=${mobile}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setSchemes(data);
      })
      .catch(err => {
        console.error("API fetch error:", err);
        setSchemes(dummySchemes);
      });
     
  }, []);
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
       <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center ">Available Schemes</h1>
      <div className="max-w-5xl  my-10 mx-auto bg-white p-6 rounded-xl shadow-md">
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

        <ScrollArea className="w-[350px] overflow-auto rounded-md border whitespace-nowrap h-[400px] lg:w-full  p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Scheme ID</TableHead>
                <TableHead >Scheme Name</TableHead>
                <TableHead >Start Date</TableHead>
                <TableHead >End Date</TableHead>
                <TableHead className=" text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((scheme) => (
                  <TableRow key={scheme.schemeId}>
                    <TableCell>{scheme.schemeId}</TableCell>
                    <TableCell>{scheme.schemeName}</TableCell>
                    <TableCell>{scheme.startDate}</TableCell>
                    <TableCell>{scheme.endDate}</TableCell>
                    <TableCell className="text-center ">
                      <Button variant="outline" className="text-sm">Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No schemes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
           <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

export default SchemeTable;
