const initialState = {
    menu: [],
    items: [],
    loading: true,
    error: false,
    counters: {},
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
            };

        case 'MENU_REQUESTED':
            return {
                ...state,  
                loading: true,
            };

        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };

        case 'ITEM_ADD_TO_CART':
            
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                amount: 1
            };

            if (Object.keys(state.counters).includes(id.toString())) {
                return {
                    ...state,
                    counters: {
                        ...state.counters,
                        [id]: state.counters[id] + 1
                    },
                    total: state.total + newItem.price
                }
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],  
                counters: {
                    ...state.counters,
                    [id]: 1
                },
                total: state.total + newItem.price
            }; 
        
        case 'ITEM_REMOVE_FROM_CART':
            
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const newCounters = Object.assign({}, state.counters);

            delete newCounters[idx];

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                counters: newCounters,
                total: state.total - state.counters[idx] * state.items[itemIndex].price
            }; 
        
        default:
            return state;
    }
}

export default reducer;
