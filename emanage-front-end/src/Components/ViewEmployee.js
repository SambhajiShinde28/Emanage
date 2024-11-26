import React, { useEffect, useRef, useState } from "react";
import '../Style/ViewEmployee.css'
import axios from 'axios'
import { Link } from "react-router-dom";

function ViewEmployee() {

    // adding event to profile image of users

    var zoomContainerRef = useRef(null)
    var searchFieldValue = useRef(null)
    const [viewData, setViewData] = useState([])
    const [profileImage,setProfileImage] = useState()

    const logoImageClicked = (e) => {
        setProfileImage(e.target.src.split("/")[5])
        zoomContainerRef.current.style.display = "flex"
    }

    const zoomContainerCrossIcon = () => {
        zoomContainerRef.current.style.display = "none"
    }

    const userStartedForSerchning=async()=>{
        const text = searchFieldValue.current.value
        const response = await axios.post("http://127.0.0.1:8000/viewemployee/searchresult/", {search_query:text});
        setViewData(response.data)
    }

    const gettingDataFromServer = async () => {
        const api = "http://127.0.0.1:8000/viewemployee/"
        try {
            const serverData = await axios.get(api)
            setViewData(serverData.data)
        } catch (error) { }
    }

    useEffect(() => {
        gettingDataFromServer()
    }, [])



    return (
        <>
            <div className="seaechSeaction">
                <input type="text" name="search-field" className="serchField" ref={searchFieldValue} onChange={userStartedForSerchning}/>
                <p className="serchFieldText">Search</p>
                <span></span>
                <div></div>
            </div>

            <div className="tableSection">
                <table>
                    <thead>
                        <tr>
                            <th className="head-col-1">No</th>
                            <th className="head-col-2">Person Name</th>
                            <th className="head-col-3">salary</th>
                            <th className="head-col-4">Bonus</th>
                            <th className="head-col-5">Role</th>
                            <th className="head-col-6">Department</th>
                            <th className="head-col-7">Location</th>
                            <th className="head-col-8">HireDate</th>
                            <th className="head-col-9">Absent</th>
                            <th className="head-col-10">Current Status</th>
                            <th className="head-col-11">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            viewData.map((e,i) => {
                                return (
                                    <tr key={e.No} className="table-row">
                                        <td className="fade-row fade-col-1">{e.No}</td>
                                        <td className="fade-row fade-col-2">
                                            <div>
                                                <img src={e.Profile_Image
                                                } alt="profile"
                                                    className="profile-logo" onClick={logoImageClicked} />
                                                <span>{e.Person_Name}</span>
                                            </div>
                                        </td>
                                        <td className="fade-row fade-col-3">{e.Salary}</td>
                                        <td className="fade-row fade-col-4">{e.Bonus}</td>
                                        <td className="fade-row fade-col-5">{e.Role}</td>
                                        <td className="fade-row fade-col-6">{e.Department}</td>
                                        <td className="fade-row fade-col-7">{e.Location}</td>
                                        <td className="fade-row fade-col-8">{e.HireDate}</td>
                                        <td className="fade-row fade-col-9">{e.Total_Absent}</td>
                                        <td className="fade-row fade-col-10">{e.Current_Status}</td>
                                        <td className="fade-row fade-col-11">
                                            <Link to="/update" state={{edit:viewData[i]}}>
                                                <span className="material-symbols-outlined direct-edit">edit</span>
                                            </Link>
                                            <Link to="/delete" state={{delete:viewData[i]}}>
                                                <span className="material-symbols-outlined direct-delete">delete</span>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <img src="Icons/zig-zag-shape.png" alt="shape" className="zig-zag-shape" />

            <a href={`http://127.0.0.1:8000/pdf`} download className="download-pdf">PDF <img src="Icons/Download.png" alt="down icon" /></a>
            
            {/* image zoom panel */}

            <div className="zoomContainer" ref={zoomContainerRef}>
                <img src={`http://127.0.0.1:8000/media/Images/${profileImage}`} alt="profile-image" />
                <a href={`http://127.0.0.1:8000/download/${profileImage}`} download className="zoomContainer-download-btn">Download</a>
                <div className="zoomContainer-cross-icon" onClick={zoomContainerCrossIcon}>
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>

        </>
    )
}

export default ViewEmployee