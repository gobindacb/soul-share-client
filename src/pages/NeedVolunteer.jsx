import axios from "axios";
import { useEffect, useState } from "react";
import VolunteerCard from "../components/VolunteerCard";
import { Link } from "react-router-dom";
import {th} from 'react-icons-kit/fa/th'
import {list} from 'react-icons-kit/fa/list'
import Icon from "react-icons-kit";


const NeedVolunteer = () => {
    const [needs, setNeeds] = useState([]);
    const [filteredNeeds, setFilteredNeeds] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("grid"); // Default view mode is grid

    useEffect(() => {
        const getData = async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/posts`);
            setNeeds(response.data);
            setFilteredNeeds(response.data); // Initially, filtered needs will be same as all needs
        };
        getData();
    }, []);

    const handleSearch = () => {
        const filtered = needs.filter(need =>
            need.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNeeds(filtered);
    };

    const toggleViewMode = mode => {
        setViewMode(mode);
    };

    return (
        <div className="container px-6 mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0">
                <div>
                    <h3 className="text-2xl">
                        Need Volunteer page <br />
                        <span className="text-xl">Total post: <span className="bg-violet-400 p-1">{needs.length}</span></span>
                    </h3>
                </div>
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search by category"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </label>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => toggleViewMode("grid")}><Icon icon={th} size={34} /></button>
                    <button onClick={() => toggleViewMode("table")}><Icon icon={list} size={34} /></button>
                </div>
            </div>
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {filteredNeeds.map(need => (
                        <VolunteerCard key={need._id} need={need}></VolunteerCard>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col />
                            <col />
                            <col className="w-24" />
                        </colgroup>
                        <thead className="border-b border-opacity-20">
                            <tr className="text-left">
                                <th className="p-3">Thumbnail</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Organizer</th>
                                <th className="p-3">Deadline</th>
                                <th className="p-3">Volunteer</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredNeeds.map(need =>
                                    <tr key={need._id} className="border-b border-opacity-20">
                                        <td className="p-3">
                                            <img className="w-14 h-14" src={need?.thumbnail} alt="thumbnail" />
                                        </td>
                                        <td className="p-3">
                                            <p className="font-bold">{need?.category}</p>
                                            <p>{need?.post_title}</p>
                                        </td>
                                        <td className="p-3">
                                            <p className="font-bold">{need?.organizer.name}</p>
                                            <p>{need?.location}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{new Date(need?.deadline).toLocaleDateString()}</p>
                                            <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(need?.deadline).getDay()]}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{need?.no_of_volunteer_needs}</p>
                                        </td>
                                        <td className="p-3 flex items-center justify-center flex-col gap-1">
                                            <Link to={`/post/${need?._id}`} className="btn btn-primary btn-xs"><span>Details</span></Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default NeedVolunteer;



// import axios from "axios";
// import { useEffect, useState } from "react";
// import VolunteerCard from "../components/VolunteerCard";

// const NeedVolunteer = () => {
//     const [needs, setNeeds] = useState([]);
//     const [filteredNeeds, setFilteredNeeds] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [viewMode, setViewMode] = useState("grid"); // Default view mode is grid

//     useEffect(() => {
//         const getData = async () => {
//             const response = await axios(`${import.meta.env.VITE_API_URL}/posts`);
//             setNeeds(response.data);
//             setFilteredNeeds(response.data); // Initially, filtered needs will be same as all needs
//         };
//         getData();
//     }, []);

//     const handleSearch = () => {
//         const filtered = needs.filter(need =>
//             need.category.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredNeeds(filtered);
//     };

//     const toggleViewMode = mode => {
//         setViewMode(mode);
//     };

//     return (
//         <div className="container px-6 mx-auto">
//             <div className="flex flex-col lg:flex-row justify-between">
//                 <div>
//                     <h3>
//                         Need Volunteer page <br />
//                         Total post: {needs.length}
//                     </h3>
//                 </div>
//                 <div>
//                     <label className="input input-bordered flex items-center gap-2">
//                         <input
//                             type="text"
//                             className="grow"
//                             placeholder="Search by category"
//                             value={searchQuery}
//                             onChange={e => setSearchQuery(e.target.value)}
//                         />
//                         <button onClick={handleSearch}>Search</button>
//                     </label>
//                 </div>
//                 <div className="flex gap-3">
//                     <button onClick={() => toggleViewMode("grid")}>Grid</button>
//                     <button onClick={() => toggleViewMode("table")}>Table</button>
//                 </div>
//             </div>
//             <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-3" : ""}>
//                 {filteredNeeds.map(need => (
//                     <VolunteerCard key={need._id} need={need}></VolunteerCard>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NeedVolunteer;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import VolunteerCard from "../components/VolunteerCard";



// const NeedVolunteer = () => {

//     const [needs, setNeeds] = useState([]);
//     useEffect(() => {
//         const getData = async () => {
//             const response = await axios(`${import.meta.env.VITE_API_URL}/posts`)
//             setNeeds(response.data)
//         }
//         getData()
//     }, [])

//     return (
//         <div className="container px-6 mx-auto">
//             <div className="flex flex-col lg:flex-row justify-between">
//                 <div><h3>
//                     Need Volunteer page <br />
//                     Total post: {needs.length}
//                 </h3></div>
//                 <div><label className="input input-bordered flex items-center gap-2">
//                     <input type="text" className="grow" placeholder="Search" />
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
//                 </label></div>
//                 <div className="flex gap-3">
//                     <button>Grid</button>
//                     <button>Table</button>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-3">
//                 {
//                     needs.map(need => <VolunteerCard
//                         key={need._id}
//                         need={need}
//                     ></VolunteerCard>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default NeedVolunteer;