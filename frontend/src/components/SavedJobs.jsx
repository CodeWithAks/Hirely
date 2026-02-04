import { useSelector } from 'react-redux';
import Job from './Job';

const SavedJobs = () => {
  const { savedJobs = [] } = useSelector(store => store.job);

  if (savedJobs.length === 0) {
    return <h1 className='text-center mt-10'>No saved jobs yet </h1>;
  } 
  
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      {savedJobs.map(job => (
        <Job key={job._id} job={job} />
      ))}
    </div>
  )
}

export default SavedJobs;