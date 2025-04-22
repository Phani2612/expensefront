import React from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { FaDollarSign, FaCalendarCheck, FaCalendarAlt, FaMailBulk } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ServiceCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ fontSize: 40, color: '#3f51b5', mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
    </Paper>
  </motion.div>
);

const Services = () => {
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#3f51b5' }}>
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaDollarSign />}
            title="Add Income & Expense"
            description="Easily track your income and expenses. Add and manage them in one place for better budgeting."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaCalendarAlt />}
            title="Sort by Date & Amount"
            description="Sort your records by date and amount for easy tracking of financial history."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaCalendarCheck />}
            title="Event Creation with Google Calendar"
            description="Create financial events directly synced with your Google Calendar to stay organized."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaDollarSign />}
            title="Track Monthly Income & Expense"
            description="Keep track of your monthly financial performance and improve your budgeting skills."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaMailBulk />}
            title="Expense Notification"
            description="Get notified via email when your expenses exceed your income for better management."
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceCard
            icon={<FaCalendarAlt />}
            title="Recurring Expense Reminder"
            description="Never miss a recurring expense. Get timely reminders every month via email."
          />
        </Grid>
      </Grid>

      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 3,
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Services;
