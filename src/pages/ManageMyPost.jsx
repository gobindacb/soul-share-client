import { useEffect, useState } from "react";
import UseAuth from "../hooks/UseAuth";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";


const ManageMyPost = () => {

    const { user } = UseAuth()
    const [posts, setPosts] = useState([])

    useEffect(() => {

        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/posts/${user?.email}`)
        setPosts(data)
    }


    // delete post
    const handleDelete = async (id) => {
        const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
    
        if (confirmation.isConfirmed) {
            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/post/${id}`);
                console.log(data);
                toast.success('Delete successfully');
                getData();
            } catch (err) {
                console.log(err);
                toast.error(err.message);
            }
        }
    };


    return (
        <div className="container p-2 mx-auto sm:p-4">
            <Helmet>
                <title>
                    Soul-Share | Manage My Post
                </title>
            </Helmet>

            {posts.length > 0 ? (
                            <div>
                                <h2 className="mb-4 text-2xl font-semibold leading-tight">My Need Volunteer Post: <span className="rounded-md bg-violet-500 p-1 text-xs text-white">{posts?.length} post</span></h2>
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
                            posts?.map(post =>
                                <tr key={post._id} className="border-b border-opacity-20">
                            <td className="p-3">
                                <img className="w-14 h-14" src={post?.thumbnail} alt="thumbnail" />
                            </td>
                            <td className="p-3">
                                <p className="font-bold">{post?.category}</p>
                                <p>{post?.post_title}</p>
                            </td>
                            <td className="p-3">
                            <p className="font-bold">{post?.organizer.name}</p>
                                <p>{post?.location}</p>
                            </td>
                            <td className="p-3">
                            <p>{new Date(post?.deadline).toLocaleDateString()}</p>
                            <p className="text-gray-600">{["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(post?.deadline).getDay()]}</p>
                            </td>
                            <td className="p-3">
                                <p>{post?.no_of_volunteer_needs}</p>
                            </td>
                            <td className="p-3 flex items-center justify-center flex-col gap-1">
                                <Link to={`/post/${post?._id}`} className="btn btn-primary btn-xs"><span>Details</span></Link>
                                <Link to={`/updatePost/${post?._id}`} className="btn btn-accent btn-xs"><span>Edit</span></Link>
                                <button onClick={() => handleDelete(post?._id)} className="btn btn-secondary btn-xs"><span>Delete</span></button>
                            </td>
                        </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
                            </div>
                        ) : (
                            <button disabled className="mt-4 bg-blue-300 text-gray-500 cursor-not-allowed font-semibold py-2 px-4 rounded w-full max-w-xs">You have nothing to manage</button>
                        )}
        </div>
    );
};

export default ManageMyPost;