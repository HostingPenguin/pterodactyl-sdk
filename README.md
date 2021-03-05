# @hostingpengu.in/pterodactyl-sdk

A sdk for the api of the populair open-source game server management panel.

## TODO

The Pterodactyl api contains a ton of endpoints which all have to be implemented. Follow the progress below:

-   [ ] [/api/client] Client
    -   [ ] [/account] Account
        -   [ ] GET [/] Account details
        -   [ ] GET [/two-factor] 2FA details
        -   [ ] POST [/two-factor] Enable 2FA
        -   [ ] DELETE [/two-factor] Disable 2FA
        -   [ ] PUT [/email] Update email
        -   [ ] PUT [/password] Update password
        -   [ ] GET [/api-keys] List API keys
        -   [ ] POST [/api-keys] Create API key
        -   [ ] Delete [/api-keys/{identifier}] Delete API key
    -   [ ] [/servers/{server}] Server
        -   [ ] [/databases] Databases
            -   [ ] GET [/] List databases
            -   [ ] POST [/] List databases
            -   [ ] POST [/{database}/rotate-password] Rotate password
            -   [ ] DELETE [/{database}] Delete database
        -   [ ] [/files] File Manager
            -   [ ] GET [/list] List files
            -   [ ] GET [/contents] Get file contents
            -   [ ] GET [/download] Download file
            -   [ ] GET [/rename] Rename file
            -   [ ] POST [/copy] Copy file
            -   [ ] POST [/write] Write file
            -   [ ] POST [/compress] Compress file
            -   [ ] POST [/decompress] Decompress file
            -   [ ] POST [/delete] Delete file
            -   [ ] POST [/create-folder] Create folder
            -   [ ] Get [/upload] Upload file
        -   [ ] [/schedules] Scheduldes
            -   [ ] GET [/] List schedules
            -   [ ] POST [/] Create schedule
            -   [ ] GET [/{schedule}] Schedule details
            -   [ ] POST [/{schedule}] Update schedule
            -   [ ] DELETE [/{schedule}] Delete schedule
            -   [ ] POST [/{schedule}/tasks] Create task
            -   [ ] POST [/{schedule}/tasks/{task}] Update task
            -   [ ] DELETE [/{schedule}/tasks/{task}] Delete task
        -   [ ] [/network] Network
            -   [ ] GET [/allocations] List allocations
            -   [ ] POST [/allocations] Assign allocation
            -   [ ] POST [/allocations/{allocations}] Set allocation note
            -   [ ] POST [/allocations/{allocations}/primary] Set primary allocation
            -   [ ] DELETE [/allocations/{allocations}] Unassign allocation
        -   [ ] [/users] Users
            -   [ ] GET [/] List users
            -   [ ] POST [/] Create user
            -   [ ] GET [/{subuser}] User details
            -   [ ] POST [/{subuser}] Update user
            -   [ ] DELETE [/{subuser}] Delete user
        -   [ ] [/backups] Backups
            -   [ ] GET [/] List backups
            -   [ ] POST [/] Create backup
            -   [ ] GET [/{backup}] Backup details
            -   [ ] GET [/{backup}/download] Download backup
            -   [ ] DELETE [/{backup}] Delete backup
        -   [ ] [/startup] Startup
            -   [ ] GET [/] List variables
            -   [ ] PUT [/variable] Update variable
        -   [ ] [/settings] Settings
            -   [ ] POST [/rename] Rename server
            -   [ ] POST [/reinstall] Reinstall server
    -   [x] [/] ~~List servers~~
    -   [x] [/permissions] ~~List permissions~~
-   [ ] [/api/application] Application
