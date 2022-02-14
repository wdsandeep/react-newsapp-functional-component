import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';


const App = (props) => {

  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

  const setProgressValue = (val) => {
    setProgress(val)
  }

  const categories = [
    {category: "general", path: "/general"},
    {category: "business", path: "/business"},
    {category: "entertainment", path: "/entertainment"},
    {category: "health", path: "health"},
    {category: "science", path: "science"},
    {category: "sports", path: "sports"},
    {category: "technology", path: "technology"},
  ];

    return (
      <div>
      <BrowserRouter>
      <Navbar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Routes>
        <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgressValue} pageSize={20} key="index"  country="in" category="general" />} />
        {/* <Route exact path="/business" element={<News key="business"  pageSize={5} country="in" category="business" />} />
        <Route exact path="/general" element={<News key="general"  pageSize={5} country="in" category="general" />} />
        <Route exact path="/entertainment" element={<News key="entertainment"  pageSize={5} country="in" category="entertainment" />} />
        <Route exact path="/health" element={<News key="health"  pageSize={5} country="in" category="health" />} />
        <Route exact path="/science" element={<News key="science"  pageSize={5} country="in" category="science" />} />
        <Route exact path="/sports" element={<News key="sports"  pageSize={5} country="in" category="sports" />} />
        <Route exact path="/technology" element={<News key="technology"  pageSize={5} country="in" category="technology" />} /> */}
        {categories.map(cat => {
        return <Route key={cat.category} exact path={cat.path} element={<News apiKey={apiKey} setProgress={setProgressValue} key={cat.category} pageSize={25} country="in" category={cat.category} />} />
        })}

      </Routes>
      </BrowserRouter>
      </div>
    )
}
export default App;