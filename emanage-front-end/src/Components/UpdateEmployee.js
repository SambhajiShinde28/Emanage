import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../Style/UpdateEmployee.css'
import axios from "axios";

function UpdateEmployee() {

    // Event triggers when you click on upBtn, downBtn and triggering panel

    const upBtnRef = useRef([])
    const downBtnRef = useRef([])
    const downloadPanelRef = useRef([])
    const downloadPanelItemsRef = useRef([])
    const fieldTextRef = useRef([])
    const inputFieldsRef = useRef([])
    const errorIconRef = useRef([])

    const [employeeData, setEmployeeData] = useState([])


    // receiving data from  ViewEmployee.js page
    const location = useLocation();
    const receivedData = location.state?.edit;
    const [editData, setEditData] = useState([])

    useEffect(() => {
        if (receivedData) {
            setEditData(receivedData);
        }
    }, [receivedData]);

    useEffect(() => {
        if (editData && inputFieldsRef.current.length) {

            inputFieldsRef.current[0].value = editData.No || "";
            inputFieldsRef.current[1].value = editData.Person_Name || "";
            inputFieldsRef.current[2].value = editData.Salary || "";
            inputFieldsRef.current[3].value = editData.Bonus || "";
            inputFieldsRef.current[4].value = editData.Role || "";
            inputFieldsRef.current[5].value = editData.Department || "";
            inputFieldsRef.current[6].value = editData.Location || "";
            inputFieldsRef.current[7].value = editData.HireDate || "";
            inputFieldsRef.current[8].value = editData.Total_Absent || "";
            inputFieldsRef.current[9].value = editData.Current_Status || "";

            for (let index = 0; index < 10; index++) {
                if (inputFieldsRef.current[index].value !== "") {
                    fieldTextRef.current[index].style.transform = "translateY(-20px)"
                    fieldTextRef.current[index].style.transform = "0.3s ease-in-out"
                }
            }

        }
    }, [editData]);


    // taking all data from server 
    useEffect(() => {
        const gettingDataFromServer = async () => {
            try {
                const serverData = await axios.get("http://127.0.0.1:8000/viewemployee/")
                setEmployeeData(serverData.data)
            } catch (error) { }
        }

        gettingDataFromServer()
    }, [])


    function upBTNClicked(i) {
        downBtnRef.current[i].style.display = "flex"
        upBtnRef.current[i].style.display = "none"
        downloadPanelRef.current[i].style.display = 'none'
    }

    function downBTNClicked(i) {
        upBtnRef.current[i].style.display = "flex"
        downBtnRef.current[i].style.display = "none"
        downloadPanelRef.current[i].style.display = 'block'

    }

    function downloadPanelItemsClicked(parent, child) {
        console.log("parent ", parent)
        console.log("child ", child)
        console.log('inner ', downloadPanelItemsRef.current[parent][child])
        try {
            downloadPanelRef.current[parent].style.display = 'none'
            upBtnRef.current[parent].style.display = "none"
            downBtnRef.current[parent].style.display = "flex"
            fieldTextRef.current[parent].style.transform = "translateY(-20px)"
            inputFieldsRef.current[parent].value = downloadPanelItemsRef.current[parent][child].innerText
        } catch (err) { }

        if (employeeData[child] !== "" && child !== "") {
            inputFieldsRef.current[0].value = employeeData[child].No || "";
            inputFieldsRef.current[1].value = employeeData[child].Person_Name || "";
            inputFieldsRef.current[2].value = employeeData[child].Salary || "";
            inputFieldsRef.current[3].value = employeeData[child].Bonus || "";
            inputFieldsRef.current[4].value = employeeData[child].Role || "";
            inputFieldsRef.current[5].value = employeeData[child].Department || "";
            inputFieldsRef.current[6].value = employeeData[child].Location || "";
            inputFieldsRef.current[7].value = employeeData[child].HireDate || "";
            inputFieldsRef.current[8].value = employeeData[child].Total_Absent || "";
            inputFieldsRef.current[9].value = employeeData[child].Current_Status || "";
            
            for (let index = 0; index < 10; index++) {
                if (inputFieldsRef.current[index].value !== "") {
                    fieldTextRef.current[index].style.transform = "translateY(-20px)"
                    fieldTextRef.current[index].style.transform = "0.3s ease-in-out"
                }
            }
        }
    }

    function inputFieldClicked(e) {
        fieldTextRef.current[e].style.transform = "translateY(-20px)"
        fieldTextRef.current[e].style.transform = "0.3s ease-in-out"
    }

    async function updateBTNClicked() {
        
        if (inputFieldsRef.current[0].value !== '' && inputFieldsRef.current[1].value !== '' && inputFieldsRef.current[2].value !== '' && inputFieldsRef.current[3].value !== '' && inputFieldsRef.current[4].value !== '' && inputFieldsRef.current[5].value !== '' && inputFieldsRef.current[6].value !== '' && inputFieldsRef.current[7].value !== '' && inputFieldsRef.current[8].value !== '' && inputFieldsRef.current[9].value !== '') {
            
            const updatedData = {
                No : inputFieldsRef.current[0].value,
                Person_Name : inputFieldsRef.current[1].value,
                Salary : inputFieldsRef.current[2].value,
                Bonus : inputFieldsRef.current[3].value,
                Role : inputFieldsRef.current[4].value,
                Department : inputFieldsRef.current[5].value,
                Location : inputFieldsRef.current[6].value,
                HireDate : inputFieldsRef.current[7].value,
                Total_Absent : inputFieldsRef.current[8].value,
                Current_Status : inputFieldsRef.current[9].value
            }

            const sendData = await axios.put("http://127.0.0.1:8000/viewemployee/updateemployee/",updatedData)
            
            if (sendData.status === 200 && sendData.statusText === "OK") {
                alert("Employee Updated Successfully !!")
            }
        }
        else {
            inputFieldsRef.current.forEach((e, i) => {
                if (e.value === '') {
                    errorIconRef.current[i].style.display = "block"
                }
                else{
                    errorIconRef.current[i].style.display = "none"
                }
            })
        }

    }



    return (
        <div className="mainContainer">
            <div className="page-bg-circle-shapes">
                <div className="left-circle1"></div>
                <div className="left-circle2"></div>
                <div className="center-circle2"></div>
                <div className="rigth-circle1"></div>
                <div className="right-circle2"></div>
            </div>

            <div className="formContainer">
                <h1>Update Employee</h1>

                <div className="formFieldsContainer">

                    <div className="formField id">
                        <div className="formFieldContainer">
                            <input type="text" name="id-field" className="field idField" onClick={() => inputFieldClicked(0)} ref={(el) => (inputFieldsRef.current[0] = el)} readOnly />
                            <p className="fieldText idFieldText" ref={(el) => (fieldTextRef.current[0] = el)}>Id</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(0)} ref={(el) => (downBtnRef.current[0] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(0)} ref={(el) => (upBtnRef.current[0] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[0] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems00" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[0]) downloadPanelItemsRef.current[0] = [];
                                            downloadPanelItemsRef.current[0][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(0, i)}>{e.No}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[0] = el)}>error</span>
                    </div>

                    <div className="formField personNameField">
                        <div className="formFieldContainer">
                            <input type="text" name="name-field" className="field personName" onClick={() => inputFieldClicked(1)} ref={(el) => (inputFieldsRef.current[1] = el)} />
                            <p className="fieldText personNameText" ref={(el) => (fieldTextRef.current[1] = el)}>Person Name</p>

                            <button type="button" className="downBtn" onClick={() => downBTNClicked(1)} ref={(el) => (downBtnRef.current[1] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>

                            <button type="button" className="upBtn" onClick={() => upBTNClicked(1)} ref={(el) => (upBtnRef.current[1] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[1] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems0" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[1]) downloadPanelItemsRef.current[1] = []; downloadPanelItemsRef.current[1][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(1, i)}>{e.Person_Name}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[1] = el)}>error</span>
                    </div>

                    <div className="formField salaryField">
                        <div className="formFieldContainer">
                            <input type="text" name="salary-field" className="field salary" onClick={() => inputFieldClicked(2)} ref={(el) => (inputFieldsRef.current[2] = el)} />
                            <p className="fieldText salaryText" ref={(el) => (fieldTextRef.current[2] = el)}>Salary</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(2)} ref={(el) => (downBtnRef.current[2] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(2)} ref={(el) => (upBtnRef.current[2] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[2] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems1" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[2]) downloadPanelItemsRef.current[2] = []; downloadPanelItemsRef.current[2][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(2, i)}>{e.Salary}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[2] = el)}>error</span>
                    </div>

                    <div className="formField bonusField">
                        <div className="formFieldContainer">
                            <input type="text" name="bonus-field" className="field bonus" onClick={() => inputFieldClicked(3)} ref={(el) => (inputFieldsRef.current[3] = el)} />
                            <p className="fieldText bonusText" ref={(el) => (fieldTextRef.current[3] = el)}>Bonus</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(3)} ref={(el) => (downBtnRef.current[3] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(3)} ref={(el) => (upBtnRef.current[3] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[3] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems2" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[3]) downloadPanelItemsRef.current[3] = []; downloadPanelItemsRef.current[3][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(3, i)}>{e.Bonus}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[3] = el)}>error</span>
                    </div>

                    <div className="formField roleField">
                        <div className="formFieldContainer">
                            <input type="text" name="role-field" className="field role" onClick={() => inputFieldClicked(4)} ref={(el) => (inputFieldsRef.current[4] = el)} />
                            <p className="fieldText roleText" ref={(el) => (fieldTextRef.current[4] = el)}>Role</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(4)} ref={(el) => (downBtnRef.current[4] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(4)} ref={(el) => (upBtnRef.current[4] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[4] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems3" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[4]) downloadPanelItemsRef.current[4] = []; downloadPanelItemsRef.current[4][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(4, i)}>{e.Role}</p>

                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[4] = el)}>error</span>
                    </div>

                    <div className="formField departmentField">
                        <div className="formFieldContainer">
                            <input type="text" name="department-field" className="field department" onClick={() => inputFieldClicked(5)} ref={(el) => (inputFieldsRef.current[5] = el)} />
                            <p className="fieldText departmentText" ref={(el) => (fieldTextRef.current[5] = el)}>Department</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(5)} ref={(el) => (downBtnRef.current[5] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(5)} ref={(el) => (upBtnRef.current[5] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[5] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems4" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[5]) downloadPanelItemsRef.current[5] = []; downloadPanelItemsRef.current[5][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(5, i)}>{e.Department}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[5] = el)}>error</span>
                    </div>

                    <div className="formField locationField">
                        <div className="formFieldContainer">
                            <input type="text" name="location-field" className="field location" onClick={() => inputFieldClicked(6)} ref={(el) => (inputFieldsRef.current[6] = el)} />
                            <p className="fieldText locationText" ref={(el) => (fieldTextRef.current[6] = el)}>Location</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(6)} ref={(el) => (downBtnRef.current[6] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(6)} ref={(el) => (upBtnRef.current[6] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[6] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems5" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[6]) downloadPanelItemsRef.current[6] = []; downloadPanelItemsRef.current[6][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(6, i)}>{e.Location}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[6] = el)}>error</span>
                    </div>

                    <div className="formField hireDateField">
                        <div className="formFieldContainer">
                            <input type="text" name="hireDate-field" className="field hireDate" onClick={() => inputFieldClicked(7)} ref={(el) => (inputFieldsRef.current[7] = el)} />
                            <p className="fieldText hireDateText" ref={(el) => (fieldTextRef.current[7] = el)}>HireDate</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(7)} ref={(el) => (downBtnRef.current[7] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(7)} ref={(el) => (upBtnRef.current[7] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[7] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems6" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[7]) downloadPanelItemsRef.current[7] = []; downloadPanelItemsRef.current[7][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(7, i)}>{e.HireDate}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[7] = el)}>error</span>
                    </div>

                    <div className="formField absentField">
                        <div className="formFieldContainer">
                            <input type="text" name="absent-field" className="field absent" onClick={() => inputFieldClicked(8)} ref={(el) => (inputFieldsRef.current[8] = el)} />
                            <p className="fieldText absentText" ref={(el) => (fieldTextRef.current[8] = el)}>Total Absent</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(8)} ref={(el) => (downBtnRef.current[8] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(8)} ref={(el) => (upBtnRef.current[8] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[8] = el)}>

                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems7" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[8]) downloadPanelItemsRef.current[8] = []; downloadPanelItemsRef.current[8][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(8, i)}>{e.Total_Absent}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[8] = el)}>error</span>
                    </div>

                    <div className="formField currentStatusField">
                        <div className="formFieldContainer">
                            <input type="text" name="currentStatus-field" className="field currentStatus" onClick={() => inputFieldClicked(9)} ref={(el) => (inputFieldsRef.current[9] = el)} />
                            <p className="fieldText currentStatusText" ref={(el) => (fieldTextRef.current[9] = el)}>Current Status</p>
                            <button type="button" className="downBtn" onClick={() => downBTNClicked(9)} ref={(el) => (downBtnRef.current[9] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_down</p>
                            </button>
                            <button type="button" className="upBtn" onClick={() => upBTNClicked(9)} ref={(el) => (upBtnRef.current[9] = el)}>
                                <p className="material-symbols-outlined">keyboard_arrow_up</p>
                            </button>
                        </div>
                        <div className="deopdownPanal" ref={(el) => (downloadPanelRef.current[9] = el)}>
                            {
                                employeeData.map((e, i) => {
                                    return (
                                        <p key={e.No} className="deopdownPanalItems deopdownPanalItems8" ref={(el) => {
                                            if (!downloadPanelItemsRef.current[9]) downloadPanelItemsRef.current[9] = []; downloadPanelItemsRef.current[9][i] = el;
                                        }}
                                            onClick={() => downloadPanelItemsClicked(9, i)}>{e.Current_Status}</p>
                                    )
                                })
                            }

                        </div>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorIconRef.current[9] = el)}>error</span>
                    </div>

                </div>

                <div className="formSubmitBtnContainer">
                    <button type="button" id="updateBtn" onClick={updateBTNClicked}><span className="material-symbols-outlined">convert_to_text</span>Update</button>
                    <p id="update-message">Employee Updated Successfully</p>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee