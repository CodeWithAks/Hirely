import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
  const { companies, searchCompanyByText = [] } = useSelector(store => store.company || {});
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if(!searchCompanyByText){
        return true
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany); //state change hoga
  }, [companies, searchCompanyByText]) //agr inmei se koi ek bhi change hoga to useEffect call ho jaayega


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>

        </TableHeader>

        <TableBody>
  {filterCompany.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} className="text-center text-muted-foreground">
        No companies found
      </TableCell>
    </TableRow>
  ) : (
    filterCompany.map(company => (
      <TableRow key={company._id}>
        {/* Logo */}
        <TableCell>
          <Avatar>
            <AvatarImage src={company.logo} />
          </Avatar>
        </TableCell>

        {/* Name */}
        <TableCell>{company.name}</TableCell>

        {/* Date */}
        <TableCell>
          {company.createdAt?.split("T")[0]}
        </TableCell>

        {/* Action */}
        <TableCell className="text-right cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
            <PopoverContent className="w-32">
              <div
                onClick={() => navigate(`/admin/companies/${company._id}`)}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4" />
                <span>Edit</span>
              </div>
            </PopoverContent>
          </Popover>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

      </Table>
    </div>
  )
}

export default CompaniesTable

{/* //https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80 */ }

// {companies.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center text-muted-foreground">
//                 You haven't registered any company yet.
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterCompany.map(company => ( //this 
//               <TableRow key={company._id}>
//                 {/* Logo */}
//                 <TableCell>
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage
//                       src={company.logo}
//                       alt={company.name}
//                     />
//                   </Avatar>
//                 </TableCell>

//                 {/* Name */}
//                 <TableCell className="font-medium">
//                   {company.name}
//                 </TableCell>

//                 {/* Date */}
//                 <TableCell>
//                   {company.createdAt?.split('T')[0]}
//                 </TableCell>

//                 {/* Action */}
//                 <TableCell className="text-right">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal className="cursor-pointer" />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate(`/admin/companies/${company._id}`)}>
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}