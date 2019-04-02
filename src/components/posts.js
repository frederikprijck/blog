import React from "react"
import Post from "../components/post"

export default class Posts extends React.Component {
  render() {

    const {
      edges
    } = this.props;
      
    const Posts = edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge => <Post key={edge.node.id} post={edge.node} />)

    return (
      <div>{Posts}</div>
    )
  }
}
