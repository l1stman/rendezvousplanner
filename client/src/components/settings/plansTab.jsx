import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { HiBadgeCheck, HiInformationCircle, HiOutlineExclamationCircle  } from 'react-icons/hi';
import { Datepicker, Button, Checkbox, Label, Modal, TextInput, Alert, Accordion, Textarea, Tooltip } from "flowbite-react";
import axios from "axios";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";
const PlansTab = ({ profile }) => {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        // Replace with your actual API endpoint
        fetch(import.meta.env.VITE_BASE_URL + '/plan/list/owner/' + profile?.owner?._id) 
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPlans(data.plans);
                } else {
                    setError(data.message);
                }
            });
    }, []);


    function pushPlan(data) {
        setPlans([...plans, data]);
    }

    function editPlan(data) {
      var array = plans.map((element) => element._id === data._id ? data : element);
      setPlans(array);
    }
    
    function deletePlan(data) {
      var array = plans.filter((element) => element._id !== data);
      setPlans(array);
    }
    return (
       <>
        <div className="animate-in">
        <Create pushPlan={pushPlan} />
        {error && (
            <Alert color="failure" icon={HiInformationCircle} className="m-4">
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
            <div className="max-w-full divide-y divide-gray-200 ">
                     <table className="bg-white divide-y divide-gray-200 w-full">
                <thead className="bg-gray-50 w-full">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thumbnail
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                </table>
                <div className="overflow-y-auto max-h-[400px]">
        <table className="bg-white divide-y divide-gray-200 w-full">
                <tbody className="bg-white divide-y divide-gray-200">
                  {plans.length == 0 && (
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-center" colSpan="6">
                        <div className="text-sm text-gray-500">No plans found</div>
                    </td>
                    </tr>
                  
                  )}
                    {plans.map((plan, index) => (
                        <tr key={plan._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center justify-center h-6 w-6 text-sm text-secondary bg-primary font-bold rounded-full outline-none">
                                    {index + 1}
                                </div>                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 text-center">{plan.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{plan.description.substring(0, 20)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 text-center">{plan.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <a href={plan.thumbnailLink} target="_blank" rel="noopener noreferrer">
                                    <img src={plan.thumbnail} alt="Thumbnail" className="h-10 w-auto" />
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3 flex items-center justify-end">
                                
                                <Link to={`/plans/${plan._id}`} className="text-primary p-1">
                                    <Tooltip content="View Plan" position="top">
                                      <FaEye/>
                                    </Tooltip>
                                </Link>
                                <a href="#" className="text-primary rounded-md p-1">
                                <Tooltip content="Edit Plan" position="top">
                                      <Edit plan={plan} editPlan={editPlan} />
                                    </Tooltip>
                                </a>
                                <a href="#" className="text-primary rounded-md p-1">
                                <Tooltip content="Delete Plan" position="top">
                                      <Delete plan_id={plan._id} deletePlan={deletePlan} />
                                    </Tooltip>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            
        </div>
        </div>
        </div>
       </>
    );
}


function Create({ pushPlan }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState(null);
  
  function onCloseModal() {
        setError("");
        setSuccess(false);
        setLoading(false)
      setOpenModal(false);
    }
    function onCloseAlert() {
        setError("");
        setSuccess(false);
        setLoading(false);
    }
    async function handleCreate(e) {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              axios.defaults.withCredentials = true;
            const response = await axios.post(
              import.meta.env.VITE_BASE_URL + "/plan", {
                title: e.target.title.value,
                description: e.target.description.value,
                thumbnail: e.target.thumbnail.value,
                date: date,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
              );
              const data = response.data;
              if (data.success === false) {
                 setLoading(false);
                 setError(data.message);
              } else {                setLoading(false);
                setSuccess(true);
                pushPlan(data.plan);
              }
              
            } catch (error) {
              setLoading(false);
              console.error("Failed to sign in:", error);
            }

    }
    const handleDate = (e) => {
        setDate(e)
      }

    return (
        <>
          <button onClick={() => setOpenModal(true)} className="mb-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700">Create</button>
          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create new plan</h3>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" icon={HiBadgeCheck} onDismiss={() => onCloseAlert()}>
          <span className="font-medium">Info alert!</span> Plan created successfully!
        </Alert>
        )}
      <div>
        <form onSubmit={handleCreate}>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          placeholder="Plan title"
          required
        />
        <div className="mb-2 block">
          <Label htmlFor="thumbnail" value="Thumbnail URL" />
        </div>
        <TextInput
          id="thumbnail"
          placeholder="https://example.com/image.jpg"
          required
        />
        <div className="mb-2 block">
        <Label htmlFor="description" value="Description"/>
        </div>
        <Textarea
        id="description"
        placeholder="Plan description"
        required
        />
        <div className="mb-2 block">
        <Label htmlFor="date" value="Date"/>
        </div>
        <Datepicker
                  onSelectedDateChanged={handleDate}
                  className="outline-none w-auto py-1"
                  title="Create By Date"
                  weekStart={1} // Monday
                />
      <div className="w-full">
        <button type="submit" disabled={success} className={`my-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700 ${success && "cursor-not-allowed"}`}>{loading ? ("loading..."): "Create"}</button>
      </div>
        </form>
      </div>
      
    </div>
  </Modal.Body>
          </Modal>
        </>
      );
}

function Edit({ plan, editPlan }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [planData, setPlan] = useState({
    _id: plan._id,
    title: plan.title,
    description: plan.description,
    thumbnail: plan.thumbnail,
    date: plan.date,
  })
  function onCloseModal() {
    setError("");
    setSuccess(false);
    setLoading(false)
  setOpenModal(false);
}
function onCloseAlert() {
    setError("");
    setSuccess(false);
    setLoading(false);
}
const handleDate = (e) => {
  setPlan({ ...planData, date: e });
}
async function handleEdit(e) {
    e.preventDefault(); 
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.defaults.withCredentials = true;
        const response = await axios.put(
          import.meta.env.VITE_BASE_URL + "/plan/" + plan._id, {
            title: planData.title,
            description: planData.description,
            thumbnail: planData.thumbnail,
            date: planData.date,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          );
          const data = response.data;
          if (data.success === false) {
             setLoading(false);
             setError(data.message);
          } else {                
            setLoading(false);
            setSuccess(true);
            editPlan(data.plan);
          }
          
        } catch (error) {
          setLoading(false);
          console.error("Failed to sign in:", error);
        }
      }
    return (
        <>
        <FaPen onClick={() => setOpenModal(true)}/>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update plan </h3>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" icon={HiBadgeCheck} onDismiss={() => onCloseAlert()}>
          <span className="font-medium">Info alert!</span> Plan updated successfully!
        </Alert>
        )}
      <div>
        <form onSubmit={handleEdit}>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          placeholder="Plan title"
          value={planData.title}
          onChange={(e) => setPlan({ ...planData, title: e.target.value })}
          required
        />
        <div className="mb-2 block">
          <Label htmlFor="thumbnail" value="Thumbnail URL" />
        </div>
        <TextInput
          id="thumbnail"
          placeholder="https://example.com/image.jpg"
          value={planData.thumbnail}
          onChange={(e) => setPlan({ ...planData, thumbnail: e.target.value })}
          required
        />
        <div className="mb-2 block">
        <Label htmlFor="description" value="Description"/>
        </div>
        <Textarea
        id="description"
        placeholder="Plan description"
        value={planData.description}
        onChange={(e) => setPlan({ ...planData, description: e.target.value })}
        required
        />
        <div className="mb-2 block">
        <Label htmlFor="date" value="Date"/>
        </div>
        <Datepicker
                  onSelectedDateChanged={handleDate}
                  className="outline-none w-auto py-1"
                  title="Edit Date"
                  weekStart={1} // Monday
                  value={formatDate(new Date(planData.date))}
                />
      <div className="w-full">
        <button type="submit" disabled={success} className={`my-4 p-2 w-auto bg-secondary text-white font-medium rounded-md hover:bg-green-700 ${success && "cursor-not-allowed"}`}>{loading ? ("loading..."): "Update"}</button>
      </div>
        </form>
      </div>
      
    </div>
  </Modal.Body>
          </Modal>
        </>
    );  

}

function Delete({ plan_id, deletePlan }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  function onCloseModal() {
    setError("");
    setSuccess(false);
    setLoading(false)
  setOpenModal(false);
}
function onCloseAlert() {
    setError("");
    setSuccess(false);
    setLoading(false);
}
async function handleDelete(e) {
    e.preventDefault(); 
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          axios.defaults.withCredentials = true;
        const response = await axios.delete(
          import.meta.env.VITE_BASE_URL + "/plan/" + plan_id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
          );
          const data = response.data;
          if (data.success === false) {
             setLoading(false);
             setError(data.message);
          } else {                
            setLoading(false);
            setSuccess(true);
              deletePlan(plan_id);
          }
          
        } catch (error) {
          setLoading(false);
          console.error("Failed to sign in:", error);
        }
      }
    return (
        <>
        <FaTrashCan onClick={() => setOpenModal(true)}/>
        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Info alert!</span> {error}
          </Alert>
        )}
        {success && (
          <Alert color="success" icon={HiBadgeCheck} onDismiss={() => onCloseAlert()}>
          <span className="font-medium">Info alert!</span> Plan deleted successfully!
        </Alert>
        )}
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this plan?
            </h3>
            <div className="flex justify-center gap-4">
              <form onSubmit={handleDelete}>
              <button type="submit" disabled={success} className={`bg-red-600 hover:bg-red-700 rounded-md text-white p-2 my-2 ${success && "cursor-not-allowed"}`}>
                {loading ? "loading.." : "Yes, delete"}
              </button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </>
      )}

function formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero based
        let year = date.getFullYear();
      
        // Pad the day and month with leading zeros if necessary
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
      
        return year + '-' + month + '-' + day;
      }
export default PlansTab;