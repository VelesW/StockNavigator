import { useState } from "react";
import sendRequest from "./sendRequest";

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