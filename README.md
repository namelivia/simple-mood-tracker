# Simple mood tracker [![Build Status](https://travis-ci.com/namelivia/simple-mood-tracker.svg?branch=master)](https://travis-ci.com/namelivia/simple-mood-tracker) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/8c1c1cfc150a4fb6815c0089c8005035)](https://www.codacy.com/app/ohcan2/simple-mood-tracker?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=namelivia/simple-mood-tracker&amp;utm_campaign=Badge_Grade)

Dead simple mood tracking service API, just stores the daily mood as an integer on the database, just a little bit more sofisticated than pen and paper.

## Requirements

`Mysql`, `nodejs` and `npm` are required. `systemd` is optional but recommended.

## Installation

After cloning the project navigate to it's folder and execute `npm install`. 
Next create a MySQL database, and execute on it the query located `queries/create-moods-table.sql` to create the table that will hold the mood records.

Then copy or rename `config.js.example` on the `config` folder to `config.js` and replace `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD` and `DATABASE_NAME` with the data corresponding to the database you just created, then set `HOST` as `0.0.0.0` if you plan to connect to the API from another host or `127.0.0.1` if you are going to connect from the same host. Finally set `PORT` to any free port you like for example `3000`.

To ensure the application will be always up and running I recommend using `systemd` that's why I've included an example service file, as a root user copy `simple-mood-tracker.service.example` to `/lib/systemd/system/simple-mood-tracker.service` and then edit it for replacing `YOUR_NODE_BINARY_PATH` which typically will be use `/usr/bin/node` and `YOUR_INSTALL_PATH` with the path you were when you cloned the project.
After doing that the typical systemd operations can be peformed as root, to start the service do `systemctl start simple-mood-tracker`, to monitor its status `systemctl status simple-mood-tracker` and for running it when the machine is booted `systemctl enable simple-mood-tracker`

## Usage

Currenly the application only has these actions:
 * `GET` request to `/moods` will return all the moood records
 * `POST` request to `/moods` will insert a record for the day the request is done with the provided value in a json like this: `{"value" : 1}`.
 * `DELETE` request to `/moods/1` will delete the record having the id = 1.

## Contributing
Any suggestion, bug reports, localization translations or any other kind enhacements are welcome. Just [open an issue first](https://github.com/namelivia/simple-mood-tracker/issues/new) for creating a PR remember this project has linting checkings so any PR should comply with them before beign merged, this checks will be automatically applied when opening or modifying the PR's.
