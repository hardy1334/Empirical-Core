import React from 'react'
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

export default class BlogPostContent extends React.Component {
  constructor(props) {
    super(props)
  }

  renderBodyOrPaywall() {
    if(this.props.displayPaywall) {
      return (
        <div id='quill-article-paywall'>
          <h2>This article is only for Premium users.</h2>
          <p>Quill Premium users have access to a slew of awesome features, including premium reports, priority support, and enhanced professional development opportunities.</p>
          <a href='/premium'>Try Quill Premium <i className='fa fa-star'></i></a>
        </div>
      );
    } else {
      return <ReactMarkdown escapeHtml={false} source={this.props.body} />;
      return <ReactMarkdown escapeHtml={false} source={this.props.body.replace(/\n/g, '<br/>').replace(/><br\/>/g, '>\n').replace(/<br\/></g, '\n<')} />;
    }
  }

  render() {
    const className = this.props.centerImages ? 'center-images' : ''
    return(
      <div className={className}>
        <header>
          <h1>{this.props.title}</h1>
          <img src={this.props.author.avatar} />
          <p className='author'>{this.props.author.name}</p>
          <p className='date'>{moment(this.props.updatedAt).format('MMMM Do, YYYY')}</p>
        </header>
        <main>
          {this.renderBodyOrPaywall()}
        </main>
      </div>
    )
  }
}
