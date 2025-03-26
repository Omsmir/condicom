"use client";

import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

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
           <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none" onClick={handleClickOpen}>
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
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
