import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { astroContext } from "../../context/astroContext";
import { Check, Cross, CrossIcon } from "lucide-react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BiSolidEditAlt } from "react-icons/bi";


const Profile = () => {
  const { user, fetchUserData, refresh, setRefresh, setUser } = useContext(astroContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    address: "",
    pincode: "",
    gender: "",
  });

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        dob: user?.Dob || "",
        gender: user?.gender || "",
        email: user?.email || "",
        address: user?.address || "",
        zipcode: user?.pincode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (editMode) {
      // check if there is any change in the form data
      if (formData.name === user.name &&
        formData.dob === user.Dob &&
        formData.email === user.email &&
        formData.address === user.address &&
        formData.zipcode === user.pincode &&
        formData.gender === user.gender) {
        alert("No changes made to save.");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}api/update-user-profile`,
          formData,
          { withCredentials: true }
        );

        console.log(response)

        if (response?.data?.success) {
          // setRefresh(true); // Trigger re-fetch in other components like Sidebar
          setUser(response?.data?.user);
          setLoading(false);
          setEditMode(false);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update profile.");
      }
    }
    ;
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h2 className="font-bold text-xl">Personal Information</h2>
        <div>
          {editMode ? <div className="flex gap-2">
            <button className="text-red-600 text-2xl" onClick={() => setEditMode(false)}><ImCross /></button>
            <button className="text-green-600 text-2xl" onClick={() => handleEditSave()}><FaCheck /></button>
          </div> : <button className="text-red-600 text-3xl" onClick={() => setEditMode(true)}><BiSolidEditAlt /></button>}

        </div>
      </div>
      {!loading ? <form className="flex flex-col items-center gap-6 mt-5">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-bold">Name</label>
          <input
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            type="text"
            name="name"
            placeholder="Name"
            value={formData?.name}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <label className="font-bold">Date of Birth</label>
          <input
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            type="date"
            name="dob"
            value={formData?.dob}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <label className="font-bold">Gender</label>
          <select
            name="gender"
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            value={formData?.gender}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Male" className="text-black">
              Male
            </option>
            <option value="Female" className="text-black">
              Female
            </option>
            <option value="Other" className="text-black">
              Other
            </option>
          </select>

          <label className="font-bold">Email Address</label>
          <input
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={formData?.email}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <label className="font-bold">Address</label>
          <input
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            type="text"
            name="address"
            placeholder="city,state,country"
            value={formData?.address}
            onChange={handleChange}
            readOnly={!editMode}
          />

          <label className="font-bold">Zipcode</label>
          <input
            className="w-full border rounded border-[#FFD700] p-2 outline-none"
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            value={formData?.zipcode}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>


      </form> :
        <div className="flex justify-center h-[600px] w-full items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-dashed border-4 border-yellow-500"></div>
        </div>}
    </>
  );
};

export default Profile;
