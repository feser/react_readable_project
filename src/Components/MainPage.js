import React from 'react';
import { connect } from 'react-redux'
import { setSortType } from "../actions"
import { Link } from 'react-router-dom'
import Post from "./Post"
import { Nav, NavItem, NavLink } from 'reactstrap';

const MainPage = (props) => {

    const sortPosts = (posts, sortType) => {
        if(posts){
            if(sortType === "timestamp-desc"){
                posts  = posts.sort(function(a,b){
                    return b.timestamp - a.timestamp;
                });
            }else if(sortType === "timestamp-asc"){
                posts = posts.sort(function(a,b){
                    return a.timestamp - b.timestamp;
                });
            }else if(sortType === "votescore-desc"){
                posts = posts.sort(function(a,b){
                    return b.voteScore - a.voteScore;
                });
            }else if(sortType === "votescore-asc"){
                posts  = posts.sort(function(a,b){
                    return a.voteScore - b.voteScore;
                });
            }
        }
        return posts;
    }

    const filterCategory = (posts, categoryFilter) => {
        if(posts && categoryFilter){
            return posts.filter((post) => post.category === categoryFilter);
        }
        return posts;
    }


    const onChangeSortType = (e) => {
        if (!e.target.value) {
            return;
        }
        props.setSortType(e.target.value);
    }


    let posts = {};
    if(props.posts && props.posts.data){
        posts = filterCategory(props.posts.data, props.categoryFilter);
        posts = sortPosts(posts, props.sortType);
    }
    const {categories} = props;
    return (
      <div>
          <Nav pills justified>
              <NavItem key='MainPage' >
                  <NavLink href={'/'} active={props.categoryFilter === undefined}>Main Page</NavLink>
              </NavItem>
              {categories && categories.map && categories.map((category) => (
                  <NavItem key={category.name} >
                      <NavLink href={'/'+category.name} active={props.categoryFilter === category.name}>{category.name}</NavLink>
                  </NavItem>
              ))}
          </Nav>

          <div className="container-fluid">
              <div className="row">
                  <div className="col-12 text-center">
                      <Link to='/addpost'><br/>Add Post<br/></Link>
                  </div>
              </div>
              <div className="row">
                  <div className="col-3 text-left font-weight-bold">
                      Sort By:
                  </div>
                  <div className="col-9 text-left">
                      <select id="sortby" value={props.sortType} onChange={onChangeSortType}>
                          <option value="votescore-desc" >Vote Score Descending</option>
                          <option value="votescore-asc" >Vote Score Ascending</option>
                          <option value="timestamp-desc" >Date Descending</option>
                          <option value="timestamp-asc" >Date Ascending</option>
                      </select>
                  </div>
              </div>
          </div>
          <br/>
          <div>
              {posts && posts.map && posts.map((post) => (
                  <Post key={post.id} post={post} showDetail="true" history={props.history}/>
              ))}
          </div>
      </div>
    );
}

function mapStateToProps ({ posts, categories, sortType }) {
    return {
        posts,
        categories,
        sortType
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setSortType: (sortType) => dispatch(setSortType(sortType))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage)

