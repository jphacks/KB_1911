/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = `subscription OnCreateRoom {
  onCreateRoom {
    id
    name
    messages {
      items {
        id
        content
        owner
        user
        mention
      }
      nextToken
    }
  }
}
`;
export const onUpdateRoom = `subscription OnUpdateRoom {
  onUpdateRoom {
    id
    name
    messages {
      items {
        id
        content
        owner
        user
        mention
      }
      nextToken
    }
  }
}
`;
export const onDeleteRoom = `subscription OnDeleteRoom {
  onDeleteRoom {
    id
    name
    messages {
      items {
        id
        content
        owner
        user
        mention
      }
      nextToken
    }
  }
}
`;
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
    id
    content
    owner
    user
    mention
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
    id
    content
    owner
    user
    mention
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
    id
    content
    owner
    user
    mention
  }
}
`;
