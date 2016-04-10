import Map from './map'
import { Provider } from 'react-redux'

export default ({
    store
}) => (
    <Provider store={store}>
        <Map />
    </Provider>
)