import React, { useState } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setUpdatedColor }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>{
        // res.data = the new color object 
        console.log('eddited color');
        // rerun the get request
        setUpdatedColor(true)
        setEditing(false)
        setColorToEdit(initialColor)
      })
      .catch(err =>{
        console.log({err});
      })
      
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res =>{
        console.log('deleted color', color.color);
        const newColors = colors.filter(color => color.id !== res.data)
        updateColors(newColors)
      })
      .catch(err =>{
        console.log({err});
      })
  };

  const addColor =(e)=>{
    e.preventDefault()
    if(colorToAdd.color === '' || colorToAdd.code.hex ===''){
      setAdding(false)
      setColorToAdd(initialColor);
    } else{
      axiosWithAuth()
      .post('/api/colors', colorToAdd)
      .then(res =>{
        updateColors(res.data)
        setAdding(false)
        setColorToAdd(initialColor)
      })
      .catch(err =>{
        console.log(err);
      })
    }
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <h3 className='add-color' onClick={()=>setAdding(true)}>+</h3>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      {adding && (
        <form onSubmit={addColor}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
