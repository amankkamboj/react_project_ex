import React,{useState,useEffect} from 'react';
import "./style.css";
//Get local data from storage
const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData,setInputData]=useState("");
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleButton,setToggleButton] = useState(false);
    const addItem = () =>{
        if(!inputData){
            alert("Enter item");
        }
        else if(inputData && toggleButton){
            // find that editable item
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===isEditItem){
                        return {...curElem,name:inputData};
                    }
                    return curElem;
                })
            )
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else{
            const myInputData={
                id:new Date().getTime().toString(),
                name:inputData
            }
            setItems([...items,myInputData]);
            setInputData("");
        }
    }
// Edit items
const editItem=(index)=>{
    // Find items by id
    const item_todo_edited= items.find((curElem)=>{
        return curElem.id===index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
}


    const deletItem=(index)=>{
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }
    // Remove all items
    const removeAll =()=>{
        setItems([]);
    }
    // adding localstorage
    useEffect(() => {
      localStorage.setItem("mytodolist",JSON.stringify(items));
    }, [items])
    
  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
        <figure>
            <img src='./images/todo.svg' alt='Todo'/>
                <figcaption>
                    Add your list here
                </figcaption>
            </figure>
                <div className='addItems'>
                    <input type="text" placeholder="Add items" className='form-control' value={inputData} onChange={(event)=>setInputData(event.target.value)} />
                    {
                        toggleButton ? <i className="far fa-solid fa-edit edit-btn" onClick={addItem}></i> : <i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
                    }
                    
                </div>
                {/*Show items */}
                <div className='showItems'>
                    {items.map((curElem,index)=>{
                        return(
                            <>
                            <div className='eachItem' key={curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-solid fa-edit" onClick = {()=>editItem(curElem.id)} ></i>
                        <i className="far fa-solid fa-trash-alt" onClick={()=>deletItem(curElem.id)}></i>
                        </div>
                    </div>
                            </>
                        );
                        })}
                    
                </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Todo;