import React , { useEffect, useState } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return[]
  }
}

function App() { 
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show:false, 
    msg:'',
    type:'',
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      //display alert
      showAlert(true, 'danger', 'Please Enter Items')
    }else if(name && isEditing){
      setList(list.map( (item) => {
        if(item.id === editID){
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null);
      setIsEditing(false)
      showAlert(true, 'success', 'Item changed')

    }else{
      showAlert(true, 'success', 'Item added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name};
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, type="", msg="")=>{
    setAlert( {show:show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list')
    setList([]);
  }

  const removeItem = (id) => {
   showAlert(true, 'danger', 'Item removed');
   setList(list.filter( (item) => item.id !== id))
  }
  
  const editItem = (id) => {
   const sepcificItem = list.find( (item) => item.id === id);
   setIsEditing(true);
   setEditID(id)
   setName(sepcificItem.title)
  }

  useEffect( () => {
  localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const onChange = (e) =>{
    setName(e.target.value)
  }

  return (
    <>
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h2>Grocery Bud</h2>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g.egg' value={name} onChange={onChange}/>
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit':'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
      <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem} />
      <button className="clear-btn" onClick={clearList}>Clear Items</button>
    </div>
      )}
    </section> 
    </>
  );
}

export default App;
