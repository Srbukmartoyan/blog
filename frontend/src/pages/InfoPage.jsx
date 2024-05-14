import React from 'react'
import Group from '../components/Group'

const InfoPage = () => {
  return (
    <div>
      <Group start={0} end={3} title={"Most Interesting"}/>
      <Group start={3} emd={5} title={"Most Viewed"}/>
    </div>
  )
}

export default InfoPage;
