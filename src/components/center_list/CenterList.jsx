import React, { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import "./CenterList.css";

export default function CenterList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newCenter, setNewCenter] = useState();
  const [editCenter, setEditCenter] = useState();
  const [change, setChange] = useState(false);
  const [centerId, setCenterId] = useState();
  const [cityId, setCityId] = useState();

  const [cities, setCities] = useState();
  const [centers, setCenters] = useState();

  let cityName = useRef();

  useEffect(() => {
    fetch("http://10.83.244.152:8080/api/v1/cities")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://10.83.244.152:8080/api/v1/centers")
      .then((res) => res.json())
      .then((data) => {
        setCenters(data);
      });
  }, [change]);

  useEffect(() => {
    let centerName =
      centers &&
      centers.find((center) => {
        return center._id == centerId;
      });

    // let cityFound = cities && cities.find((city) => city._id == cityId);

    centerName && setEditCenter(centerName.name);
  }, [centerId]);

  const removeCenterHandler = async () => {
    await fetch(`http://10.83.244.152:8080/api/v1/centers/${centerId}`, {
      method: "DELETE",
    }).then((data) => console.log(data));

    setChange((p) => !p);
    setShowDeleteModal(false);
  };

  const editCenterHandler = async () => {
    let editedCenter = {
      city_id: cityId,
      name: editCenter,
    };
    await fetch(`http://10.83.244.152:8080/api/v1/centers/${centerId}`, {
      method: "PATCH",
      body: JSON.stringify(editedCenter),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => console.log(data));

    setChange((p) => !p);
    setShowEditModal(false);
  };

  const addCenterClickHandler = async () => {
    if (newCenter) {
      await fetch("http://10.83.244.152:8080/api/v1/centers", {
        method: "Post",
        body: JSON.stringify({
          city_id: cityId,
          name: newCenter,
        }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }

    setChange((p) => !p);
    setShowAddModal(false);
    setNewCenter("");
  };

  return (
    <>
      <div className="content">
        <div className="set-boundary">
          <Button variant="info" onClick={() => setShowAddModal(true)}>
            مرکز جدید
          </Button>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>نام شهر</th>
              <th>نام مرکز</th>
              <th style={{ textAlign: "center" }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {centers &&
              centers.map((center) => {
                let city =
                  cities && cities.find((city) => city._id == center.city_id);
                return (
                  <tr key={center._id}>
                    <td>{city.name}</td>
                    <td>{center.name}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <DeleteIcon
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setCenterId(center._id);
                          setCityId(center.city_id);
                        }}
                      />
                      <EditIcon
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => {
                          setShowEditModal(true);
                          setCenterId(center._id);
                          setCityId(center.city_id);
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
            <Modal.Title id="contained-modal-title-vcenter">
              حذف مرکز
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>آیا از حذف مرکز مورد نظر مطمئن هستید؟</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              بستن
            </Button>
            <Button size="sm" variant="danger" onClick={removeCenterHandler}>
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
              ویرایش مرکز
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCityId(e.target.value)}
              >
                <option>انتخاب شهر</option>
                {cities &&
                  cities.map((city) => {
                    return <option value={city._id}>{city.name}</option>;
                  })}
              </Form.Select>
              <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>نام مرکز</Form.Label>
                <Form.Control
                  value={editCenter}
                  onChange={(e) => setEditCenter(e.target.value)}
                  type="text"
                  placeholder="نام مرکز"
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
            <Button size="sm" variant="primary" onClick={editCenterHandler}>
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
              افزودن مرکز
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCityId(e.target.value)}
              >
                <option>انتخاب شهر</option>
                {cities &&
                  cities.map((city) => {
                    return <option value={city._id}>{city.name}</option>;
                  })}
              </Form.Select>
              <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>نام مرکز</Form.Label>
                <Form.Control
                  value={newCenter}
                  onChange={(e) => setNewCenter(e.target.value)}
                  type="text"
                  placeholder="نام مرکز"
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
            <Button size="sm" variant="info" onClick={addCenterClickHandler}>
              افزودن
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
