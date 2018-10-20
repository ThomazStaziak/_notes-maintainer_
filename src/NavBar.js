import React, {Component} from  'react'

class NavBar extends Component {
  render() {
    return (
      <nav className={this.props.className}>
        <a className={this.props.classNameLogo} href={this.props.hrefLogo}>
          <img src="https://briggo.com/wp-content/uploads/2016/03/bootstrap-logo.jpg" width="30" height="30" class="d-inline-block align-top" alt=""/>
          Bootstrap
        </a>
      </nav>
    )
  }
}

export default NavBar
