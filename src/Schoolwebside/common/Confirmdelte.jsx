import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function DeleteConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  loading,
  items,
  data,
}) {
  if (!isOpen) return null

  // Prevent modal from closing on outside click
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  // derive a friendly name to show in modal (fallback to firstName/lastName)
  const displayName =
    data?.name ||
    (data ? `${data.firstName || ''} ${data.lastName || ''}`.trim() : '');

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full"
        onClick={stopPropagation}
      >
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">
              Delete {items}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete{' '}
              {displayName ? (
                <span className="font-medium text-blue-400">{displayName}</span>
              ) : null}
              ? This cannot be undone.
            </p>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}