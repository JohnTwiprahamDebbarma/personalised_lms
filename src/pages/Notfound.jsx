import { useNavigate } from "react-router-dom";

function Notfound(){
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-100">
            <h1 className="text-9xl font-extrabold text-black">404</h1>
            <div className="bg-red-800 text-white absolute px-2 text-sm rounded rotate-12">Coming soon ...</div>
            <button className="mt-5">
                <a onClick={() => navigate(-1)} className="relative inline-block text-sm font-medium text-white active:text-black focus:outline-non">
                    <span className="relative block px-8 py-3 bg-indigo-700 rounded-full border border-current">Go back</span>
                </a>
            </button>
        </div>
    );
}

export default Notfound;
