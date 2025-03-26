"use client"

import React from 'react'

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
    case 
 }
}

export default CustomDialog
