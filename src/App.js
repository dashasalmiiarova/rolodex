import React from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBar from './components/search-box/search-bar.component';
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      monsters:[],
      searchField:''
    };
  };
  
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    //получаем данные в форате json,удобного для javaScript
      .then(response => response.json())
      // .then(users => console.log(users))
      .then(users => this.setState({monsters: users}));
  }
  // in arrow function bind(this) is automatic
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  }
  // second function in search field is called after the first one
  render(){
    // equivalent const monsters = this.state.monsters
    const { monsters, searchField } = this.state; 
    const filteredMonsters = monsters.filter(monster => 
      // includes-проверяет есть ли параметр который мы передали внутри в масиве
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );

    return (
      <div className="App">
        <SearchBar 
          placeholder='search something'
          handleChange={this.handleChange} />
        <CardList monster = {filteredMonsters}/>
      </div>
    );
  }
}

export default App;
// <input type='search' placeholder='search something' onChange={e => this.setState({ searchField: e.target.value })} />