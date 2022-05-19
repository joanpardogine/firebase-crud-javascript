// Import the functions you need from the SDKs you need
/*  export { ActionCodeOperation, ActionCodeURL, AuthCredential, AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY as AuthErrorCodes,
  EmailAuthCredential, EmailAuthProvider, FacebookAuthProvider, FactorId, GithubAuthProvider, GoogleAuthProvider, OAuthCredential,
  OAuthProvider, OperationType, PhoneAuthCredential, PhoneAuthProvider, PhoneMultiFactorGenerator, ProviderId, RecaptchaVerifier,
  SAMLAuthProvider, SignInMethod, TwitterAuthProvider, applyActionCode, browserLocalPersistence, browserPopupRedirectResolver,
  browserSessionPersistence, checkActionCode, confirmPasswordReset, connectAuthEmulator, createUserWithEmailAndPassword,
  debugErrorMap, deleteUser, fetchSignInMethodsForEmail, getAdditionalUserInfo, getAuth, getIdToken, getIdTokenResult,
  getMultiFactorResolver, getRedirectResult, inMemoryPersistence, indexedDBLocalPersistence, initializeAuth, isSignInWithEmailLink,
  linkWithCredential, linkWithPhoneNumber, linkWithPopup, linkWithRedirect, multiFactor, onAuthStateChanged, onIdTokenChanged,
  parseActionCodeURL, prodErrorMap, reauthenticateWithCredential, reauthenticateWithPhoneNumber, reauthenticateWithPopup,
  reauthenticateWithRedirect, reload, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, setPersistence,
  signInAnonymously, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPhoneNumber,
  signInWithPopup, signInWithRedirect, signOut, unlink, updateCurrentUser, updateEmail, updatePassword, updatePhoneNumber, updateProfile,
  useDeviceLanguage, verifyBeforeUpdateEmail, verifyPasswordResetCode };*/


// // Import the functions you need from the SDKs you need
// import {
//     initializeApp
//   } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

//   // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {
  //   getFirestore,
  //   collection,
  //   getDocs,
  //   onSnapshot,
  //   addDoc,
  //   deleteDoc,
  //   doc,
  //   getDoc,
  //   updateDoc,
  // } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
  
  // import {
    //   getAuth,
    //   onAuthStateChanged,
    //   createUserWithEmailAndPassword,
    //   signOut
    // } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
    
  

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB-tv4QSEoGGQhNUCKyMN9UlQWxOF9Zcbg",
    authDomain: "tasks-254e6.firebaseapp.com",
    projectId: "tasks-254e6",
    storageBucket: "tasks-254e6.appspot.com",
    messagingSenderId: "443200659205",
    appId: "1:443200659205:web:bc1ccf9d16882f7000a16c"
};

//**************** */



/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
//  export const saveTask = (title, description) =>
//  addDoc(collection(db, "tasks"), { title, description });

/*
  function laMevaCalculadora(num1, num2, elMeuCallback) {
    let sum = num1 + num2;
    elMeuCallback(sum);
  }
*/

function onGetTasks(callback){
  onSnapshot(collection(db, "tasks"), callback);
}

// export const onGetTasks = (callback) =>
//  onSnapshot(collection(db, "tasks"), callback);

/**
*
* @param {string} id Task ID
*/
// export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

// export const getTask = (id) => getDoc(doc(db, "tasks", id));

// export const updateTask = (id, newFields) =>
//  updateDoc(doc(db, "tasks", id), newFields);

// export const getTasks = () => getDocs(collection(db, "tasks"));


//**************** */


// Initialize Firebase

export const app = app.initializeApp(firebaseConfig);
export const db = getFirestore();


// const auth = firebase.auth();
// const auth = firebase.auth();


// const fs = firebase.firestore();
const fs = getFirestore();
const auth = getAuth();






const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");


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

// window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getTasks();
  const querySnapshot = await getDocs(collection(db, "tasks"));

  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });

  // onGetTasks((querySnapshot) => {
    // onSnapshot(collection(db, "tasks")
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
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

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          // await deleteTask(dataset.id);
          await deleteDoc(doc(db, "tasks", id));
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
          const doc = await getDoc(doc(db, "tasks", id));
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
  });
//});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  try {
    if (!editStatus) {
      // await saveTask(title.value, description.value);
      await addDoc(collection(db, "tasks"), {
            title: title.value,
            description: description.value
          });
    } else {
      await  updateDoc(doc(db, "tasks", id), newFields);
      
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
    fs.collection("posts")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log("signout");
    setupPosts([]);
    loginCheck(user);
  }
});
