import React from 'react';
import {Button, List, ListSubheader, ListItem, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';

const ROOMS = [
    {id: 1, createdAt: new Date().toDateString(), name: "xxx便の欠航について"},
    {id: 2, createdAt: new Date().toDateString(), name: "ooo"},
];

export default () => {
    return (
        <List
            subheader={<ListSubheader component="div">List of rooms</ListSubheader>}
            dense>
            {ROOMS.map(room => (
                <ListItem key={room.id} divider>
                    <Button
                        style={{flex: 1}}
                        component={Link}
                        to={`/room/${room.id}`}>
                        <ListItemText
                            primary={room.name}
                            secondary={room.createdAt}
                        />
                    </Button>
                </ListItem>
            ))}
        </List>
    );
}
