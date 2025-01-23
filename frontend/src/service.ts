import sendRequest from "./services/sendRequest";

class MainService {
    private jwtToken = localStorage.getItem("jwt")
    getUserData() {
        return sendRequest()
    }

    getUserShares() {

    }

    getAllShares() {

    }

    getUserBalance() {

    }
}

const mainService = new MainService();
export default mainService