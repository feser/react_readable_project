import { default as UUID } from 'node-uuid'
import * as Constants from "./Constants"

export function fetchCategories () {
        return fetch(Constants.BASE_URL + '/categories',
            { headers: Constants.HEADERS}).then((res) => res.json()).then(({ categories }) => categories)
}


export function fetchPosts () {
    return fetch(Constants.BASE_URL +  '/posts',
        { headers: Constants.HEADERS}).then((res) => res.json())
}

export function addPost (post) {
    post.id = UUID.v4();
    post.timestamp = Date.now();
    return fetch(Constants.BASE_URL + '/posts', {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category
        })
    }).then(res => res.json())
}

export function updatePost (post) {
    return fetch(Constants.BASE_URL + '/posts/' + post.id, {
        headers: Constants.HEADERS,
        method: 'PUT',
        body: JSON.stringify({
            title: post.title,
            body: post.body
        })
    }).then(res => res.json())
}

export function deletePost (post) {
    return fetch(Constants.BASE_URL + '/posts/' + post.id, {
        headers: Constants.HEADERS,
        method: 'DELETE'
    }).then(res => res.json())
}

export function upVote (post) {
    return fetch(Constants.BASE_URL + '/posts/' + post.id, {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            option: 'upVote'
        })
    }).then(res => res.json())
}

export function downVote (post) {
    return fetch(Constants.BASE_URL + '/posts/' + post.id, {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            option: 'downVote'
        })
    }).then(res => res.json())
}