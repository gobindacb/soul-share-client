import { useLoaderData, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const UpdatePost = () => {

    const post = useLoaderData()
    const {
        _id,
        thumbnail,
        post_title,
        description,
        location,
        no_of_volunteer_needs,
        deadline,
        category
    } = post || {}
    const navigate = useNavigate()
    const { user } = UseAuth()
    const [startDate, setStartDate] = useState(new Date(deadline) || new Date());
    
    // update or edit a post
    const handleUpdateSubmit = async e =>{
        e.preventDefault()
        const form = e.target 
        const thumbnail = form.thumbnail.value 
        const post_title = form.post_title.value 
        const description = form.description.value 
        const location = form.location.value 
        const no_of_volunteer_needs = parseFloat(form.no_of_volunteer_needs.value)
        const deadline = startDate
        const category = form.category.value 

        const postData = {
            thumbnail,
            post_title,
            description,
            location,
            no_of_volunteer_needs,
            deadline,
            category,
            organizer : {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
            },
        }
        
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/post/${_id}`, postData)
            console.log(data)
            toast.success('Update & save the post successfully')
            navigate('/manage-my-post')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }
    

    return (
        <div className="flex flex-col justify-center items-center bg-orange-50">
            <h1 className="text-xl lg:text-5xl text-violet-500 font-inter font-medium underline text-center">Edit Volunteer Post here</h1>
            <div className="w-1/2 rounded-md shadow-lg p-2 bg-violet-100">
                <form onSubmit={handleUpdateSubmit}>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Thumbnail</span>
                            </div>
                            <input type="text" name="thumbnail" defaultValue={thumbnail} placeholder="Image Url" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Post Title</span>
                            </div>
                            <input type="text" name="post_title" defaultValue={post_title} placeholder="Title of your post" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea name="description" className="textarea textarea-bordered h-24" defaultValue={description} placeholder="Write a short description of your post"></textarea>
                    </label>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Location</span>
                            </div>
                            <input type="text" name="location" defaultValue={location} placeholder="Add location here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">No of Volunteer needs</span>
                            </div>
                            <input type="number" defaultValue={no_of_volunteer_needs} name="no_of_volunteer_needs" placeholder="How many volunteer" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 items-center">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Deadline</span>
                            </div>
                            {/* Date Picker Input Field */}
                            <DatePicker className="border p-2 rounded-md w-full" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </label>

                        <div className='flex flex-col gap-2 w-full'>
                            <label className='text-gray-700 ' htmlFor='category'>
                                Category
                            </label>
                            <select
                                name='category'
                                id='category'
                                defaultValue={category}
                                className='border p-2 rounded-md'
                            >
                                <option disabled>Select a category</option>
                                <option value='Healthcare'>Healthcare</option>
                                <option value='Education'>Education</option>
                                <option value='Social Service'>Social Service</option>
                                <option value='Animal Welfare'>Animal Welfare</option>
                                <option value='Food Distribute'>Food Distribute</option>
                                <option value='Disaster Recovery'>Disaster Recovery</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Your Name</span>
                            </div>
                            <input type="text" defaultValue={user?.displayName} placeholder="Name" name="organizer_name" disabled className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Your Email</span>
                            </div>
                            <input type="email" name="organizer_email" disabled defaultValue={user?.email} placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="btn btn-primary mt-3 w-full text-xl font-inter font-bold">Edit & Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePost;