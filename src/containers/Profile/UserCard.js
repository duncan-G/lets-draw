import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  content: {
    marginTop: '20px'
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const UserCard = props => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="User" className={classes.avatar}>
            {props.email.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={props.email}
      />
      <CardMedia
        className={classes.media}
        image="/images/logo.svg"
        title="Paella dish"
      />
      <CardContent className={classes.content}>
        <Typography variant="h6">Change Password</Typography>
        {props.renderCardContent()}
      </CardContent>
    </Card>
  );
};

UserCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCard);
