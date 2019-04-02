import React from "react"
import { graphql } from "gatsby"
import Layout from './../components/layout'

export default class BlogTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const { markdownRemark } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark


    const Tags = (frontmatter.tags || []).map(tag => <a href="/tags/foo" rel="tag" class="a-badge">{tag}</a>)

    return (
      <Layout>
        <article class="o-article">
          <header class="o-article__header">
              <div class="o-article__header__title">
                  <h2>
                    {frontmatter.title}
                  </h2>
              </div>
              <div class="o-article__header__meta">
                  <time class="published" datetime="2017-01-18">{frontmatter.date}</time>
              </div>
          </header>
          <main class="o-article__content" dangerouslySetInnerHTML={{ __html: html }}>
          </main>
          <footer class="o-article__footer">
              <div class="tag-links">
                  Tags: {Tags}
              </div>
          </footer>
        </article>
        
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`