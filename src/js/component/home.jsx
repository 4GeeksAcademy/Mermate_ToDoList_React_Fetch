import React , {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { element } from "prop-types";

//create your first component
const ToDoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [toDos, setToDos] = useState([]);

//1 create a function to create a new todo list of a particular user
         function createUser(){
            
            var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
            };

            fetch("https://playground.4geeks.com/apis/fake/todos/user/Mermate", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
            
                    }
//2 Create a function to get tasks from the API (GET)

        function getTasKs(){
             console.log("getListInfo")
            
            fetch("https://playground.4geeks.com/apis/fake/todos/user/Mermate")
            .then(response => response.json())
            .then(data =>{
                console.log(data);
                setToDos(data)

            })
                    
        }

//3  create a function to update tasks (PUT)
         function  updtateTask(){
            console.log("createTask")

            const datos =  toDos.concat({
                "label": inputValue, 
                "done":false
            })
            var requestOptions = {
                method: 'PUT',
                headers:{ 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
                
              };
              
              fetch("https://playground.4geeks.com/apis/fake/todos/user/Mermate", requestOptions)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos)
                    getTasKs()
                })

    
         }

//create a function to delete a task , update tasks (PUT)

         function deleteTask(element){
            console.log("deleteTask")

            let handleDelete = toDos.filter(toDo=>toDo !== element)
            console.log("handeDelete")

              
            var requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(handleDelete)
                
              };
              
              fetch("https://playground.4geeks.com/apis/fake/todos/user/Mermate", requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    getTasKs() 

                })
        }
      
 
  //3 UseEffect para obtener info en cuanto se cargue el componente
        useEffect (()=>{
            console.log( "se cargó el componente")
            createUser()
            getTasKs()
            

            } ,[])


    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue !== "") {
            // add the new task to the list
            setToDos([...toDos, inputValue]);
            updtateTask("");
            
        }
    };
   
        return (
            <div className="container">
                <h1 className="title">ToDos</h1>

                <ul>
                    <li>
                        <input
                            className="inputList"
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyDown={handleKeyDown}
                            placeholder={toDos.length === 1 ? 'No tasks, add a task' : ''}
                        />
                    </li>

                    {toDos.map((item, index) => (
                        <li key={index}>
                            {item.label}
                        <span><button className="deleteButton" onClick={() => deleteTask(item)}>X</button>
                        
                        </span>
                            
                        </li>
                    ))}
                </ul>
                            
            <div className="bottomList">{toDos.length} items left</div>
            </div>
        );
    };

    export default ToDoList;
