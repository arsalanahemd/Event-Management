import SimpleBar from 'simplebar-react';
import { styled } from '@mui/material/styles';

export const Scrollbar = styled(SimpleBar)(({ theme }) => ({
  '& .simplebar-wrapper': {
    height: '100%',
  },
  '& .simplebar-content-wrapper': {
    height: '100%',
  },
  '& .simplebar-track': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',  
    width: 10,
    borderLeft: '1px solid rgba(76, 201, 240, 0.05)',  
  },
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: 'rgba(76, 201, 240, 0.25)', 
      borderRadius: '10px',
      transition: 'all 0.3s ease-in-out',
      left: '3px',
      right: '3px',
    },
    '&.simplebar-visible:before': {
      opacity: 1,
      backgroundColor: 'rgba(76, 201, 240, 0.5)',
      boxShadow: '0 0 15px rgba(76, 201, 240, 0.6), inset 0 0 5px rgba(255, 255, 255, 0.2)',
    },
  },
  '& .simplebar-scrollbar.simplebar-active:before': {
    backgroundColor: '#4CC9F0',  
    opacity: 1,
    boxShadow: '0 0 20px rgba(76, 201, 240, 0.8)',
  },
  
  '& .simplebar-track.simplebar-horizontal': {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  }
}));