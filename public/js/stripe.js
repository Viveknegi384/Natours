/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts.js";
const stripe = Stripe("pk_test_51Sxo89Bb0jjOkGt7DRl3NsDTHG1HQUIH36FnDBrZVrOzBOj80TviPI5uieqO5wMb08bt4CysvNU0uj27uxPwG8wd00AhoewE1p")

export const bookTour = async tourId => {
    try {
        //1) Get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        // console.log('Session:', session);

        //2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log('Error:', err);
        showAlert('error', err);
    }
}