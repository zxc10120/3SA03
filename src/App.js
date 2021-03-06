import React from 'react';
import CharacterCard from './CharacterCard';
import './App.css';
import _ from 'lodash';
 
let message = 'ไทย'
 
const prepareStateFromWord = (given_word) => {
  let word = given_word.toUpperCase()
  let chars = _.shuffle(Array.from(word))
  return {
    word,
    chars,
    attempt: 1,
    guess: [],
    completed: false
  }
}
 
class App extends React.Component {
 
  state = prepareStateFromWord(message);
 
  activationHandler = (c) => {
    let guess = [...this.state.guess, c]
    this.setState({ guess })
    if (guess.length == this.state.chars.length) {
      if (guess.join('').toString() == this.state.word) {
        this.setState({ guess: [], completed: true })
        this.setState({ guess: [], falsed: false })
      } else {
        this.setState({ guess: [], completed: false })
        this.setState({ guess: [], attempt: this.state.attempt + 1 })
        this.setState({ guess: [], falsed: true })
      }
    }
  }
 
  render() {
    return (
      <div>
        {
          Array.from(this.state.chars).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
        <h2>ที่เลือกอยู่</h2>
        {
          Array.from(this.state.guess).map((item, index) => (
            <CharacterCard
              value={item}
              key={index}
              activationHandler={this.activationHandler}
            />
          ))
        }
        <div>ทดลองครั้งที่ {this.state.attempt}</div>
        {
          this.state.completed && <h4>ถูกต้อง!!!</h4>
        }
        {
          this.state.falsed && <h4>ผิดนะค้าบ ลองใหม่อีกที</h4>
        }
      </div>
    )
  }
}
 
export default App;