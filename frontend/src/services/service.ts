import { useState } from "react";
import takeRequestData from "./sendRequest";
import sendRequest from "./sendRequest";

class MainService {
    private jwtToken = sessionStorage.getItem("access_token")
    private userId = sessionStorage.getItem("userId")

    getUserShares() {

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