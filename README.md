# AuVer2-Backend

| Route                              | GET                                                               | PATCH                           | DELETE | POST                            |
|------------------------------------|-------------------------------------------------------------------|---------------------------------|--------|---------------------------------|
| /users                             | List of (id, displayName)                                         | -                               | -      | -                               |
| /users/{user_id}                   | -                                                                 | displayName, userName, password |        | displayName, userName, password |
| /labels                            | List of (id, name, color)                                         | -                               | -      | -                               |
| /labels/{labels_id}                | -                                                                 | name, color                     |        | name, color                     |
| /boards                            | List of (id, name)                                                | -                               | -      | -                               |
| /boards/{board_id}                 | -                                                                 | name                            |        | name                            |
| /tasks                             | List of (id, boardId, title, text, assignedUsers, assignedLabels) | -                               | -      | -                               |
| /tasks/{task_id}                   | -                                                                 | boardId, title, text            |        | title, (boardId, text)          |
| /tasks/{task_id}/users/{user_id}   | -                                                                 | -                               |        |                                 |
| /tasks/{task_id}/labels/{label_id} | -                                                                 | -                               |        |                                 |
