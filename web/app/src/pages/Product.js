import Template from "../components/Template";
import Swal from "sweetalert2";
import config from "../config";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

function Product() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState({});
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(config.api_path + "/product/list", config.headers())
        .then((res) => {
          if (res.data.message === "success") {
            setProducts(res.data.results);
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

  const handleClose = () => {
    const btns = document.getElementsByClassName("btnClose");
    for (let i = 0; i < btns.length; i++) {
      btns[i].click();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let url = config.api_path + "/product/insert";

      if (product.id !== undefined) {
        url = config.api_path + "/product/update";
      }

      await axios.post(url, product, config.headers()).then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            title: "บันทึกข้อมูล",
            text: "บันทึกข้อมูลสินค้าแล้ว",
            icon: "success",
            timer: 2000,
          });

          fetchData();
          handleClose();
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

  const clearForm = () => {
    setProduct({
        name: '',
        detail: '',
        price: '',
        cost: '',
        barcode: ''
    });
}

const handleDelete = (item) => {
  Swal.fire({
      title: 'ลบข้อมูล',
      text: 'ยืนยันการลบข้อมูลออกจากระบบ',
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true
  }).then(async res => {
      if (res.isConfirmed) {
          try {
              await axios.delete(config.api_path + '/product/delete/' + item.id, config.headers()).then(res => {
                  if (res.data.message === 'success') {
                      fetchData();
                      Swal.fire({
                          title: 'ลบข้อมูล',
                          text: 'ลบข้อมูลแล้ว',
                          icon: 'success',
                          timer: 2000
                      })
                  }
              })
          } catch (e) {
              Swal.fire({
                  title: 'error',
                  text: e.message,
                  icon: 'error'
              })
          }
      }
  })
}

  return (
    <>
      <Template>
        <div className="card">
          <div className="card-header">
            <div className="card-title">สินค้า</div>
          </div>
          <div className="card-body">
            <button
              onClick={clearForm}
              data-toggle="modal"
              data-target="#modalProduct"
              className="btn btn-primary"
            >
              <i className="fa fa-plus mr-2"></i>
              เพิ่มรายการ
            </button>
            <table className="mt-3 table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>barcode</th>
                                    <th>ชื่อสินค้า</th>
                                    <th className="text-right">ราคาทุน</th>
                                    <th className="text-right">ราคาจำหน่าย</th>
                                    <th>รายละเอียด</th>
                                    <th width='170px'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? products.map(item =>
                                    <tr>
                                        <td>{item.barcode}</td>
                                        <td>{item.name}</td>
                                        <td className="text-right">{parseInt(item.cost).toLocaleString('th-TH')}</td>
                                        <td className='text-right'>{parseInt(item.price).toLocaleString('th-TH')}</td>
                                        <td>{item.detail}</td>
                                        <td className="text-center">
                                            <button
                                               
                                                data-toggle='modal'
                                                data-target='#modalProductImage'
                                                className="btn btn-primary mr-2">
                                                <i className="fa fa-image"></i>
                                            </button>
                                            <button onClick={e => setProduct(item)}
                                                data-toggle='modal'
                                                data-target='#modalProduct'
                                                className="btn btn-info mr-2">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button  onClick={e => handleDelete(item)} className="btn btn-danger">
                                                <i className="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ) : ''}
                            </tbody>
                        </table>
          </div>
        </div>
        
      </Template>

      <Modal id='modalProduct' title='สินค้า' modalSize='modal-lg'>
      <form onSubmit={handleSave}>
          <div className="row">
            <div className="mt-3 col-2">
              <label>barcode</label>
              <input
                value={product.barcode}
                onChange={(e) =>
                  setProduct({ ...product, barcode: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="mt-3 col-10">
              <label>ชื่อสินค้า</label>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="mt-3 col-2">
              <label>ราคาจำหน่าย</label>
              <input
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="mt-3 col-2">
              <label>ราคาทุน</label>
              <input
                value={product.cost}
                onChange={(e) =>
                  setProduct({ ...product, cost: e.target.value })
                }
                className="form-control"
              />
            </div>

            <div className="mt-3 col-8">
              <label>รายละเอียด</label>
              <input
                value={product.detail}
                onChange={(e) =>
                  setProduct({ ...product, detail: e.target.value })
                }
                className="form-control"
              />
            </div>
          </div>

          <div className="mt-3">
            <button onClick={handleSave} className="btn btn-primary">
              <i className="fa fa-check mr-2"></i>
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Product;
