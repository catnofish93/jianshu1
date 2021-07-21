import React from 'react';
import './App.css';
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import store from "./store"
import HeaderC from "./common/header/headerC"
import Content from "./common/content/content";
import Detail from "./common/detail/detail"
import SignIn from "./common/signIn/signIn";
import PageHome from "./common/homePage"
import WriteArticle from "./common/writeArticle"
import LikeArticle from './common/likeArticle'
import shopArticle from './common/colloectArticle'
import collectArticle from './common/collectArticle'
import { Router, Route, hashHistory } from 'react-router'
import "antd/dist/antd.css";
function App() {
  return (
    <Provider className="App" store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
           <Router history={hashHistory}>
              <Route path="/" component={SignIn}></Route>
              <Route path="/view" component={HeaderC}>
                  <Route path="/view/list" component={Content}></Route>
                  <Route path="/view/detail" component={Detail}></Route>
                  <Route path="/pageHome" component={PageHome}></Route>
                  <Route path="/likeArticle" component={LikeArticle}></Route>
                  <Route path="/collectArticle" component={collectArticle}></Route>
                  <Route path="/shopArticle" component={shopArticle}></Route>
              </Route>
              <Route path="/signIn" component={SignIn}></Route>
              <Route path="/WriteArticle" component={WriteArticle}></Route>
           </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
