import { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";
import { Link } from "react-router-dom";
import axios from "axios";


const VolunteerNeedsNow = () => {

    const [needs, setNeeds] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/needs`, {withCredentials: true})
            setNeeds(response.data)
        }
        getData()
    }, [])

    return (
        <div className="container px-6 mx-auto mt-4">
            <div className="text-center">
                <h1 className="text-xl lg:text-5xl">Volunteer Needs Now</h1>
                <h4 className="text-2xl font-bold text-purple-600">Join Us in Making a Difference: Volunteer Today!</h4>
                <p>Are you passionate about making a positive impact in your community? <br />Do you want to be part of something meaningful, where your time and efforts directly contribute to creating a better world?<br /> Join our vibrant community of volunteers and become a catalyst for change!</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {
                    needs?.map(need =>(<VolunteerCard 
                        key={need._id} 
                        need={need}/>))
                }
            </div>
            <div className="flex items-center justify-center mt-6"><Link to='/need-volunteer'><button className="btn w-32 btn-primary p-2 font-bold font-xl">See All</button></Link></div>
        </div>
    );
};

export default VolunteerNeedsNow;