import React from 'react'
import PropTypes from "prop-types";
import clsx from 'clsx';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';

import { makeStyles } from '@material-ui/core/styles';
import PostComments from './PostComments';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
        maxWidth: '98%',
        margin: '1%',
    },
    open: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
    },
    iconOpened: {
        transform: 'scale(1.1)',
    },
    avatar: {
        backgroundColor: '#254a78',
    },
}));

const PostCard = ({ post, ...props }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [favorite, setFavorite] = React.useState(false);
    
    const handleFavoriteClick = () => {
        setFavorite(!favorite);
    };
    
    let dateStr = new Date().toGMTString();

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={<Avatar className={classes.avatar} />}
                title={post.title}
                subheader={<small>{dateStr.replace(dateStr.substr(-7,7),'')}</small>}
            />
            <CardContent>
                <Typography variant="body2" align="left" color="textSecondary">{ post.body }</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton 
                    onClick={handleFavoriteClick}
                    aria-label="add to favorites"
                >
                    <FavoriteIcon color={favorite ? "error" : "inherit"} />
                </IconButton>
                <IconButton
                    className={clsx(classes.open, {
                        [classes.iconOpened]: open,
                    })}
                    onClick={e=>setOpen(true)}
                    aria-expanded={open}
                    aria-label="show more"
                >
                    <ChatBubbleIcon />
                </IconButton>
            </CardActions>
            <PostComments {...props} post={post} open={open} setOpen={setOpen}/>
        </Card>
    );
}

PostCard.propTypes = {
    post: PropTypes.object.isRequired
}

export default PostCard