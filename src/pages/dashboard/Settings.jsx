import React, { useState } from 'react';
import { TextField, Button, Switch, FormControlLabel, Typography, Box } from '@mui/material';
import { AccountCircle, Notifications, Palette, Language, PrivacyTip, Delete } from '@mui/icons-material';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      // Your delete API call here
      console.log("Account deleted. Implement API logic here.");
      // For example: await axios.delete(`/api/user/${userId}`);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-8">
        <Typography variant="h4" className="font-semibold text-center text-gray-800 mb-8">
          Settings
        </Typography>

        {/* Profile Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <AccountCircle sx={{ fontSize: 50, color: '#4B7BEC' }} />
            <div>
              <Typography variant="h6" className="text-gray-800">Profile</Typography>
              <TextField label="Username" variant="outlined" fullWidth size="small" className="mt-2" />
              <TextField label="Email" variant="outlined" fullWidth size="small" className="mt-2" />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Notifications sx={{ fontSize: 50, color: '#FF4081' }} />
            <div>
              <Typography variant="h6" className="text-gray-800">Notifications</Typography>
              <FormControlLabel
                control={<Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />}
                label="Email Notifications"
                className="mt-2"
              />
              <FormControlLabel
                control={<Switch checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />}
                label="SMS Notifications"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Palette sx={{ fontSize: 50, color: '#4CAF50' }} />
            <div>
              <Typography variant="h6" className="text-gray-800">Theme</Typography>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                label={darkMode ? "Dark Mode" : "Light Mode"}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Language sx={{ fontSize: 50, color: '#2196F3' }} />
            <div>
              <Typography variant="h6" className="text-gray-800">Language</Typography>
              <TextField select label="Select Language" variant="outlined" fullWidth size="small" className="mt-2">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </TextField>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <PrivacyTip sx={{ fontSize: 50, color: '#FF5722' }} />
            <div>
              <Typography variant="h6" className="text-gray-800">Privacy</Typography>
              <FormControlLabel
                control={<Switch />}
                label="Private Account"
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center gap-4">
          <Button
            variant="contained"
            color="primary"
            className="py-2 px-6 rounded-full"
            style={{ fontWeight: 'bold' }}
          >
            Save Changes
          </Button>

          {/* Delete Account Button */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            className="py-2 px-6 rounded-full"
            style={{ fontWeight: 'bold' }}
            onClick={handleDeleteAccount}
          >
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
}
