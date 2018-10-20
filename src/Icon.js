import React, { Component } from 'react';

class Icon extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <ion-icon
          title={this.props.title}
          name={this.props.name}
          onClick={this.props.onClick}
          >
        </ion-icon>
      </div>

    )
  }
}

export default Icon;
