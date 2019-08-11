import React, { Component } from 'react';
class TOC extends Component {
  render() {
    const _this = this;
    const data = this.props.data;
    const lists = [];
    data.forEach(element => {
      lists.push(<li key={element.id}>
        <a
          data-id={element.id}
          href={`/content/${element.id}`}
          onClick={function (e) {
            e.preventDefault();
            _this.props.onChangePage(e.target.dataset.id);
          }}
        >{element.title}</a></li>);
    });
    return(
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC;