import { Button, Col, Container, Form, Row } from "react-bootstrap";

import FormAll from "../../Components/Atoms/FormAll";
import iconFile from "../../assets/icon-file.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const AddProduct = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null); //For image preview

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
              name="name"
              onChange={handleChange}
              placeholder="Title"
              className="border-form border-dark"
            />
          </Col>
          <Col className="col-12 col-md-3">
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
            <Form.Group
              className="mb-3 d-flex"
              controlId="formBasicEmail"
              style={{ height: "90%" }}
            >
              <Form.Control
                type="file"
                placeholder="Attach Image"
                hidden
                name="image"
                onChange={handleChange}
              />
              <Form.Label className="d-flex align-items-center border-form border-dark input-img border border-1 ">
                Attach Image
              </Form.Label>
              <img
                src={iconFile}
                style={{
                  marginLeft: "-30px",
                  paddingBottom: "8px",
                  width: "20px",
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <FormAll
          label="Price"
          type="text"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="border-form border-dark"
        />
        <div className="d-flex justify-content-end">
          <Button
            className="btn-nav w-25 mt-5 "
            type="submit"
            onClick={() => navigate("/home-admin")}
          >
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddProduct;
