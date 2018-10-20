import React, { Component } from 'react'
import NavBar from './NavBar'
import Input from './Input'
import Icon from './Icon'
import './App.css'
import './Grid.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      notes: [],
      favorite: []
    }
  }

  listTasks() {
    this.setState({
      notes: [],
      favorite: []
    })
    fetch('http://localhost:8000/api/listTasks/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((response) => {
        response.forEach((value, index) => {
          if (value.status === 0) {
            this.setState({
              notes: [
                ...this.state.notes,
                response[index]
              ]
            })
          } else {
            this.setState({
              favorite: [
                ...this.state.favorite,
                response[index]
              ]
            })
          }
        })
      })
  }

  addTask() {
    fetch('http://localhost:8000/api/addTask/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        tarefa: this.state.input
      })
    })
      .then((response) => response.json())
      .then(() => {
        this.listTasks()
      })
  }

  saveName(e) {
    this.setState({
      input: e.target.value
    })
  }

  updateTask(id, status) {
    fetch(`http://localhost:8000/api/updateTask/${id}/${status}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then(() => {
      this.listTasks()
    })
  }

  deleteTask(id) {
    fetch(`http://localhost:8000/api/deleteTask/${id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then(() => {
      this.listTasks()
    })
  }

  componentDidMount() {
    this.listTasks()
  }

  checkStatus(numero) {
    if (numero < 1) {
      return 'A Fazer'
    } else {
      return 'Feito'
    }
  }

  render() {
    return (
    <div>
      <NavBar className="custom-navbar navbar navbar-light bg-light" classNameLogo="custom-logo" />
      <div className="Container">
       <div className="Done cards">
         <h3 align="center">Done</h3>
         <hr/>
          {this.state.notes.map((object) =>
            <div>
              <li className="Item" key={object.id}>
                <div className="Content">
                  <b>Título:</b> {object.text} <br/>
                  <p>lorem ipsum dolor asi met</p>
                </div>
                <Icon className="Set-todo" title="DESFAZER" name="heart-dislike" onClick={() => {this.updateTask(object.id, 'aFazer')}} />
                <Icon className="Delete" title="APAGAR" name="trash" onClick={() => {this.deleteTask(object.id)}} />
              </li>
            </div>
          )}
        </div>
        <div className="Note cards">
          <h3 align="center">Notes</h3>
          <hr/>
            {this.state.favorite.map((object) =>
              <div>
                <li className="Item" key={object.id}>
                  <div className="">
                    <b>Título:</b> {object.text} <br/>
                    <p>lorem ipsum dolor asi met</p>
                  </div>
                  <Icon className="Set-todo" title="FAVORITAR" name="heart" onClick={() => {this.updateTask(object.id, 'feito')}} />
                  <Icon className="Delete" title="APAGAR" name="trash" onClick={() => {this.deleteTask(object.id)}} />
                </li>
              </div>
            )}
        </div>
        <div className="Top">
          <Input type="text" className="text-center" placeholder="Insira um Título" onChange={(e) => this.saveName(e)} />
          <Icon title="Adicionar Tarefa!" onClick={() => this.addTask()} onEnter={() => {this.addTask()}}/>
        </div>
      </div>
    </div>
    )
  }
}

export default App
