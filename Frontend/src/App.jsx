import React from 'react'
import { Route, Routes ,useMatch} from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetails from './pages/student/CourseDetails'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'
import Myenrollments from './pages/student/Myenrollments'
import Educator from './pages/educator/Educator'
import DashBoard from './pages/educator/DashBoard'
import AddCourse from './pages/educator/AddCourse'
import MyCourese from './pages/educator/MyCourses'
import StudentEnrolled from './pages/educator/StudentsEndrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
import {ToastContainer  } from 'react-toastify'

const App = () => {

  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div className='text-default min-h-screen bg-white'>
      <ToastContainer/>
      {!isEducatorRoute  &&   <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CoursesList />} />
        <Route path='/course-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<Myenrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='loading/:path/' element={<Loading />} />

        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<DashBoard/>} />
          <Route path='add-course' element={<AddCourse/>} />
          <Route path='my-courses' element={<MyCourese/>} />
          <Route path='student-enrolled' element={<StudentEnrolled/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

