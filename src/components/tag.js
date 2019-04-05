import React from "react"

export default class Tag extends React.Component {
  render() {

    const {
      tag
    } = this.props;
    
    return (
      <a href="/tags/foo" rel="tag" className="a-badge">{tag}</a>
    )
  }
}
