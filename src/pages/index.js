import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Posts from "../components/posts"
import { graphql } from 'gatsby'

export default class Index extends React.Component {
  render() {

    const {
      data: {
        allMarkdownRemark: { edges },
      },
    } = this.props;
      
    return (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Posts edges={edges} />
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title,
            tags
          }
        }
      }
    }
  }
`