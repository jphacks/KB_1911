import React from 'react';
import {Button, List, ListSubheader, ListItem, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom';

const ROOMS = [
    {id: "大雪で", createdAt: new Date().toDateString(), name: "sample1"},
    {id: "Room for cool people 🔥", createdAt: new Date().toDateString(), name: "room2"},
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
