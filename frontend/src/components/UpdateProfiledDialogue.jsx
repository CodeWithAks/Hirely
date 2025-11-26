import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const UpdateProfiledDialogue = ({ open, setOpen }) => {
    const [loading,setLoading] = useState(false);
    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={()=> setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form>
                        <div className='grid gap-4 py-4'>

                            {/* name */}
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"  //id aur htmlfor match hona chahiye
                                    className="col-span-3"
                                />
                            </div>

                            {/* email */}
                             <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"  //id aur htmlfor match hona chahiye
                                    className="col-span-3"
                                />
                            </div>

                            {/* number */}
                             <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    id="number"  //id aur htmlfor match hona chahiye
                                    className="col-span-3"
                                />
                            </div>

                            {/* Bio */}
                             <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"  //id aur htmlfor match hona chahiye
                                    className="col-span-3"
                                />
                            </div>

                            {/* Skills */}
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"  //id aur htmlfor match hona chahiye
                                    className="col-span-3"
                                />
                            </div>

                            {/* Resume */}
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    id="file"  //id aur htmlfor match hona chahiye
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfiledDialogue