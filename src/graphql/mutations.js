/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRoom = `mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
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
export const updateRoom = `mutation UpdateRoom($input: UpdateRoomInput!) {
  updateRoom(input: $input) {
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
export const deleteRoom = `mutation DeleteRoom($input: DeleteRoomInput!) {
  deleteRoom(input: $input) {
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
export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    content
    owner
    user
    mention
  }
}
`;
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
    id
    content
    owner
    user
    mention
  }
}
`;
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
    id
    content
    owner
    user
    mention
  }
}
`;
