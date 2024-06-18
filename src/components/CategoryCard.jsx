import { Link } from "react-router-dom";


const CategoryCard = ({ post }) => {
    const { _id, category, post_title, location, deadline, thumbnail } = post;
    return (
        <Link to={`/post/${_id}`} className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src={thumbnail} alt="thumbnail" /></figure>
            <div className="card-body">
                <h2 className="card-title">{category}</h2>
                <p>{post_title}</p>
                <div className="flex justify-around">
                    <div>
                        <p>{location}</p>
                        <p>{new Date(deadline).toLocaleDateString()}</p>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">See Details</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;