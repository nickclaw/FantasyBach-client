import update from 'react-addons-update';
import { handleActions } from 'redux-actions';

const initialState = {
    user: null,
    season: 1,
    round: null
};

export default handleActions({

    LOAD_USER: {
        next(state, action) {
            return update(state, {
                user: { $set: action.payload }
            });
        }
    },

    LOAD_ROUNDS: {
        next(state, action) {
            const rounds = action.payload;
            return update(state, {
                round: { $set: rounds[rounds.length - 1].id }
            });
        }
    },

    PICK_CONTESTANT: {
        next(state, action) {
            const [roundId, roleId, id] = action.meta;
            return update(state, {
                user: { picks: { [roundId]: { [roleId]: { $set: {
                    contestantId: id
                } } } } }
            });
        }
    },

    UNPICK_CONTESTANT: {
        next(state, action) {
            const [roundId, roleId] = action.meta;
            return update(state, {
                user: { picks: { [roundId]: { [roleId]: { $set: undefined } } } }
            });
        }
    }
}, initialState);
