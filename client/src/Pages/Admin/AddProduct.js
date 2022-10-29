import { Button, Col, Container, Form, Row } from "react-bootstrap";

import FormAll from "../../Components/Atoms/FormAll";
import iconFile from "../../assets/icon-file.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../Contexts/userContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: "",
    price: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", form.price);

      const data = await API.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      navigate("/detail");
      console.log("ini insert product", data);
    } catch (error) {
      console.log(error);
    }
  });

  

  return (
    <Container>
      <h2 className="my-5">Add Product</h2>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Row>
          <Col className="col-12 col-md-9">
            <FormAll
              label="Title"
              type="text"
              name="title"
              onChange={handleChange}
              placeholder="Title"
              className="border-form border-dark text-dark"
            />
          </Col>
          <Col className="col-12 col-md-3">
            <Form.Group
              className="mb-3 p-2 rounded border border-form border-dark text-dark border-grey3"
              controlId="formBasicEmail"
            >
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <Form.Control
                name="image"
                onChange={handleChange}
                type="file"
                placeholder="Attach Image"
                hidden
              />
              <Form.Label className="d-flex justify-content-between btn-full align-items-center  ">
                <div className="text-grey3">Attach Image </div>
                <div className="">
                  <img src={iconFile} alt="" />
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <FormAll
          label="Price"
          type="text"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="border-form border-dark text-dark"
        />
        <div className="d-flex justify-content-end">
          <Button className="btn-nav w-25 mt-5 " type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
