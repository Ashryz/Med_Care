const INITIAL_VALUE={
    strong: "",
    txt: "",
    type: "",
}

export default function AlertReducer(state=INITIAL_VALUE, action){
    switch(action.type){
        case "SET_ALERT":
            return {
                ...state,
                strong: action.payload.strong,
                txt: action.payload.txt,
                type: action.payload.type
            }
        default:
            return state
    }
}
