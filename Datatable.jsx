// import React, { useState } from 'react'

// export default function Todo() {
//   const [text, settext] = useState('')
//   const [data, setdata] = useState([])
//   const [editindex, seteditindex] = useState(null)

//   function handlechange(e) {
//     settext(e.target.value)
//   }

//   function handlesubmit(e) {
//     e.preventDefault()

//     if (editindex != null) {
//       const updatedList = [...data]
//       updatedList[editindex] = text
//       setdata(updatedList)
//       seteditindex(null)
//     } else {
//       setdata([...data, text])
//     }
//     settext('')
//   }

//   function Delete(id) {
//     let ans = data.filter((el, i) => i != id)
//     setdata(ans)
//   }

//   function Edit(id) {
//     settext(data[id])
//     seteditindex(id)
//   }

//   return (
//     <div className="container">
//       <style>{`
//         .container {
//           width: 300px;
//           margin: 40px auto;
//           font-family: Arial, sans-serif;
//           text-align: center;
//         }

//         form {
//           margin-bottom: 20px;
//         }

//         input[type="text"] {
//           padding: 8px;
//           width: 70%;
//           margin-right: 5px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//         }

//         input[type="submit"] {
//           padding: 8px 12px;
//           background-color: #4CAF50;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         input[type="submit"]:hover {
//           background-color: #45a049;
//         }

//         li {
//           list-style: none;
//           margin: 10px 0;
//           font-weight: bold;
//         }

//         button {
//           margin: 5px;
//           padding: 5px 10px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         button:hover {
//           opacity: 0.8;
//         }

//         button:nth-of-type(1) {
//           background-color: #f44336;
//           color: white;
//         }

//         button:nth-of-type(2) {
//           background-color: #2196F3;
//           color: white;
//         }
//       `}</style>

//       <form onSubmit={handlesubmit}>
//         <input
//           type="text"
//           placeholder="entername"
//           value={text}
//           onChange={handlechange}
//         />
//         <input
//           type="submit"
//           value={editindex != null ? "update" : "add"}
//         />
//       </form>

//       {data.map((el, i) => {
//         return (
//           <div key={i}>
//             <li>{el}</li>
//             <button onClick={() => Delete(i)}>delete</button>
//             <button onClick={() => Edit(i)}>edit</button>
//           </div>
//         )
//       })}
//     </div>
//   )
// }
import React, { useState, useEffect } from "react";


export default function LocalStorageForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        checkbox: false,
        selection: ""
    });
    const [savedData, setSavedData] = useState([]);
    const [editData,seteditData]=useState(null)
    const [search,setsearch]=useState("")
    const [sort,setsort]=useState("")

    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem("users")) || [];
        setSavedData(oldData);
    }, []);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        let updatedData;

        if(editData !=null){
        updatedData=[...savedData]
        updatedData[editData]=formData
        seteditData(null)
            
        
        }

        else{
             updatedData = [...savedData, formData];
          }
            setSavedData(updatedData);
            localStorage.setItem("users", JSON.stringify(updatedData));


        setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            checkbox: false,
            selection: ""
        });

        alert("Form Submiitted")
    }

    function Delete(id){
            let ans=savedData.filter((el,i)=> i != id)
            setSavedData(ans)
            localStorage.setItem("users", JSON.stringify(ans));
            
            
}

    function Edit(id){

           
           setFormData(savedData[id])
           seteditData(id)
    }

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4"> Student Registration Form</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label>Phone No</label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="mb-3">
                        <label className="me-3">Gender:</label>

                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                            required
                        />
                        <label className="me-3 ms-1">Male</label>

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                        <label className="ms-1">Female</label>
                    </div>

                    <div className="mb-3">
                        <label>Select Course</label>
                        <select
                            name="selection"
                            className="form-select"
                            value={formData.selection}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="React">React</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Bootstrap">Bootstrap</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Save
                    </button>
                </form>
            </div>

            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center pt-4"> Stu DataTable</h3>
                <p className="text-end me-5">
                    <input type="text" placeholder="searcing" value={search} onChange={(e)=> setsearch(e.target.value)} />
                    <select value={sort} onChange={(e)=> setsort(e.target.value)}>
                             <option value="">Sort By</option>
                             <option value="az">A-Z</option>
                             <option value="za">Z-A</option>
                     </select></p>
                <table className="w-100 border">
                
                    <thead>
                        <tr className="border-b text-center border-bottom ">
                            <th className="p-2">Name</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Phone</th>
                            <th className="p-2">Gender</th>
                            <th className="p-2">Course</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedData
                        .filter((item)=>
                        item.name.toLowerCase().includes(search.toLowerCase()))

                        .sort((a,b)=>{
                            if(sort==="az"){
                                return a.name.localeCompare(b.name)
                            }
                            else if(sort==="za"){
                                return b.name.localeCompare(a.name)
                            }
                            return 0;
                        })

                        
                        .map((item, index) => (
                            <tr key={index} className="border-b text-center">
                                <td className="p-2">{item.name}</td>
                                <td className="p-2">{item.email}</td>
                                <td className="p-2">{item.phone}</td>
                                <td className="p-2">{item.gender}</td>
                                <td className="p-2">{item.selection}</td>
                                <button type="button" className="btn btn-danger mt-2" onClick={() => Delete(index)}>Delete</button>
                                <button type="button" class="btn btn-success ms-2 mt-2" onClick={() => Edit(index)}>Edit</button>
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}