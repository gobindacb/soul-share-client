import { Link } from "react-router-dom";


const VolunteerCard = ({need}) => {
    const {_id, category, deadline, thumbnail, post_title, description, location, no_of_volunteer_needs} = need
    return (
        <Link to={`/post/${_id}`} className="max-w-lg p-6 shadow-xl">
            <div className="flex justify-between pb-4 border-bottom">
                <div className="flex items-center">
                    <a rel="noopener noreferrer" href="#" className="mb-0 capitalize dark:text-gray-800">{category}</a>
                </div>
                <button className="btn btn-primary">See Details</button>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <img src={thumbnail} alt="thumbnail" className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                    <div className="flex items-center justify-between text-xs">
                        <div>
                        <p>Deadline: <span className="text-lg text-red-600">{new Date(deadline).toLocaleDateString()}</span></p>
                        <p className="text-sm">Need <span className="text-lg font-bold text-green-500">{no_of_volunteer_needs}</span> volunteer</p>
                        </div>
                        <span title="Location">{location}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <a rel="noopener noreferrer" href="#" className="block">
                        <h3 className="text-xl font-semibold dark:text-violet-600">{post_title}</h3>
                    </a>
                    <p title={description} className="leading-snug dark:text-gray-600">{description.substring(0, 35)}...<span className="text-green-600">see more</span></p>
                </div>
            </div>
        </Link>
    );
};

export default VolunteerCard;