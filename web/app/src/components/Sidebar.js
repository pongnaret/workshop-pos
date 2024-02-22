import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
//import Modal from "../components/Modal";

function Sidebar() {
  const [memberName, setMemberName] = useState();
  const [packageName, setPackageName] = useState();

  useEffect(() => {
    fetchData();
    //fetchDataTotalBill();
  });

  const fetchData = async () => {
    try {
      axios.get(config.api_path + '/member/info', config.headers()).then(res => {
          if (res.data.message === "success") {
            setMemberName(res.data.result.name);
            setPackageName(res.data.result.package.name);
            // setBillAmount(res.data.result.package.bill_amount);
          }
        }).catch(err => {
          throw err.response.data;
        });
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.messsage,
        icon: "error",
      });
    }
  };

  return (
    <>
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <a href="index3.html" class="brand-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style={{ opacity: 0.8 }}
          />
          <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        <div class="sidebar">
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img
                src="dist/img/user2-160x160.jpg"
                class="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div class="info text-white">
              <div>{memberName}</div>
              <div>Package:{packageName}</div>
            </div>
          </div>

          <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
              <input
                class="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-sidebar">
                  <i class="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="pages/widgets.html" className="nav-link">
                  <i className="nav-icon fas fa-th"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/sale" className="nav-link">
                  <i className="nav-icon fa fa-dollar-sign"></i>
                  <p>ขายสินค้า</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/product" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>สินค้า</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <i className="nav-icon fas fa-person"></i>
                  <p>ผู้ใช้งานระบบ</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/sumSalePerDay" className="nav-link">
                  <i className="nav-icon fas fa-file-alt"></i>
                  <p>สรุปยอดขายรายวัน</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/billSales" className="nav-link">
                  <i className="nav-icon fas fa-list-alt"></i>
                  <p>รายงานบิลขาย</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stock" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>รับสินค้าเข้า Stock</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reportStock" className="nav-link">
                  <i className="nav-icon fas fa-file"></i>
                  <p>รายงาน Stock</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
