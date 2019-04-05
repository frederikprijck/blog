import React from "react"
import { Link } from "gatsby"
import Tags from './tags'

export default class Post extends React.Component {
  render() {

    const {
      post
    } = this.props;

    const {
      frontmatter: {
        tags
      }
    } = post;

    return (
      <article className="o-article">
        <header className="o-article__header">
            <div className="o-article__header__title">
                <h2>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
                </h2>
            </div>
            <div className="o-article__header__meta">
                <time className="published">{post.frontmatter.date}</time>
            </div>
        </header>
        <main className="o-article__content">
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </main>
        <footer className="o-article__footer">
            <div className="tag-links">
                <Tags tags={tags} />
            </div>
        </footer>
      </article>
    )
  }
}
