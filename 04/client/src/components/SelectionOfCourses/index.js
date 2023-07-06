
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Courses from './Courses';
function SelectionCourses(){

    return(
      <div className="main-container-selection-courses">
      <Tabs className='container-selection-courses'>
      <TabList className='ul-selection-courses'>
        <Tab className='li-course'>Development</Tab>
        <Tab className='li-course'>IT & Software</Tab>
        <Tab className='li-course'>Design</Tab>
        <Tab className='li-course'>Marketing</Tab>
      </TabList>
  
      <TabPanel>
        <Courses
          title='Development Courses'
          info='Courses to get you started'
          link='Explore Development'
        />
      </TabPanel>

      <TabPanel>
        <Courses
          title='IT & Software Courses'
          info='Courses to get you started'
          link='Explore IT & Software'       
        />
      </TabPanel>

      <TabPanel>
        <Courses
          title='Design Courses'
          info='Courses to get you started'
          link='Explore Design '       
        />
      </TabPanel>

      <TabPanel>
        <Courses
          title='Marketing Courses'
          info='Courses to get you started'
          link='Explore Marketing'       
        />
      </TabPanel>
    </Tabs>
    </div>
        
    )
}
export default SelectionCourses;