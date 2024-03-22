

// {
//     doctor: appointment.schedule.doctor,
//     user: appointment.user,
//     schedule: appointment.schedule.id,
//     payment_status: data.payment_status,
//     payment_method: data.payment_method,
//     payment_date: data.payment_date,
//     payment_amount: appointment.doctor.fees,
//   }
const INITIAL_VALUE = {
    appointment_id: "",
    doctor: "",
    user: "",
    schedule: "",
    payment_status: "",
    payment_method: "",
    payment_date: "",
    payment_amount: "",
    payment_transaction_id: "",

}

export default function PaymentReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case "SET_PAYMENT":
            return {
                ...state,
                appointment_id: action.payload.appointment_id,
                doctor: action.payload.doctor,
                user: action.payload.user,
                schedule: action.payload.schedule,
                is_accepted: action.payload.is_accepted,
                payment_status: action.payload.payment_status,
                payment_method: action.payload.payment_method,
                payment_amount: action.payload.payment_amount,
                payment_transaction_id: action.payload.payment_transaction_id,
            }
        default:
            return state
    }
}



