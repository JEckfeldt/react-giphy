import axios from 'axios'
import { useState } from 'react'

const App = () => {
  const [gifState, setGifState] = useState({
    searchName: '',
    gifs: []
  })

  const handleInputChange = ({ target }) => {
    setGifState({ ...gifState, [target.name]: target.value })
  }

  const handleSearchGif = event => {
    event.preventDefault()
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=j6yOF05YP8AGwMifwqeDBZ1RYjr4n0Tj&q=${gifState.searchName}&rating=g&limit=10`)
      .then(({ data: { data } }) => {
        // console.log(gifs)
        //get gifs array
        const gifs = [...gifState.gifs]
        //loop over data and push them all
        data.forEach(newGif => {
          console.log(newGif)
          gifs.push(newGif)
        })
        //overwrite the gifstate gifs arr with the new gifs arr
        setGifState({ ...gifState, gifs})
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Gif Name</label>
          <input 
          type="email" 
          className="form-control"
          name='searchName'
          value={gifState.searchName}
          onChange={handleInputChange}
          />
        </div>
        <button onClick={handleSearchGif} className="btn btn-primary">Submit</button>
      </form>
      <div>
        {
          gifState.gifs.map((gif, i) => (
            <div key={i}>
              <h1>{gif.Titlel}</h1>
              <img src={gif.images.original.url} alt={gif.Title} />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App;
