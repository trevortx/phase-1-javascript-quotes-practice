// load quotes on page load
document.addEventListener("DOMContentLoaded", fetchExistingQuotes())

// fetches
function fetchExistingQuotes() {
  fetch("http://localhost:3000/quotes?_embed=likes")
  .then(resp => resp.json())
  .then(arrayOfQuotes => quoteHandler(arrayOfQuotes))
}

function submitNewQuote(newQuoteObj) {
  fetch("http://localhost:3000/quotes?_embed=likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newQuoteObj)
  })
  .then(resp => resp.json())
  .then(quote => addQuotes(quote))
}

// break down array of quotes into single quotes, send to addQuotes
function quoteHandler(arrayOfQuotes) {
  arrayOfQuotes.forEach(quote => addQuotes(quote))
}

// submit new quotes
form = document.querySelector("#new-quote-form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const newQuote = e.target.quote.value
  const newAuthor = e.target.author.value
  form.reset()
  const newQuoteObj = {
    "quote": newQuote,
    "author": newAuthor,
    "likes": 0
  }
  submitNewQuote(newQuoteObj)
})

// add quotes to DOM

function addQuotes(quoteObj) {
  // grab anchor for DOM elements, grab each object's ID
  const quoteList = document.querySelector("#quote-list")
  const objID = quoteObj.id

  // create elements
  const liElement = document.createElement("li")
  const blockElement = document.createElement("blockquote")
  const pElement = document.createElement("p")
  const footElement = document.createElement("footer")
  const addBreak = document.createElement("br")
  const likeBtn = document.createElement("button")
  const deleteBtn = document.createElement("button")

  // add classes
  liElement.className="quote-card"
  blockElement.className="blockquote"
  pElement.className="mb-0"
  footElement.className="blockquote-footer"
  likeBtn.className="btn-success"
  deleteBtn.className="btn-danger"


  // append elements
  quoteList.append(liElement)
  liElement.append(blockElement)
  blockElement.append(pElement, footElement, addBreak, likeBtn, deleteBtn)

  // add values
  pElement.innerText = quoteObj.quote
  footElement.innerText = quoteObj.author
  deleteBtn.innerText = "Delete"

  // delete quote
  deleteBtn.addEventListener("click", () => {
    liElement.remove()
  })

  // likes

  const quoteId = { "quoteId": quoteObj.id }
  let numLikes = quoteObj.likes.length
  // const numLikes = getLikes(objID)
  
  // function getLikes(objID) {
  //   fetch("http://localhost:3000/likes")
  //   .then(resp => resp.json())
  //   .then(data => {
  //     let data = dataArr
  //     for (let i = 0; i < dataArr.length; i++) {
  //       if (dataArr[i].quoteId === objID) {
  //         numLikes 
  //       }
  //     }
  //   })
  // }

  likeBtn.innerHTML=`Likes: <span class="likes">${numLikes}</span>`
  likeBtn.addEventListener("click", () => addLike(quoteId))

  function addLike(quoteId) {
    fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quoteId)
    })
    .then(resp => resp.json())
    .then((data) => {
      // quoteObj.like.push(data)
      // numLikes = quoteObj.likes.length
      // likeBtn.innerHTML=`Likes: <span class="likes">${numLikes}</span>`
      // let likes = document.querySelectorAll("#likes")
      // likes.innerHTML=`Likes: <span class="likes">${numLikes}</span>`
    // })
    console.log(data)})
  }
}