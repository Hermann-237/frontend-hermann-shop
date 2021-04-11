import { useState, useEffect, Fragment } from "react";
import axios from "axios";

function ListItems() {
  const [item1, setstateItem1] = useState("");
  const [idCard, setstateIdCard] = useState("");
  const [aChanger, setstateAChanger] = useState("");
  const [priority1, setstatePriority1] = useState("1");
  const [priorityToggle, setstatePriorityToggle] = useState("1");
  const [notDoneItems, setstateNotDoneItems] = useState([]);
  const [doneItems, setstateDoneItems] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/all-item",
    })
      .then((result) => {
        const allItemNotDone = result.data.filter((item) => !item.isDone);
        const items = allItemNotDone.sort((a, b) => a.priority - b.priority);
        setstateNotDoneItems(items);
        const allItemDone = result.data.filter((item) => item.isDone);
        setstateDoneItems(allItemDone);
      })
      .catch((e) => console.log(e.message));
  }, [notDoneItems]);

  const deleteItemHandler = (e) => {
    const deleteItem = e.target.id;
    console.log(deleteItem);
    axios({
      method: "delete",
      url: `http://localhost:8080/${deleteItem}`,
    })
      .then(() => console.log("done!"))
      .catch((e) => console.log(e.message));
  };

  const updateItem = (e) => {
    e.preventDefault();
    console.log("idcards", idCard);
    axios({
      method: "put",
      url: `http://localhost:8080/update/${idCard}`,
    })
      .then((data) => {
        console.log("mon data", data);
        console.log("done!");
      })
      .catch((e) => console.log(e.message));
  };

  const ChangePositionItem = (e) => {
    const changeItem = e.target.id;
    axios({
      method: "post",
      url: `http://localhost:8080/${changeItem}`,
    })
      .then(() => console.log("done!"))
      .catch((e) => console.log(e.message));
  };
  const clickUn = (e) => {
    console.log(e.target.id);
    setstateIdCard(e.target.id);
    console.log(idCard);
    axios({
      method: "get",
      url: `http://localhost:8080/find/${e.target.id}`,
    })
      .then((result) => {
        setstateItem1(result.data.item);
        setstatePriority1(result.data.priority);
        setstateAChanger(result.data.item);
        setstatePriorityToggle(result.data.priority);
        console.log(aChanger);
        console.log("le resultat est ", result);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div>
      {notDoneItems.length === 0 ? (
        ""
      ) : (
        <Fragment>
          <h1>Item's lists</h1>

          <table className="table table-dark container">
            <thead>
              <tr>
                <th scope="col" className="text-left pl-3">
                  Priorities
                </th>
                <th scope="col" className="text-left pl-3">
                  Item Name
                </th>
                <th scope="col" className="text-left pl-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {notDoneItems.map((item) => {
                return (
                  <tr key={item._id}>
                    <th scope="row" className="text-left pl-3 ">
                      {item.priority}
                    </th>
                    <td className="text-left pl-3 ">{item.item}</td>
                    <td className="text-left pl-3">
                      <i
                        className="fas fa-edit hover text-primary mx-2 "
                        data-toggle="modal"
                        data-target="#exampleModal"
                        title={`Update ${item.item}`}
                        id={item._id}
                        onClick={clickUn}
                      ></i>
                      {/* My model section start here*/}
                      <div
                        className="modal fade "
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title text-danger"
                                id="exampleModalLabel"
                              >
                                Update: {aChanger}
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body text-primary">
                              <form className=" container mt-5">
                                <div className="form-row">
                                  <div className="col-md-6 mb-3">
                                    <label htmlFor="itemFiel">Item</label>
                                    <input
                                      type="text"
                                      name="item"
                                      value={aChanger}
                                      className="form-control"
                                      id="itemFiel"
                                      required
                                      onChange={(e) =>
                                        setstateAChanger(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-md-3 mb-3">
                                    <label htmlFor="selectPriority">
                                      Priority
                                    </label>
                                    <select
                                      name="priority"
                                      value={priorityToggle}
                                      className="custom-select"
                                      id="selectPriority"
                                      onChange={(e) =>
                                        setstatePriorityToggle(e.target.value)
                                      }
                                    >
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                    <div className="invalid-feedback">
                                      Please select a valid state.
                                    </div>
                                  </div>
                                  <div className="col-md-3 mb-3 mt-sm-4">
                                    <button
                                      className="btn btn-info mt-sm-2"
                                      type="submit"
                                      id={item._id}
                                      onClick={updateItem}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* My Model section end here */}

                      <i
                        className="fas fa-trash-alt hover text-danger mx-2"
                        title={`Delete ${item.item}`}
                        id={item._id}
                        onClick={deleteItemHandler}
                      ></i>
                      <i
                        className="far fa-check-circle hover text-info mx-2"
                        title={`Done ${item.item}`}
                        id={item._id}
                        onClick={ChangePositionItem}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Fragment>
      )}

      {doneItems.length === 0 ? (
        <p></p>
      ) : (
        <Fragment>
          <h1>Are done</h1>
          <table className="table table-dark container">
            <thead>
              <tr>
                <th scope="col" className="text-center pl-3">
                  Item Name
                </th>
              </tr>
            </thead>
            <tbody>
              {doneItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row" className="text-center pl-3">
                      <del>
                        <span className="itemDone">{item.item}</span>

                        <i
                          className="fas fa-trash-alt hover text-danger mx-2"
                          title={`Delete ${item.item} `}
                          id={item._id}
                          onClick={deleteItemHandler}
                        ></i>
                      </del>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Fragment>
      )}
    </div>
  );
}

export default ListItems;
