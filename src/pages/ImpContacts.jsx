import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance"; // Replace "../path/to/axiosInstance" with the actual path to the axiosInstance module.
import { isEmail } from "../helpers/regexMatcher";
import HomeLayout from "../layouts/HomeLayout";



function Contact(){

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })
    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are mandatory");
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid email provided");
            return;
        }
        //axios call here
        try{
            const response = axiosInstance.post("/contact", userInput);
            toast.promise(response, {
                loading: "Submitting your query",
                success: "Form submitted successfully",
                error: "Failed to submit the form"
            });
            const responseData = await response;
            // console.log(responseData);
            if(responseData?.data){
                setUserInput({
                    email: "",
                    name: "",
                    message: ""
                })
            }
        } catch(error){
            toast.error("operation failed....");

        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white">
                    <h1 className="text-3xl font-semibold">Contact form</h1>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">Name</label>
                        <input 
                            id="name"
                            className="bg-transparent border px-2 py-1 rounded-sm text-black"
                            type="text"
                            placeholder="enter your name"
                            name = "name"
                            onChange={handleInputChange}
                            value={userInput.name}
                         />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">Email</label>
                        <input 
                            id="email"
                            className="bg-transparent border px-2 py-1 rounded-sm text-black"
                            type="email"
                            placeholder="enter your email"
                            name = "email"
                            onChange={handleInputChange}
                            value={userInput.email}
                         />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">Message</label>
                        <textarea 
                            id="message"
                            className="bg-white border px-2 py-1 rounded-sm resize-none h-40 text-black"
                            type="text"
                            placeholder="enter your message"
                            name = "message"
                            onChange={handleInputChange}
                            value={userInput.message}
                         />
                    </div>
                    <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg">
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )

}

export default Contact;