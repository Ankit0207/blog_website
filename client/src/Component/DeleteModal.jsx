import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, editBlog } from '../Redux/Blogs/action';
import Toast from './Toast';

const DeleteModal = ({ id, handleTrigger }) => {
    const [open, setOpen] = useState(false);
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.blogReducer.isLoading);
    const token = localStorage.getItem("token");

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        handleTrigger();
        setOpen(false);

    }


    const handleDeleteBlog = () => {
        dispatch(deleteBlog(id, token)).then(() => {
            setToastMessage("Blog deleted.")
            setSeverity("success")
            setOpenToast(true);
            handleClose();
        })

    };


    return (
        <div>
            <Button variant="contained"
                onClick={handleClickOpen}>
                Delete Blog
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontSize: '25px', fontWeight: '900' }}>Delete blog</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want delete this blog.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ fontSize: '18px', fontWeight: '600' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteBlog}
                        color="primary"
                        variant="contained"
                        disabled={isLoading} sx={{ fontSize: '18px', fontWeight: '500' }}
                    >
                        {isLoading ? 'Loading...' : 'DELETE'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Toast open={openToast} msg={toastMessage} severity={severity} setOpenToast={setOpenToast} setToastMessage={setToastMessage} />
        </div>
    );
};

export default DeleteModal;
