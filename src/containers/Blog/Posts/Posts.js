import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        loading: false
    }

    async componentDidMount() {
        console.log('--> this.props:', this.props);

        if (this.state.posts.length < 1) {
            console.log('No Posts. Loading...');

            try {
                this.setState({loading: true});

                const response = await axios.get('/posts');
                this.setState({posts: response.data.slice(0,4), loading: false});
            } catch(e) {
                console.log(`Axios error: ${e}`);
                //this.setState({ error: true });
            }
        }
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }

    render () {
        let posts = <p style={{textAlign:'center'}} key='0' >Loading!</p>;
        if (!this.state.loading) {
            console.log(`Not loading. Numer of Posts: ${this.state.posts.length}`);

            posts = this.state.posts.map(post => {
                return (
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}
                        />
                    </Link>
                );
            });
        }
        console.log('Posts:', posts);

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;