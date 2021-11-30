import axios             from "axios";
import React, {useState} from "react";

const baseURL = "https://127.0.0.1:5000/dfa";

export default function Requests(response) {
    const [post, setPost] = useState(null);

    React.useEffect(() => {
        axios.post(baseURL).then((response) => {
            setPost(response.data);
        });
    }, []);

    function createPost() {
        axios
            .post(baseURL, {
                title: "Hello World!",
                body: "This is a new post."
            })
            .then((response) => {
                setPost(response.data);
            });
    }

    if (!post) return "No post!"

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}