import React from "react"
import { graphql } from "gatsby"
import Layout from './../components/layout'
import { DiscussionEmbed } from "disqus-react";

export default class BlogTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const { markdownRemark } = data 
    const { id, frontmatter, html } = markdownRemark

    const disqusShortname = "frederikprijck";
    const disqusConfig = {
      identifier: id,
      title: frontmatter.title,
    };
    
    const Tags = (frontmatter.tags || []).map(tag => <a href="/tags/foo" rel="tag" className="a-badge" key={tag}>{tag}</a>)

    return (
      <Layout>
        <article className="o-article">
          <header className="o-article__header">
              <div className="o-article__header__title">
                  <h2>
                    {frontmatter.title}
                  </h2>
              </div>
              <div className="o-article__header__meta">
                  <time className="published" dateTime="2017-01-18">{frontmatter.date}</time>
              </div>
          </header>
          <main className="o-article__content" dangerouslySetInnerHTML={{ __html: html }}>
          </main>
          <footer className="o-article__footer">
              <div className="tag-links">
                  Tags: {Tags}
              </div>
              <div className="comments"><DiscussionEmbed shortname={disqusShortname} config={disqusConfig} /></div>
          </footer>
        </article>
        
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
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