import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '../ui/avatar'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
  const { companies = [] } = useSelector(store => store.company || {});
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
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                You haven't registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            companies.map(company => (
              <TableRow key={company._id}>
                {/* Logo */}
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={company.logo}
                      alt={company.name}
                    />
                  </Avatar>
                </TableCell>

                {/* Name */}
                <TableCell className="font-medium">
                  {company.name}
                </TableCell>

                {/* Date */}
                <TableCell>
                  {company.createdAt?.split('T')[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer">
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