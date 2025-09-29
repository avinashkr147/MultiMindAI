import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import ReviewResume from './pages/ReviewResume'
import Community from './pages/Community'
import BlogTitle from './pages/BlogTitle'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'



const App = () =>{
  return (
  <>
    <Toaster  position="bottom-right"
  reverseOrder={false}/>
 <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/write-article' element={<WriteArticle/>} />
          <Route path='/blog-titles' element={<BlogTitle/>} />
          <Route path='/generate-images' element={<GenerateImages/>} />
          <Route path='/remove-background' element={<RemoveBackground/>} />
          <Route path='/remove-object' element={<RemoveObject/>} />
          <Route path='/review-resume' element={<ReviewResume/>} />
        <Route path='/ai' element={<Layout />}>
       
          <Route index element={<Dashboard/>} />
          <Route path='community' element={<Community/>} />
        </Route>
      </Routes>
      <Footer/>
      
    
   

  </>

  )
}
export default App
