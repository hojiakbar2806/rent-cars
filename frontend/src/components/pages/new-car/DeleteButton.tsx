"use client"

import { deleteCar } from '@/app/actions/cars/deleteCar'
import { Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({ id }: { id: number }) => {

    const handleDelete = async () => {
        toast.promise(deleteCar(id), {
            loading: 'Deleting car...',
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
