import { FloatingLabel, Form } from "react-bootstrap";

const FormAll = ({ label, ...rest }) => {
  return (
    <Form.Group className="mb-3" >
      <FloatingLabel label={label}>
        <Form.Control autoComplete="off" required {...rest}></Form.Control>
      </FloatingLabel>
    </Form.Group>
  );
};

export default FormAll;
