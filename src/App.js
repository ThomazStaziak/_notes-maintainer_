import React, { Component } from 'react'
import Input from './Input'
import Button from './Button'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      li: [],
      done: []
    }
  }

  listTasks() {
    this.setState({
      done: [],
      li: []
    })
    fetch('http://localhost:8000/api/listTasks/', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((response) => {
        // this.setState({
        //   li: response
        // })
        for (let i = 0; i < response.length; i++) {
          if (response[i].status === 0) {
            this.setState({
              done: [
                ...this.state.done,
                response[i]
              ]
            })
          } else {
            this.setState({
              li: [
                ...this.state.li,
                response[i]
              ]
            })
          }
        }
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

  checkStatus(numero) {
    if (numero < 1) {
      return 'A Fazer'
    } else {
      return 'Feito'
    }
  }

  render() {
    return (
      <div className="Container">
       <div className="Done">
         <h3 align="center">Done</h3>
          {this.state.li.map((object) =>
            <div>
              <li key={object.id}>
                <b>Tarefa:</b> {object.text}
                <b> Status: </b> {this.checkStatus(object.status)}
                <Button title="Feito" onClick={() => {this.updateTask(object.id)}} />
                <Button title="Apagar" onClick={() => {this.deleteTask(object.id)}} />
              </li>
            </div>
          )}
        </div>
        <div>
          <h3 align="center">To Do</h3>
            {this.state.done.map((object) =>
              <div>
                <li key={object.id}>
                  <b>Tarefa:</b> {object.text}
                  <b>Status:</b> {this.checkStatus(object.status)}
                  <Button title="Feito" onClick={() => {this.updateTask(object.id)}} />
                  <Button title="Apagar" onClick={() => {this.deleteTask(object.id)}} />
                </li>
              </div>
            )}
        </div>
        <div className="Top">
          <Input type="text" onChange={(e) => this.saveName(e)} />
          <Button title="Adicionar Tarefa!" onClick={() => this.addTask()} onEnter={() => {this.addTask()}}/>
        </div>
      </div>
    )
  }
}

export default App
