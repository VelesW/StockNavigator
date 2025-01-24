import { useState } from "react";
import sendRequest from "./sendRequest";
import { UserDetails } from "../components/panels/main-components/LeftPanel";

class MainService {
    getUserShares() {
        const path = 'api/portfolio/'
        const method = "GET"
        return sendRequest(path,method)
    }

    depositMoney(amount: number) {
        const path = "api/deposit/"
        const method = "POST"
        const requestBody = {
            amount: amount
        }
        return sendRequest(path,method,requestBody)
    }

    widthrawMoney(amount: number) {
        const path = "api/withdrawal/"
        const method = "POST"
        const requestBody = {
            amount: amount
        }
        return sendRequest(path,method,requestBody)
    }

    editUserData(userDetails: UserDetails) {
        const path = "api/profile/update/"
        const method = "POST"
        const requestBody = {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            email: userDetails.email,
            username: userDetails.username
        }
        return sendRequest(path,method,requestBody)
    }

    getAllShares() {

    }

    getUserBalance() {

    }
    
    getUserData() {
        const path = `api/profile/details/`;
        const method = "GET";
        return sendRequest(path,method)
    }
}

const mainService = new MainService();
export default mainService