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
        mention
      }
      nextToken
    }
  }
}
`;
export const onCreateMessage = `subscription OnCreateMessage($owner: String!) {
  onCreateMessage(owner: $owner) {
    id
    content
    owner
    mention
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage($owner: String!) {
  onUpdateMessage(owner: $owner) {
    id
    content
    owner
    mention
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage($owner: String!) {
  onDeleteMessage(owner: $owner) {
    id
    content
    owner
    mention
  }
}
`;
