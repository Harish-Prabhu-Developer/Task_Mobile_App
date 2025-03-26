import React from "react";

const ExportNameDialog = ({ showDialog, fileName, setFileName, setShowDialog, handleExport }) => {
  return (
    showDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Export Report</h2>
          <label className="block text-gray-900 font-semibold mb-1">File Name</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={() => setShowDialog(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ExportNameDialog;
