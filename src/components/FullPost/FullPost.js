import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null,
        postAuthor: null,
    }

    async componentDidUpdate() {
        if (this.props.id && (!this.state.loadedPost || this.props.id !== this.state.loadedPost.id)) {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.props.id}`);
            this.setState({loadedPost: response.data });
            if (response.data.userId) {
                const response2 = await axios.get(`https://jsonplaceholder.typicode.com/users/${response.data.userId}`);
                this.setState({postAuthor: response2.data});
            }
        }
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign:'center'}}>Loading!</p>;
        }
        if (this.props.id && this.state.loadedPost && this.state.postAuthor) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>By {this.state.postAuthor.name}</p>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;