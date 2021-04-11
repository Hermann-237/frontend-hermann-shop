import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function InputComponent() {
  const [item, setstateItem] = useState("");
  const [priority, setstatePriority] = useState("1");

  const addItem = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://backen3.herokuapp.com/new-item",
      data: {
        item,
        priority,
      },
    })
      .then((result) => {
        setstateItem("");
        setstatePriority("1");
      })
      .catch((e) => console.log(e.message));
    console.log({ item, priority });
  };

  return (
    <Form className="container mt-5 ">
      <Form.Row>
        <Form.Group controlId="formGridCity" className="col-sm-6">
          <Form.Label>Grocery</Form.Label>
          <Form.Control
            type="text"
            name="item"
            value={item}
            className="form-control"
            id="itemFiel"
            placeholder="Enter the grocery"
            required
            onChange={(e) => setstateItem(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGridState" className="col-sm-3">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="select"
            name="priority"
            value={priority}
            className="custom-select"
            id="selectPriority"
            onChange={(e) => setstatePriority(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formGridState" className="col-sm-3 mt-sm-4">
          <Button variant="info" className="mt-sm-2" onClick={addItem}>
            Add item
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}

export default InputComponent;
