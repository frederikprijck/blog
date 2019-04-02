import React from "react"

export default class Tag extends React.Component {
  render() {

    const {
      tag
    } = this.props;
    
    return (
      <a href="/tags/foo" rel="tag" class="a-badge">{tag}</a>
    )
  }
}
