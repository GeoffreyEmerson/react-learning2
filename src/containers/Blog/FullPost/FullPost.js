import React, { Component } from 'react';
import {  } from 'react-router-dom';

import './FullPost.css';
import axios from '../../../axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    async componentDidMount () {
        console.log('Fullpost props:', this.props);
        const postId = this.props.match.params.id;
        if (postId) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== postId)) {
                try {
                    console.log(`Loading post: ${postId}`);

                    const response = await axios.get(`/posts/${postId}`);
                    this.setState({loadedPost: response.data});
                } catch (err) {
                    this.setState({loadedPost: `${err}`});
                }
            }
        }
    }

    render () {
        console.log('Fullpost state:', this.state);

        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if (!this.state.loadedPost) {
            post = <p style={{textAlign:'center'}}>Loading!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>By {this.state.loadedPost.author || this.state.loadedPost.userId}</p>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.props.deletePost} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;