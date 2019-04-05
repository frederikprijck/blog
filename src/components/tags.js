import React from "react"
import Tag from './tag'

export default class Tags extends React.Component {
  render() {

    const {
      tags
    } = this.props;
    
    const Tags = (tags || []).map(tag => <Tag key={tag} tag={tag} />)

    return (
      Tags
    )
  }
}
