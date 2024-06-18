import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoryCard from './CategoryCard';

const TabCategories = ({ posts }) => {
    return (
        <Tabs>
            <div className='container px-6 py-8 mx-auto'>
                <h1 className='text-3xl font-inter font-extrabold text-center'>Volunteers Categories</h1>
                <div className='flex items-center justify-center'>
                <TabList>
                    <Tab>Healthcare</Tab>
                    <Tab>Education</Tab>
                    <Tab>Social Service</Tab>
                    <Tab>Animal Welfare</Tab>
                    <Tab>Food Distribute</Tab>
                    <Tab>Disaster Recovery</Tab>
                </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Healthcare').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Education').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
                <TabPanel>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Social Service').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Animal Welfare').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Food Distribute').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4'>
                    {
                        posts?.filter(p=>p.category==='Disaster Recovery').map(post => (
                            <CategoryCard key={post._id} post={post}/>
                        ))
                    }
                    </div>
                </TabPanel>
            </div>
        </Tabs>
    );
};

export default TabCategories;