import { Typography } from '@mui/material';
import { styled } from '@mui/styles';

const PageTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(1),
}));

export default PageTitle;
