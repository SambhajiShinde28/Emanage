import React, { useRef, useState } from "react";
import '../Style/CreateEmployee.css'
import axios from "axios";


function CreateEmployee() {

    const ceInputFieldRef = useRef([])
    const errorMessageRef = useRef([])
    const inputTextFieldRef = useRef([])

    const [fileName, setFileName] = useState("None")
    var [imageFile, setImageFile] = useState()
    

    // input field clicked event function
    const inputFieldClickedByUser=(e)=>{
        inputTextFieldRef.current[e].style.transform = "translateY(-20px)"
        inputTextFieldRef.current[e].style.transform = "0.3s ease-in-out"
    }


    // Image taking event
    const fileUploadBTNClicked = (e) => {
        setFileName(e.target.files[0].name)
        setImageFile(e.target.files[0])
    }

    const saveEmployeeBTNClicked = async () => {

        if (ceInputFieldRef.current[0].value !== '' && ceInputFieldRef.current[1].value !== '' && ceInputFieldRef.current[2].value !== '' && ceInputFieldRef.current[3].value !== '' && ceInputFieldRef.current[4].value !== '' && ceInputFieldRef.current[5].value !== '' && ceInputFieldRef.current[6].value !== '' && ceInputFieldRef.current[7].value !== '' && ceInputFieldRef.current[8].value !== '') {

            const newEmployeeData = new FormData();

            newEmployeeData.append('Person_Name', ceInputFieldRef.current[0].value);
            newEmployeeData.append('Salary', ceInputFieldRef.current[1].value);
            newEmployeeData.append('Bonus', ceInputFieldRef.current[2].value);
            newEmployeeData.append('Role', ceInputFieldRef.current[3].value);
            newEmployeeData.append('Department', ceInputFieldRef.current[4].value);
            newEmployeeData.append('Location', ceInputFieldRef.current[5].value);
            newEmployeeData.append('HireDate', ceInputFieldRef.current[6].value);
            newEmployeeData.append('Total_Absent', ceInputFieldRef.current[7].value);
            newEmployeeData.append('Current_Status', ceInputFieldRef.current[8].value);
            newEmployeeData.append('Profile_Image', imageFile);


            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/viewemployee/createemployee/",
                    newEmployeeData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (response.status === 201 && response.statusText === "Created") {
                    alert("Employee Created Successfully !!")
                }
            } catch (error) {
                console.error("Error creating employee:", error.response?.data || error.message);
                alert("Error creating employee!");
            }

        }
        else {
            ceInputFieldRef.current.forEach((e, i) => {
                if (e.value === '') {
                    errorMessageRef.current[i].style.display = "block"
                }
                else {
                    errorMessageRef.current[i].style.display = "none"
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
                <h1>Add Employee</h1>

                <div className="formFieldsContainer">

                    <div className="formField personNameField">
                        <input type="text" name="name-field" className="personName" onClick={()=>inputFieldClickedByUser(0)} ref={(el) => (ceInputFieldRef.current[0] = el)} />
                        <p className="fieldText personNameText" ref={(el) => (inputTextFieldRef.current[0] = el)}>Person Name</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[0] = el)}>error</span>
                    </div>

                    <div className="formField salaryField">
                        <input type="text" name="salary-field" className="salary" onClick={()=>inputFieldClickedByUser(1)} ref={(el) => (ceInputFieldRef.current[1] = el)} />
                        <p className="fieldText salaryText" ref={(el) => (inputTextFieldRef.current[1] = el)}>Salary</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[1] = el)}>error</span>
                    </div>

                    <div className="formField bonusField">
                        <input type="text" name="bonus-field" className="bonus" onClick={()=>inputFieldClickedByUser(2)} ref={(el) => (ceInputFieldRef.current[2] = el)} />
                        <p className="fieldText bonusText" ref={(el) => (inputTextFieldRef.current[2] = el)}>Bonus</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[2] = el)}>error</span>
                    </div>

                    <div className="formField roleField">
                        <input type="text" name="role-field" className="role" onClick={()=>inputFieldClickedByUser(3)} ref={(el) => (ceInputFieldRef.current[3] = el)} />
                        <p className="fieldText roleText" ref={(el) => (inputTextFieldRef.current[3] = el)}>Role</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[3] = el)}>error</span>
                    </div>

                    <div className="formField departmentField">
                        <input type="text" name="department-field" className="department" onClick={()=>inputFieldClickedByUser(4)} ref={(el) => (ceInputFieldRef.current[4] = el)} />
                        <p className="fieldText departmentText" ref={(el) => (inputTextFieldRef.current[4] = el)}>Department</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[4] = el)}>error</span>
                    </div>

                    <div className="formField locationField">
                        <input type="text" name="location-field" className="location" onClick={()=>inputFieldClickedByUser(5)} ref={(el) => (ceInputFieldRef.current[5] = el)} />
                        <p className="fieldText locationText" ref={(el) => (inputTextFieldRef.current[5] = el)}>Location</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[5] = el)}>error</span>
                    </div>

                    <div className="formField hireDateField">
                        <input type="text" name="hireDate-field" className="hireDate" onClick={()=>inputFieldClickedByUser(6)} ref={(el) => (ceInputFieldRef.current[6] = el)} />
                        <p className="fieldText hireDateText" ref={(el) => (inputTextFieldRef.current[6] = el)}>HireDate</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[6] = el)}>error</span>
                    </div>

                    <div className="formField absentField">
                        <input type="text" name="absent-field" className="absent" onClick={()=>inputFieldClickedByUser(7)} ref={(el) => (ceInputFieldRef.current[7] = el)} />
                        <p className="fieldText absentText" ref={(el) => (inputTextFieldRef.current[7] = el)}>Total Absent</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[7] = el)}>error</span>
                    </div>

                    <div className="formField currentStatusField">
                        <input type="text" name="currentStatus-field" className="currentStatus" onClick={()=>inputFieldClickedByUser(8)} ref={(el) => (ceInputFieldRef.current[8] = el)} />
                        <p className="fieldText currentStatusText" ref={(el) => (inputTextFieldRef.current[8] = el)}>Current Status</p>
                        <span className="material-symbols-outlined errorIcon" ref={(el) => (errorMessageRef.current[8] = el)}>error</span>
                    </div>

                    <div className="fileUploadField">
                        <input type="file" accept="image/*" name="fileUpload-field" id="fileUpload" onChange={fileUploadBTNClicked} style={{ display: 'none', }} />
                        <label htmlFor="fileUpload" className="fileUploadLabel">Upload Image</label>
                        <p className="image-name">{fileName}</p>
                    </div>

                </div>

                <div className="formSubmitBtnContainer">
                    <button type="button" id="saveBtn" onClick={saveEmployeeBTNClicked}><span className="material-symbols-outlined">download</span>Save</button>
                    <p id="save-message">Employee Saved Successfully</p>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee