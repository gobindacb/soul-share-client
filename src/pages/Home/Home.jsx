import { useLoaderData } from "react-router-dom";
import Carousel from "../../components/Carousel";
import TabCategories from "../../components/TabCategories";
import VolunteerNeedsNow from "../../components/VolunteerNeedsNow";
import Features from "../../components/Features";
import Update from "../../components/Update";
import { Helmet } from "react-helmet-async";


const Home = () => {
    const posts = useLoaderData()
    console.log(posts)
    return (
        <div>
            <Helmet>
                <title>
                    Soul-Share | Home
                </title>
            </Helmet>
            <Carousel/>
            <VolunteerNeedsNow/>
            <TabCategories posts={posts}/>
            <Features/>
            <Update/>
        </div>
    );
};

export default Home;