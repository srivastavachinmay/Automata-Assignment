import axios from "axios";

const GetUrl = async (request) => {
    console.log(request)
    return await axios.post('https://127.0.0.1:5000/dfa', request)

};

export default GetUrl;