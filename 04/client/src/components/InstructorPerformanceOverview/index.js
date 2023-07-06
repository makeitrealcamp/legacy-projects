import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
function Overview({amount,monthlyMount}){
    return(
        <>
            <p className='p-info-overview'>Get top insights about your performance</p>
            <Tabs className='main-container-tabs-overview'>
                <TabList className='container-tablist-overview'>
                    <Tab>
                        <div className='container-tab-overview'>
                        <p className='title-tab-overview'>Total revenue</p>
                        <p className='price-tab-overview'>{`$${amount}`}</p>
                        <p className='price-month-tab-overview'>{`$${monthlyMount} this month`}</p>
                        </div>
                    </Tab>
                    <Tab>
                        <div className='container-tab-overview'>
                        <p className='title-tab-overview'>Total enrollments</p>
                        <p className='price-tab-overview'>{`$${amount}`}</p>
                        <p className='price-month-tab-overview'>{`$${monthlyMount} this month`}</p>
                        </div>
                    </Tab>
                    <Tab>
                        <div className='container-tab-overview'>
                        <p className='title-tab-overview'>Instructor rating</p>
                        <p className='price-tab-overview'>{`$${amount}`}</p>
                        <p className='price-month-tab-overview'>{`$${monthlyMount} ratings this month`}</p>
                        </div>
                    </Tab>
                </TabList>

                <TabPanel>
                    <div className="container-tab-panel-overview">
                    {<p>No data display</p>}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="container-tab-panel-overview">
                    {<p>No data display</p>}
                    </div>
                </TabPanel>
                <TabPanel >
                    <div className="container-tab-panel-overview">
                    {<p>No data display</p>}
                    </div>
                </TabPanel>
            </Tabs>
        </>
    )
}
Overview.defaultProps = {
    amount: 0,
    monthlyMount:0,
  };
export default Overview;