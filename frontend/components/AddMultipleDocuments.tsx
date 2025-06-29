"use client";
import React from "react";
import { useState } from "react";
import { CalenderHook } from "./context/CalenderProvider";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle } from "@mui/material/";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DashboardHook } from "./context/Dashboardprovider";

interface AddMultipleDocumentsProps {
  children?: React.ReactNode;
  title: string;
  buttonText?: string;
}
const AddMultipleDocuments = ({
  title,
  children,
  buttonText = "Add Documents",
}: AddMultipleDocumentsProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const { contextHolder } = DashboardHook();

  const handleClickOpen = () => {
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <Button
        className="AppointmentCreate"
        onClick={handleClickOpen}
      >
        {buttonText}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={visible}
        style={{ zIndex: 1000 }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          className="dark:bg-[var(--sidebar-background)] dark:text-slate-50"
        >
          {title}
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
        <DialogContent dividers className="dark:bg-[var(--sidebar-background)]">
          {children}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMultipleDocuments;
