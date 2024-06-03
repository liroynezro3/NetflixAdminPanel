import {initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDTxyU1LiY0-r-pMRLTnvgMp_fDQDWTt8M",
  authDomain: "netflix-3ac37.firebaseapp.com",
  projectId: "netflix-3ac37",
  storageBucket: "netflix-3ac37.appspot.com",
  messagingSenderId: "525612267541",
  appId: "1:525612267541:web:6bc74db4ffde30a4f2761c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;