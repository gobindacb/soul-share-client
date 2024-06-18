import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyRequested = () => {
    const { user } = UseAuth();
    const [request, setRequest] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [activeButton, setActiveButton] = useState("myRequest");

    useEffect(() => {
        if (activeButton === "myRequest") {
            getData();
        } else if (activeButton === "othersRequest") {
            getVolunteersData();
        }
    }, [user, activeButton]);

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/my-request/${user?.email}`);
        setRequest(data);
    };

    const getVolunteersData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/volunteer-request/${user?.email}`);
        setVolunteers(data);
    };

    // const handleDelete = async (id) => {
    //     try {
    //         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/request/${id}`);
    //         console.log(data);
    //         toast.success('Cancel successfully from requests!');
    //         getData();
    //     } catch (err) {
    //         console.log(err);
    //         toast.error(err.message);
    //     }
    // };

    const handleDelete = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        });
    
        if (confirmation.isConfirmed) {
            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/request/${id}`);
                console.log(data);
                Swal.fire(
                    'Cancelled!',
                    'Your request has been cancelled.',
                    'success'
                );
                getData();
            } catch (err) {
                console.log(err);
                Swal.fire(
                    'Error!',
                    'Failed to cancel request. Please try again later.',
                    'error'
                );
            }
        } else {
            Swal.fire(
                'Cancelled!',
                'Your cancellation has been cancelled.',
                'info'
            );
        }
    };

    // const handleCancel = async (id) => {
    //     try {
    //         const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/request/${id}`);
    //         console.log(data);
    //         toast.success('Cancel successfully from requests!');
    //         getVolunteersData();
    //     } catch (err) {
    //         console.log(err);
    //         toast.error(err.message);
    //     }
    // };

    const handleCancel = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        });
    
        if (confirmation.isConfirmed) {
            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/request/${id}`);
                console.log(data);
                Swal.fire(
                    'Cancelled!',
                    'Your request has been cancelled.',
                    'success'
                );
                getVolunteersData();
            } catch (err) {
                console.log(err);
                Swal.fire(
                    'Error!',
                    'Failed to cancel request. Please try again later.',
                    'error'
                );
            }
        } else {
            Swal.fire(
                'Cancelled!',
                'Your cancellation has been cancelled.',
                'info'
            );
        }
    };


    return (
        <div className="container my-4 mx-auto sm:p-2">
            <Helmet>
                <title>
                    Soul-Share | My Request
                </title>
            </Helmet>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 mb-2">
                <button className={`btn ${activeButton === "myRequest" ? "btn-primary" : "btn-secondary"}`} onClick={() => setActiveButton("myRequest")}>
                    My request on others post
                </button>
                <button className={`btn ${activeButton === "othersRequest" ? "btn-primary" : "btn-secondary"}`} onClick={() => setActiveButton("othersRequest")}>
                    Others request on my post
                </button>
            </div>
            {activeButton === "myRequest" && (
                <div className="container my-4 mx-auto sm:p-2">
                    {/* Your code for displaying "My request on others post" */}
                    {request.length > 0 ? (
                        <div className="container my-4 mx-auto sm:p-2">
                        <h2 className="mb-4 text-xl font-semibold leading-tight">My Volunteer requested post <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
                            <span className="text-white">{request.length} post</span>
                        </span></h2>
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
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Organizer</th>
                                        <th className="p-3">Deadline</th>
                                        <th className="p-3">Volunteer</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        request?.map(req =>
                                            <tr key={req._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                                <td className="p-3">
                                                    <p className="font-bold">{req?.request_category}</p>
                                                    <p>{req?.request_title}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p className="font-bold">{req?.request_organizer_name}</p>
                                                    <p>{req?.request_location}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{new Date(req?.request_deadline).toLocaleDateString()}</p>
                                                    <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(req?.request_deadline).getDay()]}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{req?.request_volunteers_need}</p>
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-3 py-1 font-semibold rounded-md bg-violet-600 dark:text-gray-50">
                                                        <span className="text-white">{req?.status}</span>
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-3 py-1 font-semibold rounded-md bg-red-600 dark:text-gray-50">
                                                        <button onClick={() => handleDelete(req?._id)}>Cancel</button>
                                                    </span>
                                                </td>

                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-primary">No request on others post</h1>
                        </div>
                    ) }
                </div>
            )}
            {activeButton === "othersRequest" && (
                <div className="container p-0 mx-auto sm:p-2">
                    {/* Your code for displaying "Others request on my post" */}
                    {volunteers.length > 0 ? (
                        <div className="container p-0 mx-auto sm:p-2">
                        <h2 className="mb-4 text-xl font-semibold leading-tight">Request on my volunteer need post: <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
                            <span className="text-white">{volunteers.length} request</span>
                        </span></h2>
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
                                <thead className="dark:bg-gray-300">
                                    <tr className="text-left">
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Applicant</th>
                                        <th className="p-3">Deadline</th>
                                        <th className="p-3">Volunteer</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        volunteers?.map(volunteer =>
                                            <tr key={volunteer._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                                <td className="p-3">
                                                    <p className="font-bold">{volunteer?.request_category}</p>
                                                    <p>{volunteer?.request_title}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p className="font-bold">{volunteer?.request_name}</p>
                                                    <p>{volunteer?.request_email}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{new Date(volunteer?.request_deadline).toLocaleDateString()}</p>
                                                    <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(volunteer?.request_deadline).getDay()]}</p>
                                                </td>
                                                <td className="p-3">
                                                    <p>{volunteer?.request_volunteers_need}</p>
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-3 py-1 font-semibold rounded-md bg-violet-600 dark:text-gray-50">
                                                        <span className="text-white">{volunteer?.status}</span>
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-3 py-1 font-semibold rounded-md bg-red-600 dark:text-gray-50">
                                                        <button onClick={() => handleCancel(volunteer?._id)}>Cancel</button>
                                                    </span>
                                                </td>

                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-secondary">No request on my post</h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyRequested;







// import { useEffect, useState } from "react";
// import UseAuth from "../hooks/UseAuth";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import toast from "react-hot-toast";


// const MyRequested = () => {
//     const { user } = UseAuth()
//     const [request, setRequest] = useState([])

//     const [volunteers, setVolunteers] = useState([])

//     useEffect(() => {
//         getData()
//     }, [user])

//     const getData = async () => {
//         const { data } = await axios(`${import.meta.env.VITE_API_URL}/my-request/${user?.email}`)
//         setRequest(data)
//     }

//     // delete request
//     const handleDelete = async id => {
//         try {
//             const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/request/${id}`)
//             console.log(data)
//             toast.success('Cancel successfully from requests!')
//             getData()
//         } catch (err) {
//             console.log(err)
//             toast.error(err.message)
//         }
//     }

