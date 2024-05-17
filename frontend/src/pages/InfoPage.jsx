import React from 'react'
import Group from '../components/Group'

const InfoPage = () => {
  return (
    <div>
      <div className='container mx-auto my-8 px-4 py-4 bg-blue-100 rounded-md'> 
        <Group start={0} end={3} title={"Most Interesting"} />
        <Group start={3} emd={5} title={"Most Viewed"} />
      </div>
    </div>
  )
}

export default InfoPage;
