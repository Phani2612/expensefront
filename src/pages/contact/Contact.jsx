import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
  Alert,
  Box,
} from '@mui/material';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const data = useSelector((state) => state.user.currentUser);
  if (!data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      username: data.data.user.username,
    };

    try {
      const response = await axiosInstance.post('/contact/message', newData);
      const { message } = response.data;
      toast.success(message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'something wrong');
    }
    setFormData({ email: '', phone: '', subject: '', message: '' });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#F3F4F6"
      px={2}
    >
      <Paper
        elevation={10}
        sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 500 }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#3f51b5', fontWeight: 600 }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          We'd love to hear from you! Fill out the form and we'll get in touch.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
          mt={3}
        >
          <TextField
            fullWidth
            required
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            name="subject"
            label="Subject"
            value={formData.subject}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            required
            name="message"
            label="Your Message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Contact;
