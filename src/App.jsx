import './app.css'

import { useState } from 'react'


function App() {

// Variabel för att hålla datan som hämtas från 'https://randomuser.me/api/'
  const [user, setUser] = useState(null)

// Variabel som visar använadren om något har gått fel
  const [errorMessage, setErrorMessage] = useState(null)

// Variabel som används för att visa för användaren om sidan laddar
  const [isLoading, setIsLoading] = useState(false)

// Variabel som håller koll på om det är en profil som visas eller inte
  const [profileOnDisplay, setProfileOnDisplay] = useState(false)

// Hämta data från 'https://randomuser.me/api/' med ett fetch anrop
  async function fetchUser() {
    setUser(null)
    setIsLoading(true)
    setProfileOnDisplay(true)
    try {
      const response = await fetch('https://randomuser.me/api/')

      if (!response.ok) {
        throw new Error('Det uppstod ett problem vid fetch anropet')
      }

      const result = await response.json()
      setUser(result)
      setTimeout(() => {
        console.log(user.results[0].email);
      }, 1500);
    } catch (error) {
      console.log(error);
      setErrorMessage('Det gick inte att hämta data.')
    }
    setIsLoading(false)
  }

  return (
    <>
      <h1>Kodövning - Zack Forssberg</h1>
      <div className='menu'>
        {profileOnDisplay ? <p>Hämta en ny profil</p> : <p>Hämta en random profil</p>}
        <input className='button' value='Hämta' type='button' onClick={fetchUser} />

        {errorMessage && (
          <p>{errorMessage}</p>
        )}
        {isLoading && (
          <p>Laddar...</p>
        )}
      </div>

        {user && (
          <div className='flex-container'>
            <img src={user.results[0].picture.large} alt="Profile picture" />
            <div id='info'>
              <p id='profile-name'>{[user.results[0].name.first,' ', user.results[0].name.last]}</p>
              <p><b>Adress: </b>{[user.results[0].location.street.name, ', ', user.results[0].location.street.number]}</p>
              <p><b>Stad: </b>{[user.results[0].location.city, ', ', user.results[0].location.country]}</p>
              <p><b>Email: </b>{user.results[0].email}</p>
              <p><b>Mobilnummer: </b>{user.results[0].cell}</p>
            </div>
          </div>
        )}


    </>
  )
}

export default App
