import React from 'react'
import Button from './Button'

function TabSwitcherButtons({ tabs, value, onChange }) {
  const [selectedTab, setSelectedTab] = React.useState(value)
  return (
    <div>
      {tabs.map((tab, index) => (
        <Button onClick={e => {
          selectedTab === index ? setSelectedTab(null) : setSelectedTab(index)
          onChange(index)
        }}
          key={index} ></Button>
      ))
      }
    </div >
  )
}

export default TabSwitcherButtons