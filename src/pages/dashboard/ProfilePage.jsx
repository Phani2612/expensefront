import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button, Avatar, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { MyBox } from '../../context/Mybox';
import axiosInstance from '../../api/axiosInstance';
import SpinLoader from '../../components/SpinLoader';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/slice/userslice';

export default function ProfilePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setisloading] = useState(false);

  const currentuser = useSelector((state) => state.user.currentUser);

  const Data = useContext(MyBox);

  if (!Data) {
    return null;
  }

  const { userData, setUserData } = Data;

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setUserData((prev) => ({
        ...prev,
        profileImage: file,
      }));
    }
  };

  if (!userData) {
    setUserData(currentuser.data);
  }

  const handleSave = async () => {
    const formData = new FormData();

    for (let key in userData) {
      if (key === 'profileImage' && userData[key] instanceof File) {
        // Append the actual file
        formData.append('profileImage', userData[key]);
      } else if (typeof userData[key] === 'object') {
        // Stringify objects like your google field
        formData.append(key, JSON.stringify(userData[key]));
      } else {
        formData.append(key, userData[key]);
      }
    }

    setisloading(true);

    try {
      const response = await axiosInstance.put(
        `/update/${userData._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const apiResult = await dispatch(getUser(userData._id));

      if (getUser.fulfilled.match(apiResult)) {
      }

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex flex-col items-center space-y-4">
          <Avatar
            alt="Profile Image"
            src={
              selectedImage ||
              userData.profileImage ||
              'https://via.placeholder.com/150'
            }
            sx={{ width: 100, height: 100 }}
            className="mb-4 border-4 border-indigo-500"
          />
          <label className="cursor-pointer text-blue-500 text-sm hover:underline">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <CloudUpload sx={{ fontSize: 20 }} /> Upload Profile Image
          </label>

          <Typography
            variant="h5"
            className="font-semibold text-center text-gray-800"
          >
            Edit Your Profile
          </Typography>

          <div className="w-full space-y-6">
            <div>
              <TextField
                label="Username"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                className="bg-gray-50"
                size="small"
              />
            </div>

            <div>
              <TextField
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                className="bg-gray-50"
                size="small"
              />
            </div>

            <div>
              <TextField
                label="Website"
                name="website"
                value={userData.website}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                className="bg-gray-50"
                size="small"
              />
            </div>

            <div>
              <TextField
                label="LinkedIn"
                name="linkedIn"
                value={userData.linkedIn}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                className="bg-gray-50"
                size="small"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                className="w-full max-w-xs rounded-full py-2 text-white font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Save Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <SpinLoader message="Updating details" />}
    </div>
  );
}
