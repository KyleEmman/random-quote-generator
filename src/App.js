import './styles/App.css';
import React, {useState, useEffect, useRef} from 'react'
import twitter from './images/twitter.png'

function App() {
  const [quoteData, setQuoteData] = useState({quote: '', author: ''})
  const textRef = useRef()
  const authorRef = useRef()
  const newQuoteRef = useRef()
  const twitterRef = useRef()
  const textArray = [textRef, authorRef]
  const buttonArray = [newQuoteRef, twitterRef]

  const randomColorObject = {
    1: "green",
    2: "purple",
    3: "darkblue",
    4: "darkgreen",
    5: "darkmagenta",
    6: "darkviolet"
  }

  function propFinder(obj) {
    const keys = Object.keys(obj) 
    return obj[keys[ keys.length * Math.random() << 0]]
  }

  const randomProp = propFinder(randomColorObject)

  async function fetchData () {
    const response = await fetch("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
    const quotes = await response.json()
    return quotes
  }

  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function getData () {
    fetchData().then(data => {
      setQuoteData(
          {
            quote: data.quotes[0].text,
            author: data.quotes[0].author
          }
        )
    })

    
  }

  useEffect( () => {
    getData()
  }, [])

  useEffect ( () => {
    document.body.style.backgroundColor = randomProp
    document.body.style.transition = "background-color 1s linear"
    textArray.forEach( text => {
      text.current.style.color = randomProp
      text.current.style.transition = "color 1s linear"
    })
    buttonArray.forEach( button => {
      button.current.style.backgroundColor = randomProp
      button.current.style.transition = "background-color 1s linear"
    })
  }, [quoteData])

  return (
    <>
    <main>
      <section id="quote-box">
        <p id="text" ref={textRef} key={Math.random()}>
          {quoteData.quote}
        </p>  
        <div id="author-div">
          <p id="author" ref={authorRef} key={Math.random()}>
            {quoteData.author}
          </p>
        </div>
        <button id= "new-quote" onClick={getData} ref={newQuoteRef}>New quote</button>
        <a href={`https://twitter.com/intent/tweet?hashtags=quotes&text="${quoteData.quote} " ${quoteData.author}`} target="_blank" id="tweet-quote" ref={twitterRef}><i className='fa fa-twitter white-color'></i></a>
      </section>
    </main>
    <div id="by-text"><p>By Kyle E. F. O.</p></div>
    </>
  );
}

export default App;
