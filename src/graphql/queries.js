/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoom = `query GetRoom($id: ID!) {
  getRoom(id: $id) {
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
export const listRooms = `query ListRooms(
  $filter: ModelRoomFilterInput
  $limit: Int
  $nextToken: String
) {
  listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      messages {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    content
    owner
    user
    mention
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
