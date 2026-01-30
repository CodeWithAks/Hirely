const SavedJobs = () => {
  const { savedJobs } = useSelector(store => store.job);
  return savedJobs.map(job => <Job job={job} />);
}
