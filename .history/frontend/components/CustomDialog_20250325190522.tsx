"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { cn } from "@/lib/utils";
import Dropdown from "./settings/Dropdown";
import CloseIcon from "@mui/icons-material/Close";

export enum DialogTypes {
  CONFIRM = "confirm",
}

interface CustomDialogProps {
  classname?: string;
  children: React.ReactNode;
  DialogType: DialogTypes;
  DialogTitle: string;
  open:boolean
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const CustomDialog = (props: CustomDialogProps) => {

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    propsetOpen(false);
  };
  switch (props.DialogType) {
    case DialogTypes.CONFIRM:
      return (
        <React.Fragment>
          <Dropdown innerText="delete" onclick={handleClickOpen} />

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ zIndex: 1000 }}
            className={cn("", props.classname)}
            fullWidth
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              className="dark:bg-[var(--sidebar-background)] dark:text-slate-50"
            >
              {props.DialogTitle}
            </DialogTitle>
            <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
            <DialogContent sx={{padding:0}}>
                {props.children}
            </DialogContent>
          </Dialog>
        </React.Fragment>
      );
  }
};

export default CustomDialog;
