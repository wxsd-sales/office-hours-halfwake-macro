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
 * Below contains all macros functions
**********************************************************/

// Monitor when the device enters standby
xapi.Status.Standby.State.on(manageStandby);

async function manageStandby(event){
  console.log('Standby State: ' +event);
  if(event != 'Standby'){ return }
  if(await xapi.Config.Time.OfficeHours.Enabled.get() == 'False') {
    console.log('Office Hours Disabled, doing nothing');
    return;
  }
  const date = new Date();
  const workWeek = await xapi.Config.Time.OfficeHours.WorkWeek.get() 
  console.log(workWeek);
  if(!checkWorkday(date, workWeek)) {
    console.log('Not a work day, doing nothing');
    return;
  }
  const end = await xapi.Config.Time.OfficeHours.WorkDay.End.get();
  const start = await xapi.Config.Time.OfficeHours.WorkDay.Start.get()
  const minutes = checkWorkhours(date, start, end);
  if(minutes < 0 ) {
    console.log('Not within work hours, doing nothing')
    return;
  } 
  console.log('Currently within work hours, switching to halfwake')
  console.log('Number of minutes remaining: ' +minutes)
  xapi.Command.Standby.ResetTimer({ Delay: minutes>480 ? 480 : minutes });
}

function checkWorkday(date, workWeek){
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return workWeek[weekdays[date.getDay()-1]] == 'True';
}

function checkWorkhours(date, start, end){
  const startDate = new Date(date.getTime());
  const endDate = new Date(date.getTime());
  startDate.setHours(start.split(":")[0],start.split(":")[1],0);
  endDate.setHours(end.split(":")[0],end.split(":")[1],0);
  return (startDate > date) ? -1 : Math.round((endDate - date)/1000/60)
}
