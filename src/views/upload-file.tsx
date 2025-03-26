import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface FormState {
  startDate: string;
  endDate: string;
  dataType: string;
  file: File | null;
}

const initialState = {
  startDate: '',
  endDate: '',
  dataType: 'csv',
  file: null,
};

const LOCAL_STORAGE_KEY = 'uploadedData';

const UploadFile = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [uploadedData, setUploadedData] = useState<
    {
      startDate: string;
      endDate: string;
      dataType: string;
      fileName: string;
      fileSize: number;
    }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setUploadedData(JSON.parse(storedData));
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Only CSV and XLSX allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }

    setForm(prev => ({ ...prev, file }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate || !form.file) {
      toast.error('All fields are required.');
      return;
    }

    const newUpload = {
      startDate: form.startDate,
      endDate: form.endDate,
      dataType: form.dataType,
      fileName: form.file.name,
      fileSize: form?.file?.size,
    };

    const updatedData = [...uploadedData, newUpload];
    setUploadedData(updatedData);

    toast.success('Uploading file...');
    setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));

      toast.success('File uploaded successfully!');
      setForm(initialState);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };
  return (
    <div className="px-10 py-5 text-[#475467] flex justify-center items-center min-h-[80vh]">
      <div>
        <p>
          Simply select and upload a CSV or XLSX file (max 5MB)—we'll handle the
          rest!
        </p>

        <div className="borders border-[#4f54f880] rounded-2xl py-8 px-5 w-[25rem]">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <h1 className="text-lg text-[#4f54f8] font-medium">
              Upload a File
            </h1>

            <div>
              <p className="pb-2">Start Date</p>

              <input
                type="date"
                placeholder="Start Date"
                className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="pb-2">End Date</p>

              <input
                type="date"
                placeholder="End Date"
                className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <p className="pb-2">Data Type</p>

              <div className="relative">
                <select
                  className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none appearance-none"
                  name="dataType"
                  value={form.dataType}
                  onChange={handleChange}
                >
                  <option value="csv">CSV</option>
                  <option value="xlsx">XLSX</option>
                </select>

                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FaAngleDown />
                </span>
              </div>
            </div>

            <div>
              <p className="pb-2">Upload File</p>

              <input
                ref={fileInputRef}
                type="file"
                accept={
                  form.dataType === 'csv'
                    ? '.csv'
                    : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
                placeholder="Upload File"
                className="w-full border border-[#dfe3e5] focus-visible:border-[#4f54f8] p-3 rounded-md outline-none"
                onChange={handleFileChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#4f54f8] text-white w-full rounded-md p-3 cursor-pointer mt-5 disabled:opacity-50"
              disabled={!form.startDate || !form.endDate || !form.file}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
