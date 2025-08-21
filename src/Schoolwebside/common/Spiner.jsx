import React from 'react'

const Spiner = () => {
    return (
        <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default Spiner
