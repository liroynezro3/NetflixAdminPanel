import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { getMovies, deleteMovie } from "../../context/movieContext/apiCalls";

const ProductList = () => {
  const { movies, dispatch } = useContext(MovieContext);
  console.log(movies);
  useEffect(() => {
    getMovies(dispatch);
  }, [getMovies,dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/product/" + params.row._id, movie: params.row }}
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
        rows={movies}
        getRowId={(r) => r._id}
        pageSize={8}
      />
    </div>
  );
};
export default ProductList;
