/********************************************************
Copyright (c) 2022 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 12/09/22
 * 
 * This is a Webex Device macro which prevents the device from
 * entering standby during office hours.
 * 
 * Full Readme and source code available on Github:
 * https://github.com/wxsd-sales/officehours-macro
 * 
 ********************************************************/
import xapi from 'xapi';

/*********************************************************
 * Configure the settings below
**********************************************************/

const config = {};

/*********************************************************
 * Below contains all macros functions
**********************************************************/

xapi.Status.Standby.State.on(manageStandby);

async function manageStandby(event){
  console.log('Standby State: ' +event);
  if(event != 'Standby'){ return }

  const officeHours = await xapi.Config.Time.OfficeHours.Enabled.get();

  if(officeHours == 'False') {
    console.log('Office Hours Disabled');
    console.log('Switching to halfwake')
    xapi.Command.Standby.Halfwake()
    return;
  }
  console.log('Office Hours Enabled');

  const date = new Date();
  const workWeek = await xapi.Config.Time.OfficeHours.WorkWeek.get()
  
  if(!checkWorkday(date, workWeek)) {
    console.log('Not a work day, doing nothing');
    return;
  }

  const end = await xapi.Config.Time.OfficeHours.WorkDay.End.get();
  const start = await xapi.Config.Time.OfficeHours.WorkDay.Start.get()

  if(checkWorkhours(date, start, end)) {
    console.log('Currently within work hours, switching to halfwake')
    xapi.Command.Standby.Halfwake();
  } else {
    console.log('Not within work hours, doing nothing')
  }
  
}

function checkWorkday(date, workWeek){
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return workWeek[weekdays[date.getDay()-1]] == 'True';
}

function checkWorkhours(date, start, end){

  let startDate = new Date(date.getTime());
  startDate.setHours(start.split(":")[0]);
  startDate.setMinutes(start.split(":")[1]);
  startDate.setSeconds(0);

  let endDate = new Date(date.getTime());
  endDate.setHours(end.split(":")[0]);
  endDate.setMinutes(end.split(":")[1]);
  endDate.setSeconds(0);

  return startDate < date && endDate > date
}
