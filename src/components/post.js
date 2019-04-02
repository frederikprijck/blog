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
      <article class="o-article">
        <header class="o-article__header">
            <div class="o-article__header__title">
                <h2>
                <Link to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
                </h2>
            </div>
            <div class="o-article__header__meta">
                <time class="published">{post.frontmatter.date}</time>
            </div>
        </header>
        <main class="o-article__content">
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
        </main>
        <footer class="o-article__footer">
            <div class="tag-links">
                <Tags tags={tags} />
            </div>
        </footer>
      </article>
    )
  }
}
