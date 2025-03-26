"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { cn } from "@/lib/utils";

export enum DialogTypes {
  CONFIRM = "confirm",
}

interface CustomDialogProps {
  classname?: string;
  children: React.ReactNode;
  DialogType: DialogTypes;
  DialogTitle:string
}
const CustomDialog = (props: CustomDialogProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  switch (props.DialogType) {
    case DialogTypes.CONFIRM:
      return (
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            delete
          </Button>
          <Dialog
            open={open}
            
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ zIndex: 1000 }}
            className={cn("",props.classname)}
          >
            <DialogTitle id="alert-dialog-title"  sx={{ fontSize: "18px", fontWeight: "bold" }}
          className="dark:bg-[var(--sidebar-background)] dark:text-slate-50">
              {props.DialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {props.children}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </React.Fragment>
      );
  }
};

export default CustomDialog;
