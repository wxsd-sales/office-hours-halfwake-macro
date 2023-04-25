# Office Hours Halfwake Macro

Welcome to our WXSD DEMO Repo!

This is a Webex Device macro which prevents the device from entering standby during office hours. This ensures that you get access to People Count information during office hours which would normally show as ``-1`` when the device is in standby.

*Everything included is for demo and Proof of Concept purposes only. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.

## Requirements

1. RoomOS/CE 10.17.x or above Webex Device.
2. Web admin access to the device to uplaod the macro.
3. Network connectivity for your Webex Device to make HTTP POSTs directly with your telemetry server.

## Setup

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

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=office-hours-halfwake-macro)
