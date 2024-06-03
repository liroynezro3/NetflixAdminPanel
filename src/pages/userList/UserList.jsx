import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { getUsers, deleteUsers } from "../../context/userContext/apiCalls";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  console.log(users);
  useEffect(() => {
    getUsers(dispatch);
  }, [getUsers, dispatch]);

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "user", headerName: "User", width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic||"https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "isAdmin",headerName: "is Admin?",
      width: 120,
    },
    { field: "action", headerName: "Action",width: 150,
      renderCell: (params) => { //field action  שייך ל
        return (
          <>
            <Link to={{pathname: "/user/" + params.row._id ,user: params.row}}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  
  return (//  (DATA GRID) מה שאני מרנדר לדף
    <div className="userList">
      <DataGrid
        columns={columns}
        rows={users}// DATA
        getRowId={(r) => r._id}
      />
    </div>
  );
}