//     useEffect(() => {
//         getVolunteersData()
//     }, [user])

//     const getVolunteersData = async () => {
//         const { data } = await axios(`${import.meta.env.VITE_API_URL}/volunteer-request/${user?.email}`)
//         setVolunteers(data)
//     }

//     return (
//         <div className="container my-4 mx-auto sm:p-2">
//             <Helmet>
//                 <title>
//                     Soul-Share | My Request
//                 </title>
//             </Helmet>
//             <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 mb-2">
//                 <button className="btn btn-primary">My request on others post</button>
//                 <button className="btn btn-secondary">Others request on my post</button>
//             </div>
//             {/* My request on others post */}
//             <div className="container my-4 mx-auto sm:p-2">
//                 <h2 className="mb-4 text-xl font-semibold leading-tight">My Volunteer requested post <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
//                     <span className="text-white">{request.length} post</span>
//                 </span></h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-xs">
//                         <colgroup>
//                             <col />
//                             <col />
//                             <col />
//                             <col />
//                             <col />
//                             <col className="w-24" />
//                         </colgroup>
//                         <thead className="dark:bg-gray-300">
//                             <tr className="text-left">
//                                 <th className="p-3">Category</th>
//                                 <th className="p-3">Organizer</th>
//                                 <th className="p-3">Deadline</th>
//                                 <th className="p-3">Volunteer</th>
//                                 <th className="p-3">Status</th>
//                                 <th className="p-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 request?.map(req =>
//                                     <tr key={req._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
//                                         <td className="p-3">
//                                             <p className="font-bold">{req?.request_category}</p>
//                                             <p>{req?.request_title}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p className="font-bold">{req?.request_organizer_name}</p>
//                                             <p>{req?.request_location}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p>{new Date(req?.request_deadline).toLocaleDateString()}</p>
//                                             <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(req?.request_deadline).getDay()]}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p>{req?.request_volunteers_need}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <span className="px-3 py-1 font-semibold rounded-md bg-violet-600 dark:text-gray-50">
//                                                 <span className="text-white">{req?.status}</span>
//                                             </span>
//                                         </td>
//                                         <td className="p-3">
//                                             <span className="px-3 py-1 font-semibold rounded-md bg-red-600 dark:text-gray-50">
//                                                 <button onClick={() => handleDelete(req?._id)}>Cancel</button>
//                                             </span>
//                                         </td>

//                                     </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             {/* Others request on my post */}
//             <div className="container p-0 mx-auto sm:p-2">
//                 <h2 className="mb-4 text-xl font-semibold leading-tight">Request on my volunteer need post: <span className="px-3 py-1 font-semibold rounded-md bg-violet-600">
//                     <span className="text-white">{volunteers.length} request</span>
//                 </span></h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-xs">
//                         <colgroup>
//                             <col />
//                             <col />
//                             <col />
//                             <col />
//                             <col />
//                             <col className="w-24" />
//                         </colgroup>
//                         <thead className="dark:bg-gray-300">
//                             <tr className="text-left">
//                                 <th className="p-3">Category</th>
//                                 <th className="p-3">Applicant</th>
//                                 <th className="p-3">Deadline</th>
//                                 <th className="p-3">Volunteer</th>
//                                 <th className="p-3">Status</th>
//                                 <th className="p-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 volunteers?.map(volunteer =>
//                                     <tr key={volunteer._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
//                                         <td className="p-3">
//                                             <p className="font-bold">{volunteer?.request_category}</p>
//                                             <p>{volunteer?.request_title}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p className="font-bold">{volunteer?.request_name}</p>
//                                             <p>{volunteer?.request_email}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p>{new Date(volunteer?.request_deadline).toLocaleDateString()}</p>
//                                             <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(volunteer?.request_deadline).getDay()]}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <p>{volunteer?.request_volunteers_need}</p>
//                                         </td>
//                                         <td className="p-3">
//                                             <span className="px-3 py-1 font-semibold rounded-md bg-violet-600 dark:text-gray-50">
//                                                 <span className="text-white">{volunteer?.status}</span>
//                                             </span>
//                                         </td>
//                                         <td className="p-3">
//                                             <span className="px-3 py-1 font-semibold rounded-md bg-red-600 dark:text-gray-50">
//                                                 <button>Cancel</button>
//                                             </span>
//                                         </td>

//                                     </tr>
//                                 )
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyRequested;