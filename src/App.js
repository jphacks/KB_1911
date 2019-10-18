import React from 'react'

import API, {graphqlOperation} from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import {createPost} from './graphql/mutations'

import config from './aws-exports'
// other imports
import {useEffect, useReducer} from 'react' // using hooks
import {listPosts} from './graphql/queries'
// other imports
import {onCreatePost} from './graphql/subscriptions'

const initialState = {posts: []};
const reducer = (state, action) => {
    switch (action.type) {
        case 'QUERY':
            return {...state, posts: action.posts}
        case 'SUBSCRIPTION':
            return {...state, posts: [...state.posts, action.post]}
        default:
            return state
    }
}

API.configure(config)             // Configure Amplify
PubSub.configure(config);

async function createNewPost() {
    const post = {owner: "Owner", content: "Content"}
    await API.graphql(graphqlOperation(createPost, {input: post}))
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getData()
        const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (eventData) => {
                const post = eventData.value.data.onCreatePost;
                dispatch({type: 'SUBSCRIPTION', post})
            }
        })
        return () => subscription.unsubscribe()
    }, [])

    async function getData() {
        const postData = await API.graphql(graphqlOperation(listPosts))
        dispatch({type: 'QUERY', posts: postData.data.listPosts.items});
    }

    return (
        <div>
            <div className="App">
                <button onClick={createNewPost}>Add Post</button>
            </div>
            <div>{state.posts.map((post, i) => <p key={post.id}>{post.owner} : {post.content}</p>)}</div>
        </div>
    );
}

export default App;