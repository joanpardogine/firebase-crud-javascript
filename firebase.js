
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-tv4QSEoGGQhNUCKyMN9UlQWxOF9Zcbg",
    authDomain: "tasks-254e6.firebaseapp.com",
    projectId: "tasks-254e6",
    storageBucket: "tasks-254e6.appspot.com",
    messagingSenderId: "443200659205",
    appId: "1:443200659205:web:bc1ccf9d16882f7000a16c"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const fs = firebase.firestore();


const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

//**************** */

function onGetTasks(callback){
  onSnapshot(collection(fs, "tasks"), callback);
}
//**************** */

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};


// SignUp  // Registre
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  // Authenticate the User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      signUpForm.reset();
      // close the modal
      $("#signupModal").modal("hide");
    });
});

// Logout // Sortir
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

// SingIn // Entrar
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    // clear the form
    signInForm.reset();
    // close the modal
    $("#signinModal").modal("hide");
  });
});

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = "";

const setupPosts = (data) => {
  if (data.length) {
    tasksContainer.innerHTML = "";
    data.forEach((doc) => {
      const task = doc.data();
      tasksContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.title}</h3>
    <p>${task.description}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">🗑 Esborra</button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">🖉 Modifica</button>
    </div>
  </div>`;
    });
  }else {
    tasksContainer.innerHTML = '<h4 class="text-white">Login to See TASKS</h4>';
  }
};


    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          // await deleteTask(dataset.id);
          await deleteDoc(doc(fs, "tasks", id));
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          // const doc = await getTask(e.target.dataset.id);
          const doc = await getDoc(doc(fs, "tasks", id));
          const task = doc.data();
          taskForm["task-title"].value = task.title;
          taskForm["task-description"].value = task.description;

          editStatus = true;
          id = doc.id;
          taskForm["btn-task-form"].innerText = "Update";
        } catch (error) {
          console.log(error);
        }
      });
    });
  // });
//});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      // await saveTask(title.value, description.value);
      await addDoc(collection(fs, "tasks"), {
            title: title.value,
            description: description.value
          });
    } else {
      await  updateDoc(doc(fs, "tasks", id), newFields);
      
//      await updateTask(id, {
//        title: title.value,
//        description: description.value
//      });

      editStatus = false;
      id = "";
      taskForm["btn-task-form"].innerText = "Save";
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
});

// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
      fs.collection("tasks")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log("user " + user);
    console.log("signout");
    setupPosts([]);
    loginCheck(user);
  }
});
