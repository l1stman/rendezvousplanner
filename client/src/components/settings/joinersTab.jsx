import React, { useEffect, useState } from "react";
import { HiInformationCircle } from 'react-icons/hi';
import { Button, Checkbox, Label, Modal, TextInput, Alert, Accordion } from "flowbite-react";
import axios from "axios";
const JoinersTab = ({ profile }) => {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        // Replace with your actual API endpoint
        fetch('http://localhost:4000/plan/list/owner/' + profile?.owner?._id) 
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPlans(data.plans);
                } else {
                    setError(data.message);
                }
            });
    }, []);

    return (
       <>
        <div className="animate-in">
        {error && (
            <Alert color="failure" icon={HiInformationCircle} className="m-4">
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        
        <Search/>

         <Accordion collapseAll className="min-w-full">
      {plans.map((plan, index) => (
      <Accordion.Panel>
        <Accordion.Title className="text-white bg-transparent hover:bg-black focus:bg-black "><span className="text-secondary">{index +1}.</span> {plan.title} <span className="text-secondary">({plan.serials.length})</span></Accordion.Title>
        <Accordion.Content>
        <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          No.
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Serial Number
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {plan.serials.map((item, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{index + 1}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-500">{item}</div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
        </Accordion.Content>
      </Accordion.Panel>
      ))}
    </Accordion>
        </div>
       </>
    );
}

function Search() {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [serialData, setSerial] = useState();
    function onCloseModal() {
        setError("");
        setLoading(false)
        setSerial("");
      setOpenModal(false);
    }

async function handleSearch(e) {
    e.preventDefault();
    try {
        setLoading(true)
        const { serial } = e.target;
        const response = await axios.get(`http://localhost:4000/plan/get/${serial.value}`,{
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = response.data;
          if (data.success === false) {
                setLoading(false);
                setSerial("");
                setError(data.message);
            } else  {
                setLoading(false);
                setError("");
                setSerial(data);            }
            
    } catch (error) {
        console.error("Failed to search:", error);
    }
}

    return (
      <>
        <button onClick={() => setOpenModal(true)} className="mb-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700">Search</button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
  <div className="space-y-6">
    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Search user information by serial</h3>
      {error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Info alert!</span> {error}
        </Alert>
      )}
    <div>
      <form onSubmit={handleSearch}>
      <div className="mb-2 block">
        <Label htmlFor="serial" value="Serial" />
      </div>
      <TextInput
        id="serial"
        placeholder="XX000000"
        required
      />
    <div className="w-full">
      <button type="submit" className="my-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700">{loading ? ("loading..."): "Search"}</button>
    </div>
      </form>
    </div>
    {serialData && (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              CIN
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white  divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData.cin}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData.name}</div>
            </td>
          </tr>
        </tbody>
        <thead className="bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               Date
            </th>
                </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData.email}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData.createdAt}</div>
            </td>
            
          </tr>
        </tbody>
        <thead className="bg-gray-50">
            <tr>
           
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Plan Title
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
            
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData?.plan?._id}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-xs text-primary">{serialData?.plan?.title}</div>
            </td>
            </tr>
        </tbody>
      </table>
    )}
  </div>
</Modal.Body>
        </Modal>
      </>
    );
  }

export default JoinersTab;