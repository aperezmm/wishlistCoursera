import {
    reducerTravelsDestinations,
    TravelsDestinationsState,
    initializeTravelsDestinationsState,
    InitMyDataAction,
    NewDestinationAction
} from './travel-destination-state.model';
import { TravelDestinationModel } from './travel-destination.model';
describe('reducerTravelsDestinations', () => {
    it('should reduce init data', () => {
        //Setup
        const prevState: TravelsDestinationsState = initializeTravelsDestinationsState();
        const action: InitMyDataAction = new InitMyDataAction(['destination 1', 'destination 2']);
        //Action
        const newState: TravelsDestinationsState = reducerTravelsDestinations(prevState, action);
        //Asserts, solicitamos al codigo productivo una action
        expect(newState.items.length).toEqual(2);
        //assertions
        expect(newState.items[0].name).toEqual('destination 1');

        //TearDown SI FUESE DB
    });

    it('should reduce new item added', () => {
        const prevState: TravelsDestinationsState = initializeTravelsDestinationsState();
        const action: NewDestinationAction = new NewDestinationAction(new TravelDestinationModel('barcelona', 'url'));
        const newState: TravelsDestinationsState = reducerTravelsDestinations(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].name).toEqual('barcelona');
    });
});