import React, { useState } from "react";
import TopList from "../component/TopList";
import "../css/List.css";

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 한 페이지당 5개 항목

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 샘플 데이터 (페이지네이션 테스트를 위해 더 많은 데이터 추가)
  const [data, setData] = useState([
    { id: "#2233", person: "Ki-jae", date: "24-08-22", shape: "img" },
    { id: "#3826", person: "Unknown", date: "24-08-26", shape: "vid" },
    { id: "#1103", person: "Dust_kim", date: "24-09-01", shape: "img" },
    { id: "#4362", person: "Jang-dragon", date: "24-09-06", shape: "img" },
    { id: "#5555", person: "Test1", date: "24-09-10", shape: "vid" },
    { id: "#6666", person: "Test2", date: "24-09-15", shape: "vid" },
    { id: "#7777", person: "Test3", date: "24-09-20", shape: "img" },
  ]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.id !== selectedId));
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="list-container">
      <TopList activeItem="List" />
      <div className="list-content">
        <table className="list-table">
          <thead>
            <tr>
              <th>id</th>
              <th>person</th>
              <th>date</th>
              <th>shape</th>
              <th>setting</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.person}</td>
                <td>{item.date}</td>
                <td>{item.shape}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1 ? "active" : ""}
              >
                {number + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            &gt;
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>데이터를 삭제하시겠습니까?</p>
            <button onClick={confirmDelete}>확인</button>
            <button onClick={() => setShowModal(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
