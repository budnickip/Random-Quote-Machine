import React from 'react';
import './App.css';
import Button from "./components/Button";


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      quotes:[],
      selectedQuoteIndex: null,
      colors:['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#474699", "#78FE3F", "#023424", "#A55922"],
      selectedColorsIndex: null
    }   
    this.selectQuoteIndex = this.selectQuoteIndex.bind(this);
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectColorsIndex = this.selectColorsIndex.bind(this);
    this.wrapperFunction = this.wrapperFunction.bind(this);
  }

  componentDidMount(){
    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json')
      .then(data => data.json())
      .then(quotes => this.setState({ quotes}, this.assignNewQuoteIndex));
  }

  selectQuoteIndex(){
    if(!this.state.quotes.length){
      return;
    }
    return Math.floor(Math.random() * ( this.state.colors.length -1)) + 1;
  }

  selectColorsIndex(){
    if(!this.state.colors.length){
      return;
    }
    var colorIndex = Math.floor(Math.random() * ( this.state.colors.length -1)) + 1;
    document.documentElement.style
    .setProperty('--change-color', this.state.colors[colorIndex]);
    document.body.style.backgroundColor = this.state.colors[colorIndex];
  }

  /*get selectedColor(){
    if(!this.state.colors.length){
      return undefined;
    }
    var colorIndex = this.selectColorsIndex();
    return this.state.colors[colorIndex];
  }*/
  
  get selectedQuote(){
    if(!this.state.quotes.length){
      return undefined;
    }
    console.log(this.state.quotes[this.state.selectedQuoteIndex]);
    return this.state.quotes[this.state.selectedQuoteIndex];
  }

  assignNewQuoteIndex() {
    this.setState({
      selectedQuoteIndex: this.selectQuoteIndex()
    });
  }

  wrapperFunction = () => {
    this.assignNewQuoteIndex();
    this.selectColorsIndex();
}
   
  
  render(){
    return (
      <div className="App">
          <div id="quote-box" className="quote-box">
            <div className="container quote-container">
              <div id="text" className="row">
                <div className="col-md-12 text-center">
                  <p className="quote-text">
                    <i className="fa fa-quote-left">&nbsp;</i> 
                    { this.selectedQuote ? this.selectedQuote.quote : ''}
                  </p>
                </div>
              </div>
              <div className = "row mt-4">
                <div id="author" className="col-md-5 offset-md-7 text-right quote-author">
                 ~ { this.selectedQuote ? this.selectedQuote.author : ''}
                  {this.selectedColor}
                </div>
              </div>
              <div className = "row mt-4">
                <div className= "col-md-6" >
                  <a href={'https://twitter.com/intent/tweet?text=${props.selectedQuote.quote}&hashtags=freecodecamp'} id="tweet-quote"><i class="fab fa-twitter-square social-button"></i></a>
                  <a href="www.twitter.com/intent/tweet" id="tumblr-quote"><i class="fab fa-tumblr-square social-button"></i></a>
                </div>
                <div className = "col-md-6 text-right">
                   <Button clickHandler = {this.wrapperFunction}/>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

document.body.style = 'background: red; color: red';


/*class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }
  MakeChange(){
    document.body.style = 'background: blue; color: blue';
  }
  render(){
  return(
    <div>
      <button id="button" onClick={this.MakeChange}>
        New quote
      </button>
    </div>
  );
  }
}  */



//document.getElementById("button").style.background='#000000';
export default App;
