"use client"

import React from 'react'



export enum FilterTypes {
    SELECT = "select",
    SEARCH = "search"
}

interface CustomFilterProps {
    type:FilterTypes;
    placeholder:string;
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>
}
const CustomFilter = ({props}:{props:CustomFilterProps}) => {
  switch(props.type){

  }
}

export default CustomFilter
