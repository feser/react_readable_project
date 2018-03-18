import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { setCategories, setPosts } from '../actions'
import MainPage from "./MainPage";
import AddPost from "./AddPost"
import PostDetail from "./PostDetail";
import UpdatePost from "./UpdatePost";

class App extends Component {

    componentDidMount() {
        this.props.setCategories();
        this.props.setPosts();
    }

  render() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/addpost" component={AddPost} />
                    <Route exact path="/editpost/:postId" component={UpdatePost} />
                    <Route exact path="/:category/:postId" component={PostDetail} />
                    {this.props.categories && this.props.categories.map && (
                        this.props.categories.map((category) => (
                            <Route key={category.name} exact path={'/' + category.path} render={() => (
                                <MainPage categoryFilter={category.name}/>
                            )}/>
                        ))
                    )}
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

function mapStateToProps ({ categories }) {
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setCategories: (categories) => dispatch(setCategories(categories)),
        setPosts: (posts) => dispatch(setPosts(posts))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
