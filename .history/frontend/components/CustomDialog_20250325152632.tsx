"use client"

import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  
  );
}

export enum DialogTypes {
    CONFIRM = "confirm"
}

interface CustomDialogProps {
    classname?:string
    children:React.ReactNode
    DialogType:DialogTypes
}
const CustomDialog = (props:CustomDialogProps) => {
 switch(props.DialogType){
    case DialogTypes.CONFIRM:
 }
}

export default CustomDialog
