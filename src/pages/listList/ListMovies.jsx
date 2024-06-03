import "./ListMovies.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteLists, getLists } from "../../context/listContext/apiCalls";

const ListMovies = () => {
  const { lists, dispatch } = useContext(ListContext);
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);
  console.log(lists);
  const handleDelete = (id) => {
    deleteLists(id, dispatch);
  };

  const [rowHeight, setRowHeight] = useState(28);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "List title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        columns={columns}
        rows={lists}
        getRowId={(r) => r._id}
        pageSize={8}
      />
    </div>
  );
};
export default ListMovies;
