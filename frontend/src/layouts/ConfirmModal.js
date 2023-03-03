import React from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

function ConfirmModal(props) {
    function cancelHandler() {
        props.onCancel();
    }

    function confirmHandler() {
        props.onConfirm();
    }

    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmHandler}>Yes</Button>
                <Button onClick={cancelHandler} autoFocus>No</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmModal