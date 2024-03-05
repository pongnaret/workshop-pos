import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Template from "../components/Template";
import Swal from "sweetalert2";
import config from "../config";
import axios from "axios";

function Position() {
  const [position, setPosition] = useState({});
  const [positions, setPositions] = useState([]);
  // const [password, setPassword] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(config.api_path + "/position/list", config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            setPositions(res.data.results);
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      let url = "/position/insert";

      if (position.id !== undefined) {
        url = "/position/edit";
      }

      await axios
        .post(config.api_path + url, position, config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              title: "บันทึกข้อมูล",
              text: "บันทึกข้อมูลเข้าระบบแล้ว",
              icon: "success",
              timer: 2000,
            });

            handleClose();
            fetchData();
          }
        })
        .catch((err) => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleClose = () => {
    const btns = document.getElementsByClassName("btnClose");
    for (let i = 0; i < btns.length; i++) {
      btns[i].click();
    }
  };

  const clearForm = () => {
    setPosition({
      id: undefined,
      name: "",
      status: "1",
    });
  };

  // const changePassword = (item) => {
  //     setPassword(item);
  //     comparePassword();
  // }

  // const changePasswordConfirm = (item) => {
  //     setPasswordConfirm(item);
  //     comparePassword();
  // }

  // const comparePassword = () => {
  //     if (password.length > 0 && passwordConfirm.length > 0) {
  //         if (password != passwordConfirm) {
  //             Swal.fire({
  //                 title: 'ตรวจสอบการกรอกรหัสผ่าน',
  //                 text: 'โปรดกรอกรหัสผ่าน ให้ตรงกัน',
  //                 icon: 'error'
  //             });
  //         } else {
  //             setUser({
  //                 ...user,
  //                 pwd: password
  //             })
  //         }
  //     }
  // }

  const handleDelete = (item) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล",
        text: "คุณต้องการลบข้อมูล ผู้ใช้งานใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          await axios
            .delete(
              config.api_path + "/position/delete/" + item.id,
              config.headers()
            )
            .then((res) => {
              if (res.data.message === "success") {
                Swal.fire({
                  title: "ลบข้อมูลแล้ว",
                  text: "ระบบได้ทำการลบข้อมูลเรียบร้อยแล้ว",
                  icon: "success",
                  timer: 2000,
                });

                fetchData();
              }
            })
            .catch((err) => {
              throw err.response.data;
            });
        }
      });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Template>
        <div className="card">
          <div className="card-header">
            <div className="card-title">ตำแหน่ง</div>
          </div>
          <div className="card-body">
            <button
              onClick={clearForm}
              data-toggle="modal"
              data-target="#modalPosition"
              className="btn btn-primary"
            >
              <i className="fa fa-plus me-2"></i>
              เพิ่มรายการ
            </button>

            <table className="mt-3 table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ตำแหน่ง</th>
                  <th>สถานะการใช้งาน</th>
                  <th width="150px"></th>
                </tr>
              </thead>
              <tbody>
                {positions.length > 0
                  ? positions.map((item) => (
                      <tr>
                        <td>{item.name}</td>

                        <td>
                          {(() => {
                            if (item.status === "1") {
                              return <span>ใช้งาน</span>;
                            } else {
                              return <span>ไม่ใช้งาน</span>;
                            } 
                          })()}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={(e) => setPosition(item)}
                            data-toggle="modal"
                            data-target="#modalPosition"
                            className="btn btn-info me-2"
                          >
                            <i className="fa fa-pencil"></i>
                          </button>
                          <button
                            onClick={(e) => handleDelete(item)}
                            className="btn btn-danger"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </Template>

      <Modal id="modalPosition" title="ตำแหน่ง" modalSize="modal-lg">
        <div>
          <label>ชื่อตำแหน่ง</label>
          <input
            value={position.name}
            onChange={(e) => setPosition({ ...position, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <label>สถานะ</label>
          <select
            value={position.status}
            onChange={(e) =>
              setPosition({ ...position, status: e.target.value })
            }
            className="form-control"
          >
            <option value="1">ใช้งาน</option>
            <option value="0">ไม่ใช้งาน</option>
          </select>
        </div>
        <div className="mt-3">
          <button onClick={handleSave} className="btn btn-primary">
            <i className="fa fa-check me-2"></i>
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Position;
