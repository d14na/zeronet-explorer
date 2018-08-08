import Amplitude from 'amplitude'

import DeviceInfo from 'react-native-device-info'

import { Client } from 'bugsnag-react-native'

const TrackEvent = function (_eventType) {
    /* Initialize Amplitude Id. */
    const amplitudeId = 'beadb78ade3fd20e320417ed123488b4'

    /* Initialize Amplitude. */
    const amplitude = new Amplitude(amplitudeId)

    /* Retrieve device id. */
    const device_id = DeviceInfo.getUniqueID()
    console.info('Device Unique Id', device_id)

    /* Set the tracking data. */
    const trackingData = { _eventType, device_id }

    /* Call Amplitude api (DO NOT 'REPORT' THESE ERRORS). */
    amplitude.track(trackingData)
        .catch(e => console.log(e))
}

const Shared = {
    TrackEvent
}

export default Shared
