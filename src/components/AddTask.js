import { useState } from "react";

const AddTask = ({onAdd}) => {
    const [text,setText] = useState('')
    const [day,setDay] = useState('');
    const [reminder,setReminder] = useState(false);

    const onSubmit= (e)=>{
        e.preventDefault();

        if(!text){
            alert("please add the task ")
            return
        }

        onAdd({text, day,reminder})
        setText('')
        setDay('')
        setReminder(false)
        
    }


    return (
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label className="form-control label">Task</label>
          <input
            type="text"
            className="form-control input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="form-control label">Date And Time</label>
          <input
            type="text"
            className="form-control input"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="form-control-check">
          <label className="form-control-check label">SetReminder</label>
          <input
            type="checkbox"
            className="form-control-check input"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" value="save" className="btn btn-block" />
      </form>
    );
}

export default AddTask
