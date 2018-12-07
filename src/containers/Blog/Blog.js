import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                };
            });
            this.setState({posts: updatedPosts});
        } catch(e) {
            console.log(`Axios error: ${e}`);
        }
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }

    render () {
        console.log('Rendering Blog.js:');
        console.log(this.state.posts);

        const posts = this.state.posts.map(post => (
            <Post
                title={post.title}
                author={post.author}
                key={post.id}
                clicked={() => this.postSelectedHandler(post.id)}
            />
        ));

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;