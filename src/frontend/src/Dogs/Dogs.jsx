import { Popconfirm, Table, Radio, Badge, Button } from "antd";
import React, { useEffect, useState } from "react";
import { deleteEntry, getAllPets, getAllRows } from "../client";
import { errorNotification, successNotification } from "../Notification";
import { PlusOutlined } from "@ant-design/icons";
import AddNewDogForm from "./AddNewDog";
import { useNavigate } from "react-router-dom";

const removeDog = (id, callback, petName) => {
  deleteEntry("pets", id).then(() => {
    successNotification("Dog deleted", `${petName} has been deleted`);
    callback();
  }).catch(err =>{
    err.response.json().then(res=>{
      console.log(res)
      errorNotification(
        "There was an issue",
        `${res.message} [${res.status}] [${res.error}]`,
        "bottomLeft"
      )
    })
  })
};

const columns = (fetchDogs, navigate) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: "Dog",
        value: "dog",
      },
      {
        text: "Cat",
        value: "cat",
      },
    ],
  },
  {
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, pet) => (
      <Radio.Group>
        <Popconfirm
          title={`Are you sure to delete ${pet.name}`}
          onConfirm={() => removeDog(pet.id, fetchDogs, pet.name)}
          okText="Yes"
          cancelText="No"
        >
          <Radio.Button value="small">Delete</Radio.Button>
        </Popconfirm>
        <Radio.Button value="small">Edit</Radio.Button>
        <Radio.Button
          value="small"
          onClick={() =>
            navigate({
              pathname: "/pet",
              search: `?petId=${pet.id}`,
            })
          }
        >
          Details
        </Radio.Button>
      </Radio.Group>
    ),
  },
];

const Dogs = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchPets = () => {
    setLoading(true);
    getAllRows("pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: pets.length, //total of items the list will have, used to create the number of pages
          },
        });
      }).catch((err) => {
        console.log(err.response);
        err.response.json().then((res) => {
          console.log(res);
          // errorNotification(
          //   "There was and issue",
          //   `${res.message} [statusCode:${res.status}] [${res.error}]`
          // );
        });
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchPets();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div>
      <>
        <AddNewDogForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchPets={fetchPets}
        />
        <Table
          columns={columns(fetchPets, navigate)}
          title={() => (
            <div className="flex items-center">
              <Button
                onClick={() => setShowDrawer(!showDrawer)}
                type="default"
                shape="round"
                icon={<PlusOutlined />}
                size="small"
                className="flex items-center justify-center"
              >
                Add New Pet
              </Button>
              <Badge count={pets.length} className="site-badge-count-4" />
            </div>
          )}
          rowKey={(pets) => pets.id}
          dataSource={pets}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </>
    </div>
  );
};

export default Dogs;
