import axios from "axios";

const apii = axios.create({
    baseURL: 'http://distritalipiranga.website/apidistrital/',
    
});

export default apii;