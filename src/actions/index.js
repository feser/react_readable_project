import * as PostApi from "../utils/PostApi"
import * as CommentApi from "../utils/CommentApi"

import {
    SET_CATEGORIES,
    SET_POSTS,
    SET_SORT_TYPE,
    ADD_POST,
    UPDATE_POST,
    SET_POST_COMMENTS,
    DELETE_POST,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    SET_ADD_COMMENT_MODAL,
    SET_UPDATE_COMMENT_MODAL,
    SET_CURRENT_UPDATE_COMMENT
} from "./types"


export const setCategories = () => dispatch => (
    PostApi.fetchCategories().then((categories) => {
        dispatch(setCategoriesToStore(categories));
    })
)

export function setCategoriesToStore (categories) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function setSortType (sortType) {
    return {
        type: SET_SORT_TYPE,
        sortType
    }
}

export const setPosts = () => dispatch => (
    PostApi.fetchPosts().then((posts) => {
        dispatch(setPostsToStore(posts));
    })
)

export function setPostsToStore (posts) {
    return {
        type: SET_POSTS,
        posts
    }
}

export const addPost  = (post) => dispatch => (
    PostApi.addPost(post).then(post => (
        dispatch(addPostToStore(post) )
    ))
)

export function addPostToStore(post) {
    return {
        type: ADD_POST,
        post
    }
}

export const updatePost  = (post) => dispatch => (
    PostApi.updatePost(post).then(post => (
        dispatch(updatePostAtStore(post))
    ))
)

export const updateVotePost  = (post) => dispatch => (
    PostApi.upVote(post).then(post => (
        dispatch(updatePostAtStore(post))
    ))
)

export const downVotePost  = (post) => dispatch => (
    PostApi.downVote(post).then(post => (
        dispatch(updatePostAtStore(post) )
    ))
)

export function updatePostAtStore(post) {
    return {
        type: UPDATE_POST,
        post
    }
}

export const deletePost  = (post) => dispatch => (
    PostApi.deletePost(post).then(post => (
        dispatch(deletePostFromStore(post) )
    ))
)

export function deletePostFromStore(post) {
    return {
        type: DELETE_POST,
        post
    }
}

export const setPostComments = (postid) => dispatch => (
    CommentApi.fetchCommentsByPostId(postid).then(comments => {
        dispatch(setPostCommentsToStore(postid,comments));
    })
)

export function setPostCommentsToStore(postid, comments) {
    return {
        type: SET_POST_COMMENTS,
        postid,
        comments
    }
}

export const addComment = (comment) => dispatch =>  (
    CommentApi.addComment(comment).then(comment => {
        dispatch(addCommentToStore(comment));
    })
)

export function addCommentToStore (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const updateComment = (comment) => dispatch => (
    CommentApi.updateComment(comment).then(comment => {
        dispatch(updateCommentAtStore(comment));
    })
)

export const upVoteComment = (comment) => dispatch => (
    CommentApi.upVote(comment).then(comment => {
        dispatch(updateCommentAtStore(comment));
    })
)

export const downVoteComment = (comment) => dispatch => (
    CommentApi.downVote(comment).then(comment => {
        dispatch(updateCommentAtStore(comment));
    })
)

export function updateCommentAtStore (comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const deleteComment = (comment) => dispatch => (
    CommentApi.deleteComment(comment).then(() => {
        dispatch(deleteCommentFromStore(comment));
    })
)

export function deleteCommentFromStore (comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export function setAddCommentModal (open) {
    return {
        type: SET_ADD_COMMENT_MODAL,
        open
    }
}

export function setUpdateCommentModal (open) {
    return {
        type: SET_UPDATE_COMMENT_MODAL,
        open
    }
}

export function setCurrentUpdateComment (comment) {
    return {
        type: SET_CURRENT_UPDATE_COMMENT,
        comment
    }
}