import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'uploadedData';

const Details = () => {
  const [uploadedData, setUploadedData] = useState<
    {
      fileName: string;
      fileSize: number;
      startDate: string;
      endDate: string;
      dataType: string;
    }[]
  >([]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  const handleDelete = (index: number) => {
    const updatedData = uploadedData.filter((_, i) => i !== index);
    setUploadedData(updatedData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    toast.success('File deleted successfully!');
    setDeleteIndex(null);
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) ?? '[]'
    );
    setUploadedData(storedData);
  }, []);
  return (
    <div className="px-[15rem] py-20 text-[#475467]">
      <h1 className="text-3xl text-[#4f54f8] font-medium">
        {uploadedData.length} {uploadedData.length === 1 ? 'File' : 'Files'}{' '}
        Found
      </h1>

      <TableContainer component={Paper} className="mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="!text-[#4f54f8]">File Name</TableCell>
              <TableCell className="!text-[#4f54f8]">
                File Size (Bytes)
              </TableCell>
              <TableCell className="!text-[#4f54f8]">Start Date</TableCell>
              <TableCell className="!text-[#4f54f8]">End Date</TableCell>
              <TableCell align="right" className="!text-[#4f54f8]" />
            </TableRow>
          </TableHead>

          {uploadedData.length ? (
            <TableBody>
              {uploadedData.map((data, i) => (
                <TableRow
                  key={uuidv4()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{data.fileName}</TableCell>
                  <TableCell>{data.fileSize}</TableCell>
                  <TableCell>{data.startDate}</TableCell>
                  <TableCell>{data.endDate}</TableCell>
                  <TableCell align="right">
                    <button
                      className="hover:text-red-500 cursor-pointer transition-all ease-in-out duration-300"
                      onClick={() => {
                        setOpenDeleteModal(true);
                        setDeleteIndex(i);
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <div />
          )}
        </Table>
        {!uploadedData.length && (
          <p className="text-center py-3 text-sm">No records found!</p>
        )}
      </TableContainer>

      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-red-500"
          >
            Confirm Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this file?
          </Typography>

          <div className="flex justify-end space-x-3 mt-5">
            <button
              className="bg-gray-300 px-3 py-2 rounded-md"
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-3 py-2 rounded-md"
              onClick={() => handleDelete(deleteIndex as number)}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Details;
