import axios from "axios";
import UseAuth from "../../hooks/UseAuth";
import toast from "react-hot-toast";

const ApplyPost = ({ data, onClose }) => {

    const { _id, category, post_title, location, deadline, thumbnail, description, organizer, no_of_volunteer_needs } = data
    const { user } = UseAuth();
    
    const handleRequestSubmit = async e => {
        e.preventDefault()
        if(user?.email === organizer?.email) return toast.error('You are not granted for this post.')
        const form = e.target
        const postId = _id
        const request_category = category
        const request_title = post_title
        const request_location = location
        const request_deadline = deadline
        const request_thumbnail = thumbnail
        const request_description = description
        const request_organizer_name = organizer?.name
        const request_organizer_email = organizer?.email
        const request_volunteers_need = no_of_volunteer_needs
        const suggestion = form.suggestion.value
        const request_email = user?.email
        const request_name = user?.displayName
        const request_photo = user?.photoURL
        const status = 'Requested'

        const requestData = {
            postId, request_category, request_title, request_location, request_deadline, request_thumbnail, request_description, request_organizer_name, request_organizer_email, request_volunteers_need, suggestion, request_email, request_name, request_photo, status
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/request`, requestData)
            if(data.insertedId){
                toast.success('Request sent successfully!')
                onClose()
            }
        } catch (err) {
            toast.error('You have already sent a request for this volunteer post')
            console.log(err)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center opacity-100">
            <div className="bg-white w-1/2 md:w-1/3 lg:w-1/3 p-8 rounded-md shadow-lg">
                <h2 className="text-xl font-semibold">{post_title}</h2>
                <form onSubmit={handleRequestSubmit}>
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Volunteer name?</span>
                            </div>
                            <input type="text" defaultValue={user?.displayName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <div className="label">
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Volunteer email?</span>
                            </div>
                            <input type="text" defaultValue={user?.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                            <div className="label">
                            </div>
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Your Suggestion</span>
                            </div>
                            <textarea name="suggestion" className="textarea textarea-bordered h-24" placeholder="Write your valuable suggestion here"></textarea>
                        </label>
                        {/* Conditional rendering for the button */}
                        {no_of_volunteer_needs > 0 ? (
                            <button className="mt-4 bg-blue-600 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded w-full max-w-xs">Be a Volunteer</button>
                        ) : (
                            <button disabled className="mt-4 bg-blue-300 text-gray-500 cursor-not-allowed font-semibold py-2 px-4 rounded w-full max-w-xs">Be a Volunteer (No Vacancy)</button>
                        )}
                    </div>
                </form>
                <div className="flex items-center justify-between mt-2">
                    <div>
                        <p className="text-gray-700">Deadline</p>
                        <span className="text-red-600 text-lg">{new Date(deadline).toLocaleDateString()}</span>
                    </div>
                    <button onClick={onClose} className="mt-4 bg-gray-200 hover:bg-gray-300 text-red-600 font-semibold py-2 px-4 rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyPost;





// import axios from "axios";
// import UseAuth from "../../hooks/UseAuth";
// import toast from "react-hot-toast";



// const ApplyPost = ({ data, onClose }) => {

//     const { _id, category, post_title, location, deadline, thumbnail, description, organizer, no_of_volunteer_needs } = data
//     const { user } = UseAuth();
    

//     const handleRequestSubmit = async e => {
//         e.preventDefault()
//         if(user?.email === organizer?.email) return toast.error('You are not granted for this post.')
//         const form = e.target
//         const postId = _id
//         const request_category = category
//         const request_title = post_title
//         const request_location = location
//         const request_deadline = deadline
//         const request_thumbnail = thumbnail
//         const request_description = description
//         const request_organizer_name = organizer?.name
//         const request_organizer_email = organizer?.email
//         const request_volunteers_need = no_of_volunteer_needs
//         const suggestion = form.suggestion.value
//         const request_email = user?.email
//         const request_name = user?.displayName
//         const request_photo = user?.photoURL
//         const status = 'Requested'

//         const requestData = {
//             postId, request_category, request_title, request_location, request_deadline, request_thumbnail, request_description, request_organizer_name, request_organizer_email, request_volunteers_need, suggestion, request_email, request_name, request_photo, status
//         }
//         try {
//             const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/request`, requestData)
//             if(data.insertedId){
//                 toast.success('Request send successfully!')
//                 onClose()
//             }
//         } catch (err) {
//             toast.error('You have already send request for this volunteer post')
//             console.log(err)
//         }

//     }

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center opacity-100">
//             <div className="bg-white w-1/2 md:w-1/3 lg:w-1/3 p-8 rounded-md shadow-lg">
//                 {/* Display data passed from the PostDetails component */}
//                 <h2 className="text-xl font-semibold">{post_title}</h2>
//                 <form onSubmit={handleRequestSubmit}>
//                     <div>
//                         <label className="form-control w-full max-w-xs">
//                             <div className="label">
//                                 <span className="label-text">Volunteer name?</span>
//                             </div>
//                             <input type="text" defaultValue={user?.displayName} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
//                             <div className="label">
//                             </div>
//                         </label>
//                         <label className="form-control w-full max-w-xs">
//                             <div className="label">
//                                 <span className="label-text">Volunteer email?</span>
//                             </div>
//                             <input type="text" defaultValue={user?.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
//                             <div className="label">
//                             </div>
//                         </label>
//                         <label className="form-control">
//                             <div className="label">
//                                 <span className="label-text">Your Suggestion</span>
//                             </div>
//                             <textarea name="suggestion" className="textarea textarea-bordered h-24" placeholder="Write your valuable suggestion here"></textarea>
//                         </label>
//                         <button className="mt-4 bg-blue-600 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded w-full max-w-xs">Request</button>
//                     </div>
//                 </form>
//                 {/* Close button */}
//                 <div className="flex items-center justify-between mt-2">
//                     <div>
//                         <p className="text-gray-700">Deadline</p>
//                         <span className="text-red-600 text-lg">{new Date(deadline).toLocaleDateString()}</span>
//                     </div>
//                     <button onClick={onClose} className="mt-4 bg-gray-200 hover:bg-gray-300 text-red-600 font-semibold py-2 px-4 rounded">
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ApplyPost;