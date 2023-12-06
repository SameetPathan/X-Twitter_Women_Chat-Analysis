import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCt62376ofNXbydJsVsTWxBihHrILej1dU",
  authDomain: "x-twitter-analysis.firebaseapp.com",
  projectId: "x-twitter-analysis",
  storageBucket: "x-twitter-analysis.appspot.com",
  messagingSenderId: "35251416848",
  appId: "1:35251416848:web:2f645a3121621fe656ff95"
};

export const app = initializeApp(firebaseConfig);

export function register(registerData){
    const dbb = getDatabase();
    set(ref(dbb, 'users/' + registerData.phoneNumber), {
      "name":registerData.name,
      "phoneNumber":registerData.phoneNumber,
      "email":registerData.email,
      "password":registerData.password,
      "confirmPassword":registerData.confirmPassword,
    });
    alert("Registration Successfull")
}






