import { default as UUID } from 'node-uuid'
import * as Constants from "./Constants"

export function fetchCommentsByPostId (postid) {
    return fetch(Constants.BASE_URL + '/posts/' + postid + '/comments', {
        headers: Constants.HEADERS,
        method: 'GET'
    }).then(res => res.json())
}

export function addComment (comment) {
    comment.id = UUID.v4();
    comment.timestamp = Date.now();
    return fetch(Constants.BASE_URL + '/comments', {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            id: comment.id,
            timestamp: comment.timestamp,
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId
        })
    }).then(res => res.json())
}

export function updateComment (comment) {
    comment.timestamp = Date.now();
    return fetch(Constants.BASE_URL + '/comments/' + comment.id, {
        headers: Constants.HEADERS,
        method: 'PUT',
        body: JSON.stringify({
            timestamp: comment.timestamp,
            body: comment.body
        })
    }).then(res => res.json())
}

export function deleteComment (comment) {
    return fetch(Constants.BASE_URL + '/comments/' + comment.id, {
        headers: Constants.HEADERS,
        method: 'DELETE'
    }).then(res => res.json())
}

export function upVote (comment) {
    return fetch(Constants.BASE_URL + '/comments/' + comment.id, {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            option: 'upVote'
        })
    }).then(res => res.json())
}

export function downVote (comment) {
    return fetch(Constants.BASE_URL + '/comments/' + comment.id, {
        headers: Constants.HEADERS,
        method: 'POST',
        body: JSON.stringify({
            option: 'downVote'
        })
    }).then(res => res.json())
}