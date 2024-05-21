import { useState } from 'react';
import '../App.css'

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return <div>
        <header id='head'><h4>Simple Todo Application</h4></header>
        
        <input id="title" type="text" placeholder="Title" onChange={
                function (e) {
                    setTitle(e.target.value);
                }
            } /> <br />
        
        <input id="description" type="text" placeholder="Description" onChange={
            function (e) {
                setDescription(e.target.value);
            }
        }/> <br />
        
        <button id="btn" onClick={() => {
            try {
                    fetch("http://localhost:3000/todo", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            description : description
                        }),
                        headers: {
                            "content-type" : "Application/json"
                        }
                    })
                    .then(async (res)=>{
                        const json = await res.json();
                        console.log(json);
                        alert("Todo has been created");
                    })
            }catch(e){
                alert("Error Occured..");
                console.log(e.target.value);
            }
        }}>Add Todo</button>
</div>
}