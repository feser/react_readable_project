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
} from "../actions/types"
import { combineReducers } from 'redux'

const initialCategoriesState = {}

function categories (state = initialCategoriesState, action) {
    switch (action.type) {
        case SET_CATEGORIES :
            return action.categories;
        default :
            return state;
    }
}

const initialPostsState = {}

function posts (state = initialPostsState, action) {
    switch (action.type) {
        case SET_POSTS :
            return {
                ...state,
                data: action.posts.filter(post => post.deleted === false)
            }
        case ADD_POST :
            return{
                ...state,
                data: state.data.concat([ action.post ])
            }
        case UPDATE_POST:
            return{
                ...state,
                data: state.data.map((post) => {return post.id === action.post.id ? action.post : post})
            }
        case DELETE_POST:
            return{
                ...state,
                data: state.data.filter(post => post.id !== action.post.id)
            }
        default :
            return state;
    }
}

const initialCommentsState = {}

function comments (state = initialCommentsState, action) {
    switch (action.type) {
        case SET_POST_COMMENTS :
            return {
                ...state,
                [action.postid]: action.comments.filter(comment => comment.deleted === false)
            }
        case ADD_COMMENT :
            return {
                ...state,
                [action.comment.parentId]: state[action.comment.parentId].concat([action.comment])
            }
        case UPDATE_COMMENT :
            return {
                ...state,
                [action.comment.parentId]: state[action.comment.parentId].map((comment) =>
                {return comment.id === action.comment.id ? action.comment : comment})
            }
        case DELETE_COMMENT :
            return {
                ...state,
                [action.comment.parentId]: state[action.comment.parentId].filter(comment => comment.id !== action.comment.id)
            }
        default :
            return state;
    }
}

const initialSortType = 'votescore-desc';

function sortType (state = initialSortType, action) {
    switch (action.type) {
        case SET_SORT_TYPE :
            return action.sortType;
        default :
            return state;
    }
}

const initialAddCommentModal = false;

function addCommentModal (state = initialAddCommentModal, action) {
    switch (action.type) {
        case SET_ADD_COMMENT_MODAL :
            return action.open;
        default :
            return state;
    }
}

const initialUpdateCommentModal = false;

function updateCommentModal (state = initialUpdateCommentModal, action) {
    switch (action.type) {
        case SET_UPDATE_COMMENT_MODAL :
            return action.open;
        default :
            return state;
    }
}

const initialCurrentUpdateComment = {};

function currentUpdateComment (state = initialCurrentUpdateComment, action) {
    switch (action.type) {
        case SET_CURRENT_UPDATE_COMMENT :
            return action.comment;
        default :
            return state;
    }
}


export default combineReducers({
    categories,
    posts,
    comments,
    sortType,
    addCommentModal,
    updateCommentModal,
    currentUpdateComment
})

