import React, { useState } from 'react'

function Todo() {

  const [state,setState] = useState({
    input_value:"",
    get_index_id:"",
    incomplete: [],
    complete: [],
    get_array_name:""
  })

      const Getvalue = (event) => {
        setState({
            ...state,
            input_value: event.target.value,
          }) 
      };
    
      const Add = () => {
        setState({
            ...state,
          incomplete: [...state.incomplete, state.input_value],
        });
        console.log(state.incomplete);
      };

      const Add_to_Incompleted = (event) => {
          let index = event.target.id;
          var unchecked_value = state.complete[index];
          setState({
            ...state,
          incomplete: [...state.incomplete, unchecked_value],
        });        
        state.complete.splice(index, 1);
      }
    
      const Add_to_Completed = (event) => {
        event.preventDefault()
        setState({
            ...state,
          complete: [...state.complete, state.incomplete[event.target.id]]
        });
       
        state.incomplete.splice(event.target.id, 1);
        console.log(state.incomplete);
      };
    
      const delete_incomplete_Data = (event) => {
          event.preventDefault()
          state.incomplete.splice(event.target.id, 1);
          setState({
              ...state,
            incomplete:state.incomplete
          });
      } 
    
      const delete_Completed_Data = (event) => {
        event.preventDefault()
        state.complete.splice(event.target.id, 1);
        setState({
            ...state,
            complete:state.complete
        });
      }
    
      const edit_data = (event) => {
        document.getElementById("add_button").hidden=true;
        document.getElementById("update_button").hidden=false;
        let class_edit = event.target.className;
        var i = event.target.id;
        state.get_index_id=i;
        state.get_array_name=class_edit;
        if(class_edit === 'edit_incomplete'){
            document.getElementById("new-task").value=state.incomplete[event.target.id];
            setState({
                ...state,
                input_value: state.incomplete[event.target.id],
                get_index_id: state.get_index_id,
                get_array_name: state.get_array_name
            })
        }
        else{
            document.getElementById("new-task").value=state.complete[event.target.id];
            setState({
                ...state,
                input_value: state.complete[event.target.id],
                get_index_id: state.get_index_id,
                get_array_name: state.get_array_name
            })
        }
      }
    
      const Update = () => {
        document.getElementById("add_button").hidden=false;
        document.getElementById("update_button").hidden=true;
        console.log(state.get_index_id);
        console.log(state.get_array_name);
        console.log(state.input_value);
        var c = state.input_value
        var i = state.get_index_id;
        if(state.get_array_name==='edit_incomplete'){
            let temp = state.incomplete;
            temp[i] = c
            setState({
                ...state,
              incomplete: temp
            })
        }
        else{
            let temp = state.complete;
            temp[i] = c
            setState({
                ...state,
                complete: temp,
            })
        }  
      }
      
      return (
        <div className="container">
          <h2>TODO LIST</h2>
          <h3>Add Item</h3>
          <p>
            <input id="new-task" onChange={Getvalue} type="text"/>
            <button id="add_button" onClick={Add}>Add</button>
            <button id="update_button" onClick={Update} hidden>update</button>
          </p>
          <h3>Todo</h3>
          <ul id="incomplete-tasks">
            {state.incomplete.map((item, index) => {
                return (
                    <li>
                      <input type="checkbox" className="check" id={index} onClick={Add_to_Completed} />
                      <label>{item}</label>
                      <input type="text" />
                      <button className="edit_incomplete" onClick={edit_data} id={index}>Edit</button>
                      <button className="delete" onClick={delete_incomplete_Data} id={index}>Delete</button>
                    </li>
                  )
            })}
          </ul>
  
          <h3>Completed</h3>
          <ul id="completed-tasks">
            {state.complete.map((item, index) => (
              <li>
                <input type="checkbox" checked  id={index} onClick={Add_to_Incompleted}/>
                <label>{item}</label>
                <input type="text" />
                <button className="edit" onClick={edit_data} id={index}>Edit</button>
                <button className="delete" onClick={delete_Completed_Data} id={index}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Todo



















