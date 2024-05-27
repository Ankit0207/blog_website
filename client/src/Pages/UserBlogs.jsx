import { Box, Button, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import CardComponent from '../Component/Card'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { deleteBlog, getUserBlogs } from '../Redux/Blogs/action'
import EditModal from '../Component/EditModal'
import DeleteModal from '../Component/DeleteModal'

const UserBlogs = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [trigger, setTrigger] = useState(0);
  const totalBlogs = useSelector((store) => store.blogReducer.totalBlogs);
  const userBlogs = useSelector((store) => store.blogReducer.userBlogs);
  const token = localStorage.getItem("token");

  let params = {
    limit: 10,
    page,
    q: searchParams.get("q")
  }

  const handleTrigger = () => {
    setTrigger(trigger+ 1);
}

useEffect(() => {
  dispatch(getUserBlogs(params, token));
}, [searchParams, trigger])

return (
  <Box >
    <Navbar handleTrigger={handleTrigger}/>

    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {userBlogs.map((el, i) => {
        return <Box key={el?._id} width={"100%"}>
          <CardComponent data={el} />
          <Box sx={{ display: "flex", width: "25%", justifyContent: "space-between" }}>
            <EditModal id={el?._id} handleTrigger={handleTrigger}/>
            <DeleteModal id={el?._id} handleTrigger={handleTrigger}/>
          </Box>
        </Box>
      })}
    </Container >

  </Box >
)
}

export default UserBlogs
