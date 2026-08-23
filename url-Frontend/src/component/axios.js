import axios from "axios";
// import axios from "../../node_modules/axios/index.js";

const Backend = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    
    withCredentials: true
});

export function start()
{
    return Backend.get("/start")
}
 
export function PostMapping(url)
{
    return Backend.post("/api/add",{
        // email : localStorage.getItem("email"),
        url : url
    });
}
export function traverseUsingCode(code)
{
    Backend.get("/api/show/code");
}


// this one is new endpoint in frontend , which is going to map the small url + code to the backend then backend redirects right :3
export function toUrl(code)
{
    Backend.get("/api/url/code");
}

export function MyAllUrls()
{
    return Backend.get("/api/allUrls" ,{
            params : {   //requestbody use ki thi pehle 🥀(GET ke pass RequestBody nhi hoti :3).
                email : localStorage.getItem("email")
            }
        }
    );
}