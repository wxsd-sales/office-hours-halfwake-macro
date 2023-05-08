# Office Hours Halfwake Macro

This is a Webex Device macro which prevents the device from entering standby during office hours. This ensures that you get access to People Count information during office hours which would normally show as ``-1`` when the device is in standby.

## Overview

The Webex Device macro detects if the device is about or has entered a standby states. It then checks if the device is currently operating within office hours and then resets the standby timer which will cause the device to wake up again and stay either in full or half wake mode. This is to ensure the device never enters standby during office hours and therefore ensure that People Count is always working.

## Setup

### Prerequisites & Dependencies: 

- RoomOS/CE 10.17.x or above Webex Device.
- Web admin access to the device to upload the macro.
- Network connectivity for your Webex Device to make HTTP POSTs directly with your telemetry server.


<!-- GETTING STARTED -->

### Installation Steps:
1. Download the ``office-hours-halfwake.js`` and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure the Macro by changing the initial values, there are comments explaining each one.
3. Enable the Macro on the editor.

## Validation

Validated Hardware:

* Room Kit Pro
* Desk Pro
* Desk Hub
* Room Kit

This macro should work on other Webex Devices but has not been validated at this time.
    
## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer

Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=office-hours-halfwake-macro) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
