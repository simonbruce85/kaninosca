import {Popconfirm, Table, Radio, Badge, Button} from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteEntry, getAllRows} from '../client';
import {successNotification} from "../Notification";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import AddNewOwnerForm from './AddNewOwnerForm';



const removeOwner = (id, callback, ownerName) =>{
    deleteEntry("owners", id).then(() => {
        successNotification("Owner deleted", `${ownerName} has been deleted`);
        callback();
    })
}

const columns = (fetchOwners, navigate) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
    {
    title: "Actions",
        key:"actions",
        render: (text,owners) =>
            <Radio.Group>
                <Popconfirm
                    title={`Are you sure to delete ${owners.name}`}
                    onConfirm={() => removeOwner(owners.id,fetchOwners,owners.name)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button value="small">Edit</Radio.Button>
                <Radio.Button value="small" 
                onClick={() =>
                    navigate({
                        pathname: "/owner",
                        search: `?ownerId=${owners.id}`
                    })
                  }
                  >Details</Radio.Button>
            </Radio.Group>
    },
];

const Owners = () => {

    const [owners, setOwners] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const navigate = useNavigate();

    const fetchOwners = () =>
    getAllRows("owners")
            .then(res => res.json())
            .then(data => {
                setOwners(data);
            })

    useEffect(() => {
        fetchOwners();
    }, []);

    return(
        <>
        <AddNewOwnerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchOwners={fetchOwners}
            />
<Table columns={columns(fetchOwners,navigate)} dataSource={owners} bordered
       title={() =>
           <div className='flex items-center'>
               <Button
                   onClick={() => setShowDrawer(!showDrawer)}
                   type="default" shape="round" icon={<PlusOutlined/>} size="small" className='flex items-center justify-center'>
                   Add New Owner
               </Button>
               <Badge count={owners.length} className="site-badge-count-4"/>
           </div>
       }
       pagination={{pageSize: 10}}
       scroll={{y: 700}}
       rowKey={owners => owners.id}/>
        </>
    );

};

export default Owners;