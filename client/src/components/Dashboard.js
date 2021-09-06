import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchUserInfo } from "../redux/AuthSlice";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    name,
    email,
    dept,
    class_roll,
    registration,
    session,
    signature,
    public_key,
  } = useSelector((state) => state.Auth);

  const downloadPdf = async () => {
    console.log(signature);
    let image_url = "";
    image_url = await QRCode.toDataURL(
      JSON.stringify({
        name,
        email,
        class_roll,
        registration,
        dept,
        session,
        signature,
        public_key,
      })
    );
    console.log(image_url);
    let doc = new jsPDF();
    doc.addImage(image_url, "JPEG", 150, 20, 50, 50);
    doc.text("Name : " + name, 35, 25);
    doc.text("Email : " + email, 35, 35);
    doc.text("Class Roll : " + class_roll, 35, 45);
    doc.text("Registration : " + registration, 35, 55);
    doc.text("Department : " + dept, 35, 65);
    doc.text("Session : " + session, 35, 75);
    doc.save(registration + ".pdf");
  };
  return (
    <div className="flex flex-col ">
      <h1 className="text-center font-bold text-3xl">Student Information</h1>
      <ol className="text-center inline">
        <li className="bg-blue-200 p-2 m-1">Name: {name}</li>
        <li className="bg-blue-200 p-2 m-1">Email: {email}</li>
        <li className="bg-blue-200 p-2 m-1">Class Roll: {class_roll}</li>
        <li className="bg-blue-200 p-2 m-1">Registration No: {registration}</li>
        <li className="bg-blue-200 p-2 m-1">Department: {dept}</li>
        <li className="bg-blue-200 p-2 m-1">Session: {session}</li>
      </ol>
      <div className="self-center">
        <button
          className="p-2 m-2 bg-blue-600 text-white rounded-md"
          onClick={() => downloadPdf()}
        >
          Download PDF
        </button>
        <button
          className="p-2 m-2 bg-blue-600 text-white rounded-md"
          onClick={() => {
            dispatch(fetchUserInfo({ email: "unknown", password: "unknown" }));
            history.replace("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
