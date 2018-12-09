import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        postArray: [],
        postData: {},
        authors: {},
        selectedPostId: null,
        error: false
    }

    async componentDidMount() {
        try {
            const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
            const postData = {};
            response.data.forEach(post => {
                postData[post.id] = post;
            });
            const postArray = response.data; //.slice(0, 4);
            console.log('Getting postArray: ', postArray);
            const authors = {};
            postArray.forEach(post => {
                if(!authors[post.userId]) {
                    authors[post.userId] = {name:'Loading author info...'};
                    this.loadUser(post.userId);
                }
            });
            this.setState({postArray, postData, authors});
        } catch(e) {
            console.log(`Axios error: ${e}`);
            this.setState({ error: true });
        }
    }

    loadUser = async (userId) => {
        const response = await axios.get(`/users/${userId}`);
        const authors = this.state.authors;
        authors[userId] = response.data;
        console.log(`loaded data for user:${userId}`, authors[userId]);
        this.setState({authors});
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId:id});
    }

    deletePostHandler = async (postId) => {
        const response = await axios.delete(`/posts/${postId}`);
        console.log('Deleted: ', response);
    }

    render () {
        let posts = <p style={{textAlign:'center'}}>Loading...</p>;
        let selectedPostId, selectedPost, author, title, body;

        if (!this.state.error) {
            posts = this.state.postArray.slice(0,4).map(post => {
                return (
                    <Post
                        title={post.title}
                        author={this.state.authors[post.userId].name}
                        key={post.id}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                );
            });
            if (this.state.selectedPostId) {
                selectedPostId = this.state.selectedPostId;
                selectedPost = this.state.postData[selectedPostId];
                title = selectedPost.title;
                body = selectedPost.body;
                author = this.state.authors[selectedPost.userId].name;
            }
        } else {
            posts = <p>Something went wrong!</p>;
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
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
            </div>
        );
    }
}

export default Blog;