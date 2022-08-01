import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import "./CityList.css";

export default function CityList() {
  const [newCity, setNewCity] = useState("");
  const [editCity, setEditCity] = useState("");
  const [cities, setCities] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [cityId, setCityId] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    fetch("http://10.83.244.152:8080/api/v1/cities")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, [change]);

  useEffect(() => {
    let cityName = cities.find((city) => {
      return city._id == cityId;
    });

    if (cityName) {
      setEditCity(cityName.name);
    }
  }, [cityId]);

  const removeCityHandler = async () => {
    await fetch(`http://10.83.244.152:8080/api/v1/cities/${cityId}`, {
      method: "DELETE",
    }).then((data) => console.log(data));

    setChange((c) => !c);
    setShowDeleteModal(false);
  };

  const editCityHandler = async () => {
    let editedCity = {
      name: editCity,
    };
    await fetch(`http://10.83.244.152:8080/api/v1/cities/${cityId}`, {
      method: "PATCH",
      body: JSON.stringify(editedCity),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => console.log(data));

    setChange((c) => !c);
    setShowEditModal(false);
  };

  const addCityClickHandler = async () => {
    if (newCity) {
      await fetch("http://10.83.244.152:8080/api/v1/cities", {
        method: "POST",
        body: JSON.stringify({
          name: newCity,
        }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      setChange((c) => !c);
      setShowAddModal(false);
      setNewCity("");
    }
  };

  return (
    <div className="content">
      <div className="set-boundary">
        <Button variant="info" onClick={() => setShowAddModal(true)}>
          شهر جدید
        </Button>
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>نام شهر</th>
            <th style={{ textAlign: "center" }}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => {
            return (
              <tr key={city._id}>
                <td>{city.name}</td>
                <td style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <DeleteIcon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setShowDeleteModal(true);
                      setCityId(city._id);
                    }}
                  />
                  <EditIcon
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => {
                      setCityId(city._id);
                      setShowEditModal(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">حذف شهر</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>آیا از حذف شهر مورد نظر مطمئن هستید؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            بستن
          </Button>
          <Button size="sm" variant="danger" onClick={removeCityHandler}>
            بله, حذف کن
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            ویرایش شهر
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>نام شهر</Form.Label>
              <Form.Control
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                type="text"
                placeholder="نام شهر"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowEditModal(false)}
          >
            بستن
          </Button>
          <Button size="sm" variant="primary" onClick={editCityHandler}>
            اعمال تغییرات
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal
        show={showAddModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            افزودن شهر
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>نام شهر</Form.Label>
              <Form.Control
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                type="text"
                placeholder="نام شهر"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowAddModal(false)}
          >
            بستن
          </Button>
          <Button size="sm" variant="info" onClick={addCityClickHandler}>
            افزودن
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
