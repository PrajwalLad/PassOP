import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [allPasswords, setAllPasswords] = useState([]);
    const [passwordArray, setPasswordArray] = useState([])
    const [showPass, setShowPass] = useState(false)
    const [searchText, setsearchText] = useState("")

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setAllPasswords(JSON.parse(passwords))
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    useEffect(() => {
        if (!searchText) {
            setPasswordArray(allPasswords);
        }
    }, [allPasswords, searchText]);

    const copyText = (text) => {
        toast('Copied to clipboard!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        setShowPass(!showPass);
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updated = [...allPasswords, newPassword];
            setAllPasswords(updated);
            setPasswordArray(updated.filter(item => item.site.toLowerCase().includes(searchText.toLowerCase())));
            localStorage.setItem("passwords", JSON.stringify(updated));
            setform({ site: "", username: "", password: "" });
        } else {
            toast('Minimum lengths not fulfilling!!', {
                position: "top-right",
                autoClose: 5000,
                theme: "dark",
            });
        }
    };

    const deletePassword = (id) => {
        const confirmed = confirm("Do you really want to delete this password?");
        if (confirmed) {
            const updated = allPasswords.filter(item => item.id !== id);
            setAllPasswords(updated);
            setPasswordArray(updated.filter(item => item.site.toLowerCase().includes(searchText.toLowerCase())));
            localStorage.setItem("passwords", JSON.stringify(updated));
        }
    };

    const editPassword = (id) => {
        const itemToEdit = allPasswords.find(i => i.id === id);
        setform(itemToEdit);
        const updated = allPasswords.filter(item => item.id !== id);
        setAllPasswords(updated);
        setPasswordArray(updated.filter(item => item.site.toLowerCase().includes(searchText.toLowerCase())));
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const searchMySite = (e) => {
        const value = e.target.value;
        setsearchText(value);
        const filtered = allPasswords.filter(item =>
            item.site.toLowerCase().includes(value.toLowerCase())
        );
        setPasswordArray(filtered);
    };

    const clearSearch = () => {
        setsearchText("");
        setPasswordArray(allPasswords);
    };


    return (
        <>
            <ToastContainer />
            <div className="min-h-[90vh] w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
                <div className="mycontainer text-white">
                    <h1 className='text-4xl font-bold text-center'><span className="text-red-700">&lt;</span>
                        Pass
                        <span className="text-red-700">OP/&gt;</span></h1>
                    <p className='text-red-900 text-center text-lg'>Your own Password Manager</p>
                    <div className="flex flex-col p-3 gap-4 items-center text-white">
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-violet-900 w-full p-3 py-1' type="text" name='site' id='site' />
                        <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-violet-900 w-full p-3 py-1' type="text" name='username' id='username' />
                            <div className="relative">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-violet-900 w-full p-3 py-1' type={showPass ? "text" : "password"} name='password' id='password' />
                                <span className='absolute right-2 top-1.5 cursor-pointer' onClick={showPassword}>
                                    <img className='w-[20px] invert' src={showPass ? "icons/eye-slash-solid.svg" : "icons/eye-solid.svg"} alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className='flex justify-center items-center bg-red-600 rounded-full px-2 py-2 w-fit cursor-pointer hover:bg-red-500'>
                            <FontAwesomeIcon icon={faPlus} className='m-1' />
                            Save
                        </button>
                    </div>

                    <div className="passwords">
                        <div className='search relative'>
                            <input onChange={searchMySite} value={searchText} placeholder='Search your website...' className='rounded-full border border-violet-900 w-full p-3 py-1' type="text" name='search' id='search' />
                            <img className='absolute w-4 right-2.5 top-1.5 invert cursor-pointer' src="icons/cancel.svg" alt="cancel" onClick={clearSearch} />
                        </div>

                        <h2 className='text-2xl font-bold py-2'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length !== 0 && (
                            <table className="table-auto w-full rounded-md overflow-hidden text-wrap">
                                <thead className='bg-violet-800'>
                                    <tr>
                                        <th className='py-1'>Site</th>
                                        <th className='py-1'>Username</th>
                                        <th className='py-1'>Password</th>
                                        <th className='py-1'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='relative py-1 pr-8 border border-white text-center w-40 break-all'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img className='w-4 absolute right-1 top-1.5 invert cursor-pointer' src="icons/copy-solid.svg" alt="copy" onClick={() => copyText(item.site)} />
                                            </td>
                                            <td className='relative py-1 pr-6 border border-white text-center w-32 break-all'>
                                                {item.username}
                                                <img className='w-4 absolute right-1 top-1.5 invert cursor-pointer' src="icons/copy-solid.svg" alt="copy" onClick={() => copyText(item.username)} />
                                            </td>
                                            <td className='relative py-1 pr-6 border border-white text-center w-32 break-all'>
                                                {item.password}
                                                <img className='w-4 absolute right-1 top-1.5 invert cursor-pointer' src="icons/copy-solid.svg" alt="copy" onClick={() => copyText(item.password)} />
                                            </td>
                                            <td className='relative py-1 pr-6 border border-white text-center w-32 break-all'>
                                                <div className='flex justify-around'>
                                                    <img className='w-4 invert cursor-pointer' src="icons/edit.svg" alt="edit" onClick={() => editPassword(item.id)} />
                                                    <img className='w-4 invert cursor-pointer' src="icons/delete.svg" alt="delete" onClick={() => deletePassword(item.id)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Manager