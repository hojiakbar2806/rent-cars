"use client"

import { deleteCarType } from '@/app/actions/cars/deleteCarType'
import { Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({ id }: { id: number }) => {

    const handleDelete = async () => {
        toast.promise(deleteCarType(id), {
            loading: 'Deleting car-type...',
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
