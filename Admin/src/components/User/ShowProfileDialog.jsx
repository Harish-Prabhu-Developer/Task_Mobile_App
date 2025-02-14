//ShowProfileDialog.jsx
import React, { useState } from 'react'
import { IoLockClosed, IoLogOut, IoPerson } from 'react-icons/io5'

const ShowProfileDialog = ({show,handleLogout,handleProfile,handleChangePass}) => {

    
  return (
    <>
        {show && (
                  <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-lg border border-gray-300">
                    <div className="flex flex-col divide-y divide-gray-200">
                      <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-t-lg cursor-pointer"
                           onClick={handleProfile}>
                        <IoPerson size={20} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-800">Profile</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                           onClick={handleChangePass}>
                        <IoLockClosed size={20} className="text-blue-600" />
                        <span className="text-sm font-medium text-gray-800">Change Password</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-red-100 rounded-b-lg cursor-pointer"
                           onClick={handleLogout}>
                        <IoLogOut size={20} className="text-red-500" />
                        <span className="text-sm font-medium text-red-500">Logout</span>
                      </div>
                    </div>
                  </div>
                )}
    </>
  )
}

export default ShowProfileDialog