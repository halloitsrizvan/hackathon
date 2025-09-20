import React from 'react'

function Mahals({ show, onClose, onSelect }) {
    const mahalList = [
        { id: '1', name: 'Mahal A', location: 'City A', description: 'Historic palace with gardens' },
        { id: '2', name: 'Mahal B', location: 'City B', description: 'Ancient fort on a hill' },
        { id: '3', name: 'Mahal C', location: 'City C', description: 'Modern palace with museum' }
      ];
    
      if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <h2 className="text-xl font-bold mb-4">Select a Mahal</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mahalList.map((mahal) => (
            <div
              key={mahal.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                onSelect(mahal.name);
                onClose();
              }}
            >
              <h3 className="text-lg font-semibold">{mahal.name}</h3>
              <p className="text-sm text-gray-600">{mahal.location}</p>
              <p className="text-xs text-gray-500 mt-1">{mahal.description}</p>
            </div>
          ))}
        </div>
        <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Mahals