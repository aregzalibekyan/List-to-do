import './App.css'
import { useState, useEffect } from 'react'
import bin from './assets/bin.png'
import rename from './assets/rename.png'

export default function MainComponent() {
    const [list, setList] = useState(() => {
        const storedList = localStorage.getItem('todoList')
        return storedList ? JSON.parse(storedList) : []
    })

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list))
    }, [list])


    const finalValue = list.map((note, index) => (
        <div key={index} className="note-container">
            {note && <p className='note'>{note}</p>}
            {note && <img src={bin} width='35px;' onClick={() => handleDelete(index)} className='note--bin' />}
            {note && <img src={rename} width='35px;' onClick={() => handleRename(index)} className='note--rename' />}

        </div>
    ))

    function handleDelete(index) {
        const newList = [...list]
        newList.splice(index, 1)
        setList(newList)
    }
    function handleRename(index) {
        const Rename = prompt('Rename your note!');

        if (Rename !== null) {
            if (Rename.length < 15) {
                if (Rename.trim() !== '') {
                    const newList = [...list];
                    newList[index] = Rename.trim(); // Update the value at the specified index
                    setList(newList);
                    localStorage.setItem('todoList', JSON.stringify(newList));
                } else {
                    alert('You need to type out a non-empty value for the note!');
                }
            }
            else if (Rename.length > 15) {
                alert('Sorry! 15 symbols only, maybe bigger version soon')
            }
        }

    }
    function handleChange(event) {

        
            const newValue = event.target.value;
          
            if (newValue.length > 15) {
              alert('Sorry! 15 symbols only, maybe bigger version soon');
              setInputValue(newValue.slice(0, 16)); 
            } else {
              setInputValue(newValue);
            }
          
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (inputValue) {
            if (list.length <= 7) {
                setList(prevArray => [...prevArray, inputValue])
                setInputValue('')
            }
            else {
                alert('Sorry! 8 notes only(you can delete some of your notes) if you need more notes, you can use other version of the site! (soon!)')
            }
        }
        else (
            alert('You need to type out the note!')
        )
    }

    return (
        <main>
            <div className='Main--display'>
                <div className='Main--title'>
                    <h1>List-to-do</h1>
                </div>
                <form className='Main--form'>
                    <input
                        placeholder='Type your note to do.'
                        onChange={handleChange}
                        value={inputValue}
                        className='Main--input'
                    />
                    <button className='Main--Submit' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
                <div className='Main--list'>{finalValue}</div>
            </div>
        </main>
    )
}