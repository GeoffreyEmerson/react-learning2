import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
                <Route path="/post" render={() => <FullPost /> } />

            </div>
        );
    }
}

export default Blog;

/*
                <section>
                    <FullPost
                        id={selectedPostId}
                        title={title}
                        author={author}
                        body={body}
                        deletePost={() => this.deletePostHandler(selectedPostId)}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
*/