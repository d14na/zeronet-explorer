import {Dimensions} from 'react-native';

import Amplitude from 'amplitude';

// import DeviceInfo from 'react-native-device-info';

// import {Client} from 'bugsnag-react-native';

/* Calculate device dimensions. */
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const TrackEvent = function(_eventType) {
    /* DO NOT TRACK DEVELOPMENT */
    if (__DEV__ === true) {
        return console.log('NOT tracking this event in __DEV__');
    }

    /* Initialize Amplitude Id. */
    const amplitudeId = 'beadb78ade3fd20e320417ed123488b4';

    /* Initialize Amplitude. */
    const amplitude = new Amplitude(amplitudeId);

    /* Retrieve device id. */
    // const device_id = DeviceInfo.getUniqueID();
    // console.info('Device Unique Id', device_id);

    /* Set the tracking data. */
    const trackingData = {_eventType};
    // const trackingData = {_eventType, device_id}

    /* Call Amplitude api (DO NOT 'REPORT' THESE ERRORS). */
    // FIXME Filter the common error `Error: Unsuccessful HTTP response`
    amplitude.track(trackingData).catch(e => console.error(e));
};

const Shared = {
    deviceWidth,
    deviceHeight,
    TrackEvent,
};

export default Shared;
