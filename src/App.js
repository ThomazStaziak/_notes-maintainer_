import React, { Component } from 'react'
import logo from './logo.svg'
import Input from './Input'
import Button from './Button'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      li: []
    }
  }

  listTasks() {
    fetch('http://localhost:8000/api/listTasks/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((response) => {

        this.setState({
          li: response
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

  updateTask(id) {
    fetch(`http://localhost:8000/api/updateTask/${id}`, {
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

  validarStatus(numero) {
    if (numero < 1) {
      return "A Fazer"
    } else {
      return "Feito"
    }
  }

  render() {
    return (
      <div>
          {
            // this.state.li.map((object) =>
            //   object.map((object) =>
            //     <li key={object.id}>{object.text}</li>
            //   )
            // )
          }
       <div className="App">
          {this.state.li.map((object) =>
            <div>
              <li key={object.id}>
                <b>Tarefa:</b> {object.text}
                <b> Status: </b> {this.validarStatus(object.status)}
                <Button title="Feito" onClick={() => {this.updateTask(object.id)}} />
                <Button title="Apagar" onClick={() => {this.deleteTask(object.id)}} />
              </li>
            </div>
          )}
        </div>
        <div className="top">
          <Input type="text" onChange={(e) => this.saveName(e)} />
          <Button title="Adicionar Tarefa!" onClick={() => this.addTask()}/>
        </div>
      </div>
    )
  }
}

export default App
