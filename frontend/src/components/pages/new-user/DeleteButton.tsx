"use client"

import { deleteUser } from '@/app/actions/users/deleteUser'
import { Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({ id }: { id: number }) => {

    const handleDelete = async () => {
        toast.promise(deleteUser(id), {
            loading: 'Deleting user...',
            success: "Deleted successfully!",
            error: (err) => err.message,
        })
    }
    return (
        <button onClick={handleDelete}>
            <Trash2 className="text-red-500 cursor-pointer" />
        </button>
    )
}

export default DeleteButton
