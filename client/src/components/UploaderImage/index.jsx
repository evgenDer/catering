import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Publish as PublishIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import { ACCEPTABLE_FILE_EXTENSIONS } from './constants';
import { validateFileExtension, validateFileSize } from './utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(3),
  },
  deleteButton: {
    padding: 0,
    color: theme.appColors.secondary,
    marginLeft: theme.spacing(3),
  },
  title: {
    padding: theme.spacing(0.5, 1, 0),
  },
  uploadedImage: {
    height: theme.spacing(8.5),
    marginBottom: theme.spacing(1),
  },
  image: {
    color: theme.appColors.grey9,
    marginBottom: theme.spacing(1.5),
  },
}));

const UploaderImage = ({
  setImageUrl,
  setFile,
  imageUrl,
}) => {
  const classes = useStyles();

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onloadend = () => {
        setImageUrl('imageUrl', reader.result);
      };

      setFile(file);

      e.target.value = '';
    }
  };

  const handleDelete = () => {
    setImageUrl('imageUrl', null);
    setFile(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        {imageUrl ? (
          <Grid container>
            <img src={imageUrl} alt="image" className={classes.uploadedImage} />
          </Grid>
        ) : (
          <Typography className={classes.image} variant="body1">Нет загруженного изображения</Typography>
        )}
      </div>
      <Grid container>
        <Button
          component="label"
          color="primary"
          variant="contained"
          endIcon={<PublishIcon />}
        >
          <Typography variant="subtitle2">
            Загрузить
          </Typography>
          <input
            hidden
            multiple
            type="file"
            accept={ACCEPTABLE_FILE_EXTENSIONS.join(',')}
            onChange={handleFileInputChange}
          />
        </Button>
        {imageUrl && (
          <Grid>
            <Button
              className={classes.deleteButton}
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              <Typography variant="caption">Delete</Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

UploaderImage.propTypes = {
  setFile: PropTypes.func,
  setImageUrl: PropTypes.func,
  imageUrl: PropTypes.string,
};

UploaderImage.defaultProps = {
  imageUrl: null,
  setFile: () => { },
  setImageUrl: () => { },
};

export default UploaderImage;
