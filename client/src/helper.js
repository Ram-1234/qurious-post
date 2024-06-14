import { useNavigate } from "react-router-dom";


export function Navigate(url){
    let navigate=useNavigate();
     navigate(url);
     return(
        <></>
     )
}

export let When =(created)=>  new Date(created).toGMTString();

let storyTitleStyle={

}

