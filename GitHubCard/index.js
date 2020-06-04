/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/sigij5')
  .then(response =>{
    console.log('response', response)
    const myInfo = response.data
    const myCard = cardCreator(myInfo)
    cards.appendChild(myCard)

    axios.get('https://api.github.com/users/sigij5/following')
    .then(response =>{
      console.log('second axios response', response)
      const following = response.data
      following.forEach(user =>{
        followingArray.push(user.login)
      })
      followingArray.forEach(user =>{
        axios.get(`https://api.github.com/users/${user}`)
          .then(response =>{
            const userInfo = response.data
            const userCard = cardCreator(userInfo)
            cards.appendChild(userCard)
          })
          .catch(error =>{
            console.log('error', error)
          })
      })
    })

  })
  .catch(error =>{
    console.log('error', error)
  })


  const cards = document.querySelector('.cards')
//   const cardOpen = document.querySelector('.cards h3')

//   cardOpen.forEach(card =>{
//     card.addEventListener('click', event =>{
//     cards.classList.toggle('.card-open')
//   })
// })

  const followingArray =[]
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/**OLD HARDCODED FOLLOWING ARRAY */


// const followingArray = [
//   'isaac-gorman',
//   'JDMTias',
//   'dhoesle',
//   'AJKemps',
//   'JuniorDugue'
// ];



// followingArray.forEach(user =>{
//   axios.get(`https://api.github.com/users/${user}`)
//     .then(response =>{
//       const userInfo = response.data
//       const userCard = cardCreator(userInfo)
//       cards.appendChild(userCard)
//     })
//     .catch(error =>{
//       console.log('error', error)
//     })
// })


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function cardCreator(userObj){
  const card = document.createElement('div')
  const img = document.createElement('img')
  const info = document.createElement('div')
  const name = document.createElement('h3')
  const username = document.createElement('p')
  const location = document.createElement('p')
  const profile = document.createElement('p')
  const link = document.createElement('a')
  const followers = document.createElement('p')
  const following = document.createElement('p')
  const bio = document.createElement('p')

  card.append(img, info)
  info.append(name, username, location, profile, followers, following, bio)

  card.classList.add('card')
  img.src = userObj.avatar_url
  info.classList.add('card-info')
  name.classList.add('name')
  name.textContent = userObj.name
  username.classList.add('username')
  username.textContent = userObj.login
  location.textContent = `Location: ${userObj.location}`
  link.href = userObj.html_url
  link.target = '_blank'
  link.innerHTML = userObj.html_url
  profile.textContent = `Profile: `

  profile.appendChild(link)

  followers.textContent = `Followers: ${userObj.followers}`
  following.textContent = `Following: ${userObj.following}`
  bio.textContent = `Bio: ${userObj.bio}`

  return card

}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
