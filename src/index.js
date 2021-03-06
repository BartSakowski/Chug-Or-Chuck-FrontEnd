const beerCard = document.querySelector(".card")
const chugListCard = document.querySelector(".chug-list-card")
const chugContainer = document.querySelector("#chug-list-container")
let beerArray = []
let chugList = []
let chuckList = []


// find or create for User
// 

async function fetchBeers() {
  const resp = await fetch("http://localhost:3000/beers")
  const beers = await resp.json()
  beerArray = beers.data 
  renderBeer(beerArray) 
  console.log("persnickty")
}

function renderBeer(beer) {


  const { brand, name, location, image, uploader_comment, chugs, chucks, comments, users } = beer[0].attributes


  const cardBrand = document.getElementById("brand")
  cardBrand.innerHTML = brand

  const cardName = document.getElementById("bartender")
  cardName.innerHTML = `Bartender: ${name}`

  const cardLocation = document.getElementById("location")
  cardLocation.innerHTML = `Location: ${location}`

  const cardImg = document.querySelector(".beer-avatar")
  cardImg.src = image

  const cardUploaderComment = document.getElementById("uploader_comment")
  cardUploaderComment.innerHTML = uploader_comment

  const chugNum = document.querySelector(".chugLikes")
  chugNum.innerHTML = `${chugs} Chugs`

  const chugId = document.querySelector(".chug-btn").dataset
  chugId.id = `${beer[0].id}`

  const chuckNum = document.querySelector(".chuckLikes")
  chuckNum.innerHTML = `${chucks} Chucks`

  const chuckId = document.querySelector(".chuck-btn").dataset
  chuckId.id = `${beer[0].id}`
  
  const userComments = document.getElementById("user_comments")
  userComments.innerHTML = ""
  comments.forEach(comment => {
    userComments.innerHTML += `<li>${comment.text} -${users.shift().name} </li>`

    
  })

  // users.forEach(user => {
  //   userComments.innerHTML += `<li>-${user.name} </li>`
  // })

}
function addComment() {
  const userComments = document.getElementById("user_comments")
  const commentForm = document.querySelector(".add-comment-form")
  commentForm.addEventListener("submit", (event) => {
    console.log(userComments.children.length)
    event.preventDefault()
    const beerId = document.querySelector(".chug-btn").dataset.id
    const newComment = event.target[0].value
    event.target.reset()
    console.log(event)
    userComments.innerHTML += `<li>${newComment}</li>`
    const reqObj = {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        "text": newComment,
        "user_id": 23,
        "beer_id": beerId
      })
    }
    fetch("http://localhost:3000/comments/", reqObj)
    .then(resp => resp.json())
    // .then(comment => console.log(comment))
  })
}
const chugContainerCard = document.querySelector(".chugContainer")

function addChug() {
  chugContainerCard.addEventListener('click', (event) => {
    event.preventDefault()
    if (event.target.className === "chug-btn") {
      let currentChugs = parseInt(event.target.nextElementSibling.innerHTML)
      const reqObj = {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify ({
          "chugs": currentChugs + 1
        })
      }
      const id = event.target.dataset.id
      // console.log(event.target.dataset)
      fetch(`http://localhost:3000/beers/${id}`, reqObj)
      .then(resp => resp.json())
      // .then(chug => event.target.nextElementSibling.innerHTML = `${currentChugs + 1} Chugs`)
    
      
      let chugItem = beerArray.shift()
      chugList.push(chugItem)
      renderBeer(beerArray)
      loadChugList(chugList)
      // console.log(chugList, "-----")
    }
  })
}

function loadChugList(chugList) {
  const chugListItems = document.getElementById("chug-list-items")
  chugListItems.innerHTML = ""
  chugList.forEach(beer => {
    chugListItems.innerHTML += `<li class="chug-list-beers" data-beer-id=${beer.id}>${beer.attributes.brand}</li>` 
  }
  )
  //
}

function addChuck() {


  chugContainerCard.addEventListener('click', (event) => {

    if (event.target.className === "chuck-btn") {
      let currentChucks = parseInt(event.target.previousElementSibling.innerHTML)
      console.log(currentChucks)
      const reqObj = {
        method: "PATCH",
        headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify ({
          "chucks": currentChucks + 1
        })
      }
      const id = event.target.dataset.id
      fetch(`http://localhost:3000/beers/${id}`, reqObj)
      .then(resp => resp.json())
      // .then(chuck => event.target.previousElementSibling.innerHTML = `${currentChucks + 1} Chucks`)

      let chuckItem = beerArray.shift()
      chuckList.push(chuckItem)
      renderBeer(beerArray)
    }
  })
}

function chugListCardListener() {
  const chugListContainer = document.querySelector("#chug-list-container")
  chugListContainer.addEventListener('click', (event) => {
    if (event.target.className === "chug-list-beers") {
      const currentBeerId = (event.target.dataset.beerId)
      console.log(currentBeerId, '!!!!!!!!')
      
      const chugItem = chugList.find((chug) => chug.id === currentBeerId)
      renderSingleBeer(chugItem)

      // for( let i = 0; i < chugList.length; i++) {
      //   if (chugList[i].id === currentBeerId){
      //     console.log(chugList[i])
      //     renderSingleBeer(chugList[i])
      //    }
    }
    // }
  })
}

function renderSingleBeer(chugListId) {
  console.log(chugListId,"=====")
  chugListCard.style.display='block'
  beerCard.style.display='none'

    const { brand, name, location, image, uploader_comment, chugs, chucks, comments } = chugListId.attributes
    const cardBrand = document.getElementById("brand-list")
    cardBrand.innerHTML = brand
  
    const cardName = document.getElementById("bartender-list")
    cardName.innerHTML = `Bartender: ${name}`
  
    const cardLocation = document.getElementById("location-list")
    cardLocation.innerHTML = `Location: ${location}`
    
    const cardImg = document.querySelector(".beer-avatar-chug")
    cardImg.src = image
    // console.log(cardImg)
    
    const cardUploaderComment = document.getElementById("uploader_comment-list")
    cardUploaderComment.innerHTML = uploader_comment

    const chugNum = document.querySelector(".chugLikes-list")
    chugNum.innerHTML = `${chugs} Chugs`
  
    const chuckNum = document.querySelector(".chuckLikes-list")
    chuckNum.innerHTML = `${chucks} Chucks`
  
    const chuckId = document.querySelector(".chuck-btn-list").dataset
    // console.log(chugListId)
    chuckId.id = `${chugListId.id}`
  

    const overIt = document.querySelector
}

function getOverIt() {
  chugListCard.addEventListener('click', (event) => {
    if (event.target.className === "chuck-btn-list") {
      // console.log(event.target)
      // console.log(chugList[0].id)
      const currentBeerId = event.target.dataset.id

      for( let i = 0; i < chugList.length; i++) {
        if (chugList[i].id === currentBeerId) {
         
          chugList.splice(i, 1);
          break;
        } //else {
        //   console.log('else')
        // }
      }


      loadChugList(chugList)
      console.log(chugList)
    }
  })
}

function app() {
  fetchBeers()
  addChug()
  addChuck()
  chugListCardListener()
  addComment()
  getOverIt()
}

app()