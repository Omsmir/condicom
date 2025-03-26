import React from 'react'

const SettingLayout = () => {
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
       <ReusebleForm innerText="Account Info" editState={ProfileEdit} setEditState={setProfileEdit} setAnyState={setAccountEdit} ></ReusebleForm>
    </div>
  )
}

export default SettingLayout
